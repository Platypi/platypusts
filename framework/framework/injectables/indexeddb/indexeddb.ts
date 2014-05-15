//***************************************************//
//****** Promise implementation does not work *******//
//*************** Temporarily on hold ***************//
//***************************************************//

module plat {
    /**
     * Module defining APIs for HTML5's IndexedDB. The 
     * top level injectable is of type IFactory.
     */
    export module indexedDb {
        /**
         * A wrapper for the IDBDatabase.
         */
        export interface IDb {
            /**
             * Signifies whether the database schema is modifiable.
             */
            isOpen: boolean;

            /**
             * The name of the Db.
             */
            name: string;

            /**
             * The current version of the Db.
             */
            version: string;

            /**
             * A list of the object store names in this Db.
             */
            objectStoreNames: DOMStringList;

            /**
             * A wrapper for the IDBDatabase createObjectStore method. 
             * IndexedDB uses object stores rather than tables, and a 
             * single database can contain any number of object stores.
             * 
             * @param name The name of the object store to create.
             * @param options The IObjectStoreOptions associated with creating 
             * this object store.
             * @return {ObjectStorePromise} The created ObjectStorePromise that resolves 
             * with the Db instance when the object store has been created.
             */
            createObjectStore(name: string, options?: IObjectStoreOptions): IObjectStorePromise;

            /**
             * A wrapper for the IDBDatabase deleteObjectStore method. Deletes the object 
             * store specified by the name.
             * 
             * @param name The name of the object store to delete.
             */
            deleteObjectStore(name: string): void;

            /**
             * A wrapper for the IDBDatabase transaction method.
             * 
             * @param storeName The name of the object store or Array of names of 
             * object stores with which to perform the given transaction.
             * @param mode The type of transaction to perform. 
             * @return {ITransactionPromise} The created TransactionPromise.
             * 
             * @see {injectables.Transaction.Mode}.
             */
            transaction(storeName: string, mode: string): ITransactionPromise;
            transaction(storeNames: Array<string>, mode: string): ITransactionPromise;

            /**
             * A wrapper for the IDBDatabase close method. Closes the Database.
             */
            close(): void;
        }

        /**
         * A wrapper for the IDBDatabase.
         */
        export class Db implements IDb {
            /**
             * Signifies whether the database schema is modifiable.
             */
            isOpen: boolean = false;

            /**
             * @param _iDb The private IDBDatabase this class is wrapping.
             */
            constructor(private _db: IDBDatabase) { }

            /**
             * The name of the Db.
             */
            get name() {
                return this._db.name;
            }

            /**
             * The current version of the Db.
             */
            get version() {
                return this._db.version;
            }

            /**
             * A list of the object store names in this Db.
             */
            get objectStoreNames() {
                return this._db.objectStoreNames;
            }

            /**
             * A wrapper for the IDBDatabase createObjectStore method. 
             * IndexedDB uses object stores rather than tables, and a 
             * single database can contain any number of object stores.
             * 
             * @param name The name of the object store to create.
             * @param options The IObjectStoreOptions associated with creating 
             * this object store.
             * @return {ObjectStorePromise} The created ObjectStorePromise that resolves 
             * with the Db instance when the object store has been created.
             */
            createObjectStore(name: string, options?: IObjectStoreOptions) {
                if (this.isOpen) {
                    var objectStore = this._db.createObjectStore(name, options),
                        store = new ObjectStore(objectStore);

                    return new ObjectStorePromise((resolve, reject) => {
                        objectStore.transaction.oncomplete = (event) => {
                            resolve(this);
                        };

                        objectStore.transaction.onerror = (event) => {
                            reject(new DatabaseError((<any>event.target).errorCode, 'Unknown error'));
                        };
                    }, { _store: store });
                }

                return new ObjectStorePromise((resolve, reject) => {
                    reject(new DatabaseError(0, 'Cannot modify database schema outside of a database upgrade'));
                });
            }

            /**
             * A wrapper for the IDBDatabase deleteObjectStore method. Deletes the object 
             * store specified by the name.
             * 
             * @param name The name of the object store to delete.
             */
            deleteObjectStore(name: string) {
                // may not have to check for this, there for safety for now.
                if (this.isOpen) {
                    this._db.deleteObjectStore(name);
                    return;
                }

                //exception.warn('Cannot modify database schema outside of a database upgrade',
                //    ExceptionType.Injectable);
            }

            /**
             * A wrapper for the IDBDatabase transaction method.
             * 
             * @param storeName The name of the object store or Array of names of 
             * object stores with which to perform the given transaction.
             * @param mode The type of transaction to perform. See 
             * injectables.Db.READONLY, injectables.Db.READWRITE,
             * injectables.Db.VERSIONCHANGE.
             * @return {ITransactionPromise} The created TransactionPromise.
             */
            transaction(storeName: string, mode: string): ITransactionPromise;
            transaction(storeNames: Array<string>, mode: string): ITransactionPromise;
            transaction(storeName: any, mode: string) {
                var tr = this._db.transaction(storeName, mode),
                    transaction = new Transaction(tr);

                return new TransactionPromise((resolve, reject) => {
                    tr.oncomplete = (event) => {
                        resolve(this);
                    };

                    tr.onerror = (event) => {
                        reject(new DatabaseError((<any>event.target).errorCode, 'Unknown error'));
                    };
                }, { db: this, _transaction: transaction });
            }

            /**
             * A wrapper for the IDBDatabase close method. Closes the Database.
             */
            close() {
                this._db.close();
            }
        }

        /**
         * Options for modifying how an object store is created. 
         * Whenever a value is stored in an ObjectStore, it is 
         * associated with a key. There are several different ways 
         * that a key can be supplied depending on whether the 
         * object store uses a key path or a key generator.
         * 
         * Option inclusion permutations:
         * { Key Path (keyPath), Key Generator (autoIncrement) - Description }:
         * No, No - This object store can hold any kind of value, even 
         *         primitive values like numbers and strings. You must 
         *         supply a separate key argument whenever you want to 
         *         add a new value.
         * Yes, No - This object store can only hold JavaScript objects. 
         *           The objects must have a property with the same name 
         *           as the key path.
         * No, Yes - This object store can hold any kind of value. The 
         *           key is generated for you automatically, or you can 
         *           supply a separate key argument if you want to use 
         *           a specific key.
         * Yes, Yes - This object store can only hold JavaScript objects. 
         *            Usually a key is generated and the value of the 
         *            generated key is stored in the object in a property 
         *            with the same name as the key path. However, if such 
         *            a property already exists, the value of that property 
         *            is used as key rather than generating a new key.
         */
        export interface IObjectStoreOptions {
            /**
             * The key path of the new object store. If no key path is specified, 
             * the keys are 'out-of-line'.
             */
            keyPath?: string;

            /**
             * Speficies whether the object store created should have a key 
             * generator.
             */
            autoIncrement?: boolean;
        }

        /**
         * Options for modifying the creation of an index.
         */
        export interface IObjectStoreIndexOptions {
            /**
             * When this flag is set to true, the index enforces that no two 
             * records in the index have the same key. An attempt to insert 
             * a record with the same key will fail.
             */
            unique?: boolean;

            /**
             * This flag affects how the index behaves when the result of 
             * evaluating the index's key path yields an Array. If the multiEntry 
             * flag is false, then a single record whose key is an Array is added 
             * to the index. If the multiEntry flag is true, then the one record 
             * is added to the index for each item in the Array. The key for each 
             * record is the value of respective item in the Array.
             */
            multiEntry?: boolean;
        }

        /**
         * A wrapper for the IDBObjectStore. 
         * IndexedDB uses object stores rather than tables, and a 
         * single database can contain any number of object stores.
         */
        export interface IObjectStore {
            /**
             * The name of this object store.
             */
            name: string;

            /**
             * The transaction of which this object store is a part.
             */
            transaction: ITransaction;

            /**
             * The boolean value of this object store's autoIncrement flag.
             */
            autoIncrement: boolean;

            /**
             * The key path of this object store. If null, each modification operation 
             * must provide a key.
             */
            keyPath: string;

            /**
             * A list of all the names of indexes on objects in this object store.
             */
            indexNames: DOMStringList;

            /**
             * A wrapper for the IDBObjectStore createIndex method. The object store 
             * must hold objects, not primitives. An index lets you look up the 
             * values stored in an object store using the value of a property of the 
             * stored object, rather than the object's key.
             * 
             * @param name The name of the index to create.
             * @param keyPath The key of the object to add the index to.
             * @param options The IObjectStoreIndexOptions to modify the creation of the index.
             * @return {IIndex} The newly created Index.
             */
            createIndex(name: string, keyPath: string, options: IObjectStoreIndexOptions): IIndex;

            /**
             * A wrapper for the IDBObjectStore deleteIndex method. The object store 
             * must hold objects, not primitives. An index lets you look up the 
             * values stored in an object store using the value of a property of the 
             * stored object, rather than the object's key.
             * 
             * @param name The name of the index to delete.
             */
            deleteIndex(name: string): void;

            /**
             * A wrapper for the IDBObjectStore index method.
             * 
             * @param key The key of the object to get.
             * @return {IIndex} The index found with the given key.
             */
            index(key: string): IIndex;

            /**
             * A wrapper for the IDBObjectStore get method.
             * 
             * @param key The key of the object to get.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the obtained object.
             */
            get(key: string): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBObjectStore add method.
             * 
             * @param item The item to add
             * @param key The key of the object to add to.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the obtained object.
             */
            add(item: any, key?: string): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBObjectStore delete method.
             * 
             * @param key The key of the object to delete.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            delete(key: string): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBObjectStore clear method.
             * 
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            clear(): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBObjectStore put method.
             * 
             * @param key The key of the object to update.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            put(item: any, key?: string): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBObjectStore openCursor method.
             * 
             * @param range The IDBKeyRange to use as the cursor's range.
             * @param direction The direction of travel for the created cursor.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with a new injectables.Cursor instance.
             * 
             * @see {injectables.Cursor.Direction}.
             */
            openCursor(range?: IDBKeyRange, direction?: string): ICursorPromise;
        }

        /**
         * A wrapper for the IDBObjectStore. 
         * IndexedDB uses object stores rather than tables, and a 
         * single database can contain any number of object stores.
         */
        class ObjectStore implements IObjectStore {
            private _transaction: ITransaction;
            /**
             * @param _store The private IDBObjectStore this class is wrapping.
             */
            constructor(private _store: IDBObjectStore) {
                var transaction = _store.transaction;
                if (!isNull(transaction)) {
                    this._transaction = new Transaction(_store.transaction);
                }
            }

            /**
             * The name of this object store.
             */
            get name() {
                return this._store.name;
            }

            /**
             * The name of the transaction of which this object store is a part.
             */
            get transaction() {
                return this._transaction;
            }

            /**
             * The boolean value of this object store's autoIncrement flag.
             */
            get autoIncrement() {
                return <boolean>(<any>this._store).autoIncrement;
            }

            /**
             * The key path of this object store. If null, each modification operation 
             * must provide a key.
             */
            get keyPath() {
                return this._store.keyPath;
            }

            /**
             * A list of all the names of indexes on objects in this object store.
             */
            get indexNames() {
                return this._store.indexNames;
            }

            /**
             * A wrapper for the IDBObjectStore createIndex method. The object store 
             * must hold objects, not primitives. An index lets you look up the 
             * values stored in an object store using the value of a property of the 
             * stored object, rather than the object's key.
             * 
             * @param name The name of the index to create.
             * @param keyPath The key of the object to add the index to.
             * @param options The IObjectStoreIndexOptions to modify the creation of the index.
             */
            createIndex(name: string, keyPath: string, options: IObjectStoreIndexOptions) {
                return new Index(this._store.createIndex(name, keyPath, options));
            }

            /**
             * A wrapper for the IDBObjectStore deleteIndex method. The object store 
             * must hold objects, not primitives. An index lets you look up the 
             * values stored in an object store using the value of a property of the 
             * stored object, rather than the object's key.
             * 
             * @param name The name of the index to delete.
             */
            deleteIndex(name: string) {
                this._store.deleteIndex(name);
            }

            /**
             * A wrapper for the IDBObjectStore index method.
             * 
             * @param key The key of the object to get.
             * @return {IIndex} The index found with the given key.
             */
            index(key: string) {
                return new Index(this._store.index(key));
            }

            /**
             * A wrapper for the IDBObjectStore get method.
             * 
             * @param key The key of the object to get.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the obtained object.
             */
            get(key: string) {
                return this.requestFn('get', key);
            }

            /**
             * A wrapper for the IDBObjectStore add method.
             * 
             * @param item The item to add
             * @param key The key of the object to add to.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the obtained object.
             */
            add(item: any, key?: string) {
                return this.requestFn('add', item, key);
            }

            /**
             * A wrapper for the IDBObjectStore delete method.
             * 
             * @param key The key of the object to delete.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            delete(key: string) {
                return this.requestFn('delete', key);
            }

            /**
             * A wrapper for the IDBObjectStore clear method.
             * 
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            clear() {
                return this.requestFn('clear');
            }

            /**
             * A wrapper for the IDBObjectStore put method.
             * 
             * @param key The key of the object to update.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            put(item: any, key?: string) {
                return this.requestFn('put', item, key);
            }

            /**
             * A wrapper for the IDBObjectStore openCursor method.
             * 
             * @param range The IDBKeyRange to use as the cursor's range.
             * @param direction The direction of travel for the created cursor.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with a new injectables.Cursor instance.
             * 
             * @see {injectables.Cursor.Direction}.
             */
            openCursor(range?: IDBKeyRange, direction?: string) {
                var request = this._store.openCursor(),
                    that = this;

                return new DatabaseEventResultPromise((resolve, reject) => {
                    request.onsuccess = function requestSuccess(event) {
                        resolve(new Cursor(this.result, that));
                    };

                    request.onerror = (event: ErrorEvent) => {
                        reject(new DatabaseError((<any>event.target).errorCode, 'Unknown error'));
                    };
                });
            }

            private requestFn(fn: string, arg0?: any, arg1?: any) {
                var request = (<any>this._store)[fn](arg0, arg1),
                    that = this;

                return new DatabaseEventResultPromise((resolve, reject) => {
                    request.onsuccess = function requestSuccess() {
                        resolve(this.result);
                    };

                    request.onerror = (event: Event) => {
                        reject(new DatabaseError((<any>event.target).errorCode, 'Unknown error'));
                    };
                });
            }
        }

        /**
         * An interface implementing the Mode for a Transaction
         */
        export interface IMode {
            /**
             * Describes the static mode for doing a read-only transaction, 
             * or to read the records of an existing object store.
             */
            READONLY: string;

            /**
             * Describes the static mode for doing a read-write transaction, or 
             * to either read the records of or change an existing object store. 
             * Only specify this mode when necessary.
             */
            READWRITE: string;

            /**
             * Describes the static mode for doing a version change transaction, 
             * or to change the "schema" or structure of the database, which 
             * involves creating or deleting object stores or indexes.
             */
            VERSIONCHANGE: string;
        }

        /**
         * A wrapper for the IDBTransaction.
         */
        export interface ITransaction {
            /**
             * The Db instance associated with the transaction taking place.
             */
            db: IDb;

            /**
             * The type of transaction being performed. 
             */
            mode: string;

            /**
             * An error that occurred while this transaction was taking place.
             */
            error: IDatabaseError;

            /**
             * A wrapper for the IDBTransaction's method abort.
             */
            abort(): void;

            /**
             * A wrapper for the IDBTransaction's method objectStore.
             * 
             * @param storeName The name of the object store trying to be accessed.
             * @return {IObjectStorePromise} The newly created ObjectStorePromise.
             */
            objectStore(storeName: string): IObjectStorePromise;
        }

        /**
         * A wrapper for the IDBTransaction.
         */
        export class Transaction implements ITransaction {
            /**
             * Describes the static modes for transaction.
             */
            static Mode: IMode = {
                /**
                 * Describes the static mode for doing a read-only transaction, 
                 * or to read the records of an existing object store.
                 */
                READONLY: 'readonly',

                /**
                 * Describes the static mode for doing a read-write transaction, or 
                 * to either read the records of or change an existing object store. 
                 * Only specify this mode when necessary.
                 */
                READWRITE: 'readwrite',

                /**
                 * Describes the static mode for doing a version change transaction, 
                 * or to change the "schema" or structure of the database, which 
                 * involves creating or deleting object stores or indexes.
                 */
                VERSIONCHANGE: 'versionchange'
            };

            /**
             * The Db instance associated with the transaction taking place.
             */
            db: IDb;

            /**
             * An error that occurred while this transaction was taking place.
             */
            error: IDatabaseError;

            /**
             * @param _transaction The private IDBTransaction this class is wrapping.
             */
            constructor(private _transaction: IDBTransaction) { }

            /**
             * The type of transaction being performed. 
             */
            get mode() {
                return this._transaction.mode;
            }

            /**
             * A wrapper for the IDBTransaction's method abort.
             */
            abort() {
                this._transaction.abort();
            }

            /**
             * A wrapper for the IDBTransaction's method objectStore.
             * 
             * @param storeName The name of the object store trying to be accessed.
             * @return {IObjectStorePromise} The newly created ObjectStorePromise.
             */
            objectStore(storeName: string) {
                var objectStore = this._transaction.objectStore(storeName);

                return new ObjectStorePromise((resolve, reject) => {
                    objectStore.transaction.oncomplete = (event) => {
                        resolve(this.db);
                    };

                    objectStore.transaction.onerror = (event) => {
                        var error = this.error = new DatabaseError((<any>event.target).errorCode, 'Unknown error');
                        reject(error);
                    };
                }, { db: this.db, _store: objectStore });
            }
        }

        /**
         * Describes an index within a given object store.
         */
        export interface IIndex {
            /**
             * A wrapper for the IDBIndex count method.
             * 
             * @param key The key to specify a specific record set. If not specified or null,
             * all records are included. Can be specified by IDBKeyRange, in which case the 
             * function retreives the first existing value in that range.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the number of records within a key range.
             */
            count(key?: any): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBIndex get method.
             * 
             * @param key The key to specify a specific record set. If not specified or null,
             * all records are included. Can be specified by IDBKeyRange, in which case the 
             * function retreives the first existing value in that range.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with either the value in the referenced object store that 
             * corresponds to the given key or the first corresponding value, if key is a key range.
             */
            get(key: any): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBIndex getKey method.
             * 
             * @param key The key to specify a specific record set. If not specified or null,
             * all records are included. Can be specified by IDBKeyRange, in which case the 
             * function retreives the first existing value in that range.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with either the given key or the primary key, if key is a key range.
             */
            getKey(key: any): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBIndex openCursor method.
             * 
             * @param range The IDBKeyRange to use as the cursor's range.
             * @param direction The direction of travel for the created cursor.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with a new injectables.Cursor instance.
             * 
             * @see {injectables.Cursor.Direction}.
             */
            openCursor(range?: IDBKeyRange, direction?: string): ICursorPromise;
        }

        /**
         * Describes an index within a given object store.
         */
        export class Index implements IIndex {
            /**
             * @param _index The private IDBIndex this class is wrapping.
             */
            constructor(private _index: IDBIndex) { }

            /**
             * A wrapper for the IDBIndex count method.
             * 
             * @param key The key to specify a specific record set. If not specified or null,
             * all records are included. Can be specified by IDBKeyRange, in which case the 
             * function retreives the first existing value in that range.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the number of records within a key range.
             */
            count(key?: any) {
                return this.requestFn('count', key);
            }

            /**
             * A wrapper for the IDBIndex get method.
             * 
             * @param key The key to specify a specific record set. If not specified or null,
             * all records are included. Can be specified by IDBKeyRange, in which case the 
             * function retreives the first existing value in that range.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with either the value in the referenced object store that 
             * corresponds to the given key or the first corresponding value, if key is a key range.
             */
            get(key: any) {
                return this.requestFn('get', key);
            }

            /**
             * A wrapper for the IDBIndex getKey method.
             * 
             * @param key The key to specify a specific record set. If not specified or null,
             * all records are included. Can be specified by IDBKeyRange, in which case the 
             * function retreives the first existing value in that range.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with either the given key or the primary key, if key is a key range.
             */
            getKey(key: any) {
                return this.requestFn('getKey', key);
            }

            /**
             * A wrapper for the IDBIndex openCursor method.
             * 
             * @param range The IDBKeyRange to use as the cursor's range.
             * @param direction The direction of travel for the created cursor.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with a new injectables.Cursor instance.
             * 
             * @see {injectables.Cursor.Direction}.
             */
            openCursor(range?: IDBKeyRange, direction?: string) {
                var request = this._index.openCursor(range, direction),
                    that = this;

                return new DatabaseEventResultPromise((resolve, reject) => {
                    request.onsuccess = function requestSuccess(event) {
                        resolve(new Cursor(this.result, that));
                    };

                    request.onerror = (event) => {
                        reject(new DatabaseError((<any>event.target).errorCode, 'Unknown error'));
                    };
                });
            }

            private requestFn(fn: string, arg?: any) {
                var request = (<any>this._index)[fn](arg);

                return new DatabaseEventResultPromise((resolve, reject) => {
                    request.onsuccess = function requestSuccess() {
                        resolve(this.result);
                    };

                    request.onerror = (event: ErrorEvent) => {
                        reject(new DatabaseError((<any>event.target).errorCode, 'Unknown error'));
                    };
                });
            }
        }

        /**
         * Describes a promise that fulfills with a Db instance and rejects 
         * in the case of an error.
         */
        export interface IDatabasePromise extends async.IPromise<IDb, IDatabaseError> { }

        /**
         * Describes a promise that fulfills with a Db instance and rejects 
         * in the case of an error.
         */
        export class DatabasePromise extends async.Promise<IDb, IDatabaseError>
            implements IDatabasePromise { }

        /**
         * Describes a promise that fulfills with a result of any type and rejects 
         * in the case of an error.
         */
        export interface IDatabaseEventResultPromise extends async.IPromise<any, IDatabaseError> { }

        /**
         * Describes a promise that fulfills with a result of any type and rejects 
         * in the case of an error.
         */
        export class DatabaseEventResultPromise extends async.Promise<any, IDatabaseError>
            implements IDatabaseEventResultPromise { }

        /**
         * Describes a promise that extends IDatabasePromise with a method for creating index
         */
        export interface IObjectStorePromise extends IDatabasePromise {
            /**
             * The name of this object store.
             */
            name: string;

            /**
             * The transaction of which this object store is a part.
             */
            transaction: ITransaction;

            /**
             * The boolean value of this object store's autoIncrement flag.
             */
            autoIncrement: boolean;

            /**
             * The key path of this object store. If null, each modification operation 
             * must provide a key.
             */
            keyPath: string;

            /**
             * A list of all the names of indexes on objects in this object store.
             */
            indexNames: DOMStringList;

            /**
             * A wrapper for the IDBObjectStore createIndex method. The object store 
             * must hold objects, not primitives. An index lets you look up the 
             * values stored in an object store using the value of a property of the 
             * stored object, rather than the object's key.
             * 
             * @param name The name of the index to create.
             * @param keyPath The key of the object to add the index to.
             * @param options The IObjectStoreIndexOptions to modify the creation of the index.
             */
            createIndex(name: string, keyPath: string, options: IObjectStoreIndexOptions): void;

            /**
             * A wrapper for the IDBObjectStore deleteIndex method. The object store 
             * must hold objects, not primitives. An index lets you look up the 
             * values stored in an object store using the value of a property of the 
             * stored object, rather than the object's key.
             * 
             * @param name The name of the index to delete.
             */
            deleteIndex(name: string): void;

            /**
             * A wrapper for the IDBObjectStore index method.
             * 
             * @param key The key of the object to get.
             * @return {IIndex} The index found with the given key.
             */
            index(key: string): IIndex;

            /**
             * A wrapper for the IDBObjectStore get method.
             * 
             * @param key The key of the object to get.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the obtained object.
             */
            get(key: string): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBObjectStore add method.
             * 
             * @param item The item to add
             * @param key The key of the object to add to.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the obtained object.
             */
            add(item: any, key?: string): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBObjectStore delete method.
             * 
             * @param key The key of the record to delete.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            delete(key: string): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBObjectStore clear method.
             * 
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            clear(): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBObjectStore put method.
             * 
             * @param key The key of the object to update.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            put(item: any, key?: string): IDatabaseEventResultPromise;

            /**
             * A wrapper for the IDBObjectStore openCursor method.
             * 
             * @param range The IDBKeyRange to use as the cursor's range.
             * @param direction The direction of travel for the created cursor.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with a new injectables.Cursor instance.
             * 
             * @see {injectables.Cursor.Direction}.
             */
            openCursor(range?: IDBKeyRange, direction?: string): ICursorPromise;
        }

        /**
         * Describes a promise that extends IDatabasePromise with a method for creating index
         */
        export class ObjectStorePromise extends DatabasePromise implements IObjectStorePromise {
            private _store: ObjectStore;

            /**
             * @param resolveFunction The resolve function for the Promise.
             * @param promise The promise to pass it's attributes through to.
             */
            constructor(resolveFunction: IDatabaseResolveFunction, promise?: any) {
                super(resolveFunction);
                if (!isNull(promise)) {
                    this._store = promise._store;
                }
            }
            /**
             * The name of this object store.
             */
            get name() {
                return this._store.name;
            }

            /**
             * The name of the transaction of which this object store is a part.
             */
            get transaction() {
                return this._store.transaction;
            }

            /**
             * The boolean value of this object store's autoIncrement flag.
             */
            get autoIncrement() {
                return <boolean>(<any>this._store).autoIncrement;
            }

            /**
             * The key path of this object store. If null, each modification operation 
             * must provide a key.
             */
            get keyPath() {
                return this._store.keyPath;
            }

            /**
             * A list of all the names of indexes on objects in this object store.
             */
            get indexNames() {
                return this._store.indexNames;
            }

            /**
             * A wrapper for the IDBObjectStore createIndex method. The object store 
             * must hold objects, not primitives. An index lets you look up the 
             * values stored in an object store using the value of a property of the 
             * stored object, rather than the object's key.
             * 
             * @param name The name of the index to create.
             * @param keyPath The key of the object to add the index to.
             * @param options The IObjectStoreIndexOptions to modify the creation of the index.
             */
            createIndex(name: string, keyPath: string, options: IObjectStoreIndexOptions) {
                return this._store.createIndex(name, keyPath, options);
            }

            /**
             * A wrapper for the IDBObjectStore deleteIndex method. The object store 
             * must hold objects, not primitives. An index lets you look up the 
             * values stored in an object store using the value of a property of the 
             * stored object, rather than the object's key.
             * 
             * @param name The name of the index to delete.
             */
            deleteIndex(name: string) {
                this._store.deleteIndex(name);
            }

            /**
             * A wrapper for the IDBObjectStore index method.
             * 
             * @param key The key of the object to get.
             * @return {IIndex} The index found with the given key.
             */
            index(key: string) {
                return this._store.index(key);
            }

            /**
             * A wrapper for the IDBObjectStore get method.
             * 
             * @param key The key of the object to get.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the obtained object.
             */
            get(key: string) {
                return this._store.get(key);
            }

            /**
             * A wrapper for the IDBObjectStore add method.
             * 
             * @param item The item to add
             * @param key The key of the object to add to.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the obtained object.
             */
            add(item: any, key?: string) {
                return this._store.add(item, key);
            }

            /**
             * A wrapper for the IDBObjectStore delete method.
             * 
             * @param key The key of the record to delete.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            delete(key: string) {
                return this._store.delete(key);
            }

            /**
             * A wrapper for the IDBObjectStore clear method.
             * 
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            clear() {
                return this._store.clear();
            }

            /**
             * A wrapper for the IDBObjectStore put method.
             * 
             * @param key The key of the object to update.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with the request's result.
             */
            put(item: any, key?: string) {
                return this._store.put(item, key);
            }

            /**
             * A wrapper for the IDBObjectStore openCursor method.
             * 
             * @param range The IDBKeyRange to use as the cursor's range.
             * @param direction The direction of travel for the created cursor.
             * @return {IDatabaseEventResultPromise} The created DatabaseEventResultPromise 
             * that fulfills with a new injectables.Cursor instance.
             * 
             * @see {injectables.Cursor.Direction}.
             */
            openCursor(range?: IDBKeyRange, direction?: string) {
                return this._store.openCursor(range, direction);
            }
        }

        /**
         * Describes a promise that fulfills with a injectables.ICursor and rejects with a 
         * injectables.IDatabaseError.
         */
        export interface ICursorPromise extends async.IPromise<ICursor, IDatabaseError> { }

        /**
         * Describes a promise that fulfills with a injectables.ICursor and rejects with a 
         * injectables.IDatabaseError.
         */
        export class CursorPromise extends async.Promise<ICursor, IDatabaseError>
            implements ICursorPromise { }

        /**
         * A wrapper for the IDBCursor interface.
         */
        export interface ICursor {
            /**
             * The key for the record at the cursor's current position.
             */
            key: string;

            /**
             * The value at the cursor's current position.
             */
            value: any;

            /**
             * The direction the cursor is traveling.
             * 
             * @see {injectables.Cursor.Direction}.
             */
            direction: any;

            /**
             * The ObjectStore or Index that the cursor is iterating.
             * 
             * @see {injectables.Cursor.Direction}.
             */
            source: any;

            /**
             * The cursor's current effective key. If the cursor is 
             * being iterated or has iterated outside its range, 
             * this value is undefined.
             */
            primaryKey: any;

            /**
             * A wrapper for the IDBCursor's method advance. It advances the curosr forward 
             * a specified number of times.
             * 
             * @param count The number of times to advance the cursor forward.
             */
            advance(count: number): void;

            /**
             * A wrapper for the IDBCursor's method continue. It advances the cursor to 
             * the next position, along its direction, to the item whose key matches the 
             * key parameter. If no parameter is specified, it advances to the immediate 
             * next position, based on the cursor's direction.
             * 
             * @param key The key to specify where to advance the cursor.
             */
            continue(key?: any): void;

            /**
             * A wrapper for the IDBCursor's method delete. It deletes the record at the 
             * cursor's position, but doesn't change the cursor's position. After deletion, 
             * the cursor's value is set to null.
             */
            delete(): void;

            /**
             * A wrapper for the IDBCursor's method update. It updates the value at the 
             * current position of the cursor in the object store. If the specified record 
             * has just been deleted, a new record is created.
             * 
             * @param value The value to store at the current position.
             * @return {IDatabaseEventResultPromise} An IDatabaseEventResultPromise that 
             * fulfills with the request's result.
             */
            update(value: any): IDatabaseEventResultPromise;
        }

        /**
         * An interface implementing the Direction for ICursor
         */
        export interface IDirection {
            /**
             * The cursor shows all records, including duplicates. It starts at the 
             * lower bound of the key range and moves forward.
             */
            NEXT: string;

            /**
             * The cursor shows all records, excluding duplicates. If multiple records 
             * exist with the same key, only the first one found is returned. It starts 
             * at the lower bound of the key range and moves forward.
             */
            NEXTUNIQUE: string;

            /**
             * The cursor shows all records, including duplicates. It starts at the 
             * upper bound of the key range and moves backward.
             */
            PREV: string;

            /**
             * The cursor shows all records, excluding duplicates. If multiple records 
             * exist with the same key, only the first one found is returned. It starts 
             * at the upper bound of the key range and moves backward.
             */
            PREVUNIQUE: string;
        }

        /**
         * A class implementing the IDBCursor interface.
         */
        export class Cursor implements ICursor {
            /**
             * A static object specifying direction constants for Cursor traversal.
             */
            static Direction: IDirection = {
                /**
                 * The cursor shows all records, including duplicates. It starts at the 
                 * lower bound of the key range and moves forward.
                 */
                NEXT: 'next',

                /**
                 * The cursor shows all records, excluding duplicates. If multiple records 
                 * exist with the same key, only the first one found is returned. It starts 
                 * at the lower bound of the key range and moves forward.
                 */
                NEXTUNIQUE: 'nextunique',

                /**
                 * The cursor shows all records, including duplicates. It starts at the 
                 * upper bound of the key range and moves backward.
                 */
                PREV: 'prev',

                /**
                 * The cursor shows all records, excluding duplicates. If multiple records 
                 * exist with the same key, only the first one found is returned. It starts 
                 * at the upper bound of the key range and moves backward.
                 */
                PREVUNIQUE: 'prevunique'
            };

            /**
             * @param value The value to store at the current position.
             */
            constructor(private _cursor: IDBCursorWithValue, private _source: any) { }

            /**
             * The key for the record at the cursor's current position.
             */
            get key() {
                return <string>this._cursor.key;
            }

            /**
             * The value at the cursor's current position.
             */
            get value() {
                return this._cursor.value;
            }

            /**
             * The direction the cursor is traveling.
             * 
             * @see {injectables.Cursor.Direction}.
             */
            get direction() {
                return this._cursor.direction;
            }

            /**
             * The ObjectStore or Index that the cursor is iterating.
             * 
             * @see {injectables.Cursor.Direction}.
             */
            get source() {
                return this._source;
            }

            /**
             * The cursor's current effective key. If the cursor is 
             * being iterated or has iterated outside its range, 
             * this value is undefined.
             */
            get primaryKey() {
                return this._cursor.primaryKey;
            }

            /**
             * A wrapper for the IDBCursor's method advance. It advances the curosr forward 
             * a specified number of times.
             * 
             * @param count The number of times to advance the cursor forward.
             */
            advance(count: number) {
                this._cursor.advance(count);
            }

            /**
             * A wrapper for the IDBCursor's method continue. It advances the cursor to 
             * the next position, along its direction, to the item whose key matches the 
             * key parameter. If no parameter is specified, it advances to the immediate 
             * next position, based on the cursor's direction.
             * 
             * @param key The key to specify where to advance the cursor.
             */
            continue(key?: any) {
                this._cursor.continue(key);
            }

            /**
             * A wrapper for the IDBCursor's method delete. It deletes the record at the 
             * cursor's position, but doesn't change the cursor's position. After deletion, 
             * the cursor's value is set to null.
             */
            delete() {
                this._cursor.delete();
            }

            /**
             * A wrapper for the IDBCursor's method update. It updates the value at the 
             * current position of the cursor in the object store. If the specified record 
             * has just been deleted, a new record is created.
             * 
             * @param value The value to store at the current position.
             * @return {IDatabaseEventResultPromise} An IDatabaseEventResultPromise that 
             * fulfills with the request's result.
             */
            update(value: any) {
                var request = this._cursor.update(value);

                return new DatabaseEventResultPromise((resolve, reject) => {
                    request.onsuccess = function updateSuccess(event) {
                        resolve(this.result);
                    };

                    request.onerror = (event) => {
                        reject(new DatabaseError((<any>event.target).errorCode, 'Unknown error'));
                    };
                });
            }
        }

        /**
         * Describes a promise that extends IDatabasePromise with a method for obtaining 
         * an associated ObjectStore
         */
        export interface ITransactionPromise extends IDatabasePromise {
            /**
             * The Db instance associated with the transaction taking place.
             */
            db: IDb;

            /**
             * The type of transaction being performed. 
             */
            mode: string;

            /**
             * An error that occurred while this transaction was taking place.
             */
            error: IDatabaseError;

            /**
             * A wrapper for the IDBTransaction's method abort.
             */
            abort(): void;

            /**
             * A wrapper for the IDBTransaction's method objectStore.
             * 
             * @param storeName The name of the object store trying to be accessed.
             * @return {IObjectStorePromise} The newly created ObjectStorePromise.
             */
            objectStore(storeName: string): IObjectStorePromise;
        }

        /**
         * Describes a promise that extends IDatabasePromise with a method for creating index
         */
        export class TransactionPromise extends DatabasePromise implements ITransactionPromise {
            /**
             * The Db instance associated with the transaction taking place.
             */
            db: IDb;

            /**
             * An error that occurred while this transaction was taking place.
             */
            error: IDatabaseError;

            private _transaction: IDBTransaction;

            /**
             * @param resolveFunction The resolve function for the Promise.
             * @param promise The promise to pass it's attributes through to.
             */
            constructor(resolveFunction: IDatabaseResolveFunction, promise?: any) {
                super(resolveFunction);
                if (!isNull(promise)) {
                    this._transaction = promise._transaction;
                    this.db = promise.db;
                    this.error = promise.error;
                }
            }

            /**
             * The type of transaction being performed. 
             */
            get mode() {
                return this._transaction.mode;
            }

            /**
             * A wrapper for the IDBTransaction's method abort.
             */
            abort() {
                this._transaction.abort();
            }

            /**
             * A wrapper for the IDBTransaction's method objectStore.
             * 
             * @param storeName The name of the object store trying to be accessed.
             * @return {IObjectStorePromise} The newly created ObjectStorePromise.
             */
            objectStore(storeName: string) {
                var objectStore = this._transaction.objectStore(storeName);

                return new ObjectStorePromise((resolve, reject) => {
                    objectStore.transaction.oncomplete = (event) => {
                        resolve(this.db);
                    };

                    objectStore.transaction.onerror = (event) => {
                        var error = this.error = new DatabaseError((<any>event.target).errorCode, 'Unknown error');
                        reject(error);
                    };
                }, { db: this.db, _store: objectStore });
            }
        }

        /**
         * Describes the DatabasePromise's resolve function
         */
        export interface IDatabaseResolveFunction {
            (resolve: (value?: IDb) => any, reject: (reason?: IDatabaseError) => any): void;
        }

        /**
         * Describes a database error occuring in the onerror event.
         */
        export interface IDatabaseError extends Error {
            errorCode: number;
        }

        /**
         * Describes a database error occuring in the onerror event.
         */
        export class DatabaseError implements IDatabaseError {
            name: string = 'DatabaseError';
            message: string;
            constructor(public errorCode: number, message?: string) {
                switch (errorCode) {
                    case 8:
                        this.message = 'ABORT_ERR: A request was aborted. i.e., through' +
                        ' a call to IDBTransaction.abort.';
                        break;
                    case 4:
                        this.message = 'CONSTRAINT_ERR: A mutation operation in the transaction' +
                        ' failed because a constraint was not satisfied. i.e., an object,' +
                        ' such as an object store or index, already exists and a request attempted' +
                        ' to create a new one.';
                        break;
                    case 5:
                        this.message = 'DATA_ERR: Data provided to an operation does not meet requirements.';
                        break;
                    case 2:
                        this.message = 'NON_TRANSIENT_ERR: An operation was not allowed on an object.' +
                        ' Unless the cause of the error is corrected, retrying the same operation would' +
                        ' result in failure.';
                        break;
                    case 6:
                        this.message = 'NOT_ALLOWED_ERR: An operation was called on an object where it is' +
                        ' not allowed or at a time when it is not allowed; or a request is' +
                        ' made on a source object that has been deleted or removed.';
                        break;
                    case 3:
                        this.message = 'NOT_FOUND_ERR: The operation failed because the requested' +
                        ' database object could not be found; i.e., an object store did not' +
                        ' exist but was being opened.';
                        break;
                    case 11:
                        this.message = 'QUOTA_ERR: Either there\'s not enough remaining storage' +
                        ' space or the storage quota was reached and the user declined to give' +
                        ' more space to the database.';
                        break;
                    case 9:
                        this.message = 'READ_ONLY_ERR: A mutation operation was attempted' +
                        ' in a READ_ONLY transaction.';
                        break;
                    case 10:
                        this.message = 'READ_ONLY_ERR:  A lock for the transaction could' +
                        ' not be obtained in a reasonable time.';
                        break;
                    case 7:
                        this.message = 'TRANSACTION_INACTIVE_ERR: A request was made against a' +
                        ' transaction that is either not currently active or is already finished.';
                        break;
                    case 1:
                        this.message = 'UNKNOWN_ERR: The operation failed for reasons unrelated' +
                        ' to the database itself, and it is not covered by any other error code --' +
                        ' i.e., a failure due to disk IO errors.';
                        break;
                    case 12:
                        this.message = 'VER_ERR: A request to open a database with a version lower' +
                        ' than the one it already has.';
                        break;
                    default:
                        this.message = message;
                }
            }
        }

        /**
         * A database manager
         */
        export interface IFactory {
            /**
             * Gets the instance of the database specified by the 
             * name, version pair. If the name, version pair does not 
             * exist, a new database will be created and stored.
             * 
             * @param name The name of the database.
             * @param version The version of the database. The version 
             * of the database determines the database schema — the 
             * object stores in the database and their structure. If 
             * the requested version doesn't exist (because this is a 
             * new database, or because the version has been updated), 
             * an onupgradeneeded event is triggered, and you can create 
             * the new version of the database in the specified callback for 
             * that event.
             * @param onUpgradeNeeded The onupgradeneeded callback for modifying 
             * the database schema.
             * @return {IDatabasePromise} The DatabasePromise that resolves 
             * with a new Db instance.
             */
            open(name: string, version: number, onUpgradeNeeded: (db: Db) => void): IDatabasePromise;

            /**
             * Deletes the instance of the database specified by the name.
             * 
             * @param name The name of the database to delete.
             * @return {IDatabasePromise} The DatabasePromise that resolves 
             * with null when the specified database has been successfully deleted.
             */
            deleteDatabase(name: string): IDatabasePromise;

            /**
             * Compares two values as keys to determine ordering and equality for 
             * IndexedDB operations, such as storing and iterating.
             * 
             * @param first The first value to compare.
             * @param second The second value to compare with the first.
             * @return {number} Returns -1 if {first} is less than {second}, 
             * 0 if {first} is equal to {second}, and 1 if {first} is greater 
             * than {second}.
             */
            cmp(first: any, second: any): number;
        }

        /**
         * A database manager
         */
        class Factory implements IFactory {
            /**
             * Gets the instance of the database specified by the 
             * name, version pair. If the name, version pair does not 
             * exist, a new database will be created and stored.
             * 
             * @param name The name of the database.
             * @param version The version of the database. The version 
             * of the database determines the database schema — the 
             * object stores in the database and their structure. If 
             * the requested version doesn't exist (because this is a 
             * new database, or because the version has been updated), 
             * an onupgradeneeded event is triggered, and you can create 
             * the new version of the database in the specified callback for 
             * that event.
             * @param onUpgradeNeeded The onupgradeneeded callback for modifying 
             * the database schema.
             * @return {IDatabasePromise} The DatabasePromise that resolves 
             * with a new Db instance.
             */
            open(name: string, version?: number, onUpgradeNeeded?: (db: Db) => void): IDatabasePromise {
                var indexedDb = window.indexedDB;

                return new DatabasePromise((resolve, reject) => {
                    if (isNull(indexedDb)) {
                        reject(new DatabaseError(null, 'IndexedDb is not supported'));
                    }

                    var dbRequest = indexedDb.open(name, version);

                    dbRequest.onerror = (event) => {
                        reject(new DatabaseError((<any>event.target).errorCode, 'Unknown error'));
                    };

                    dbRequest.onsuccess = function onOpen(event) {
                        var db = new Db(this.result);
                        resolve(db); //need to check this vs. resolving in onupgradeneeded
                    };

                    dbRequest.onupgradeneeded = function dbUpgrade(event) {
                        var db = new Db(this.result);
                        db.isOpen = true;
                        if (isFunction(onUpgradeNeeded)) {
                            onUpgradeNeeded(db);
                        } else {
                            //exception.warn('Your database ' + name +
                            //    ' was upgraded with newer version, but no onUpgradeNeeded ' +
                            //    'callback was specified', ExceptionType.Injectable);
                        }
                        resolve(db);
                    };
                });
            }

            /**
             * Deletes the instance of the database specified by the name.
             * 
             * @param name The name of the database to delete.
             * @return {IDatabasePromise} The DatabasePromise that resolves 
             * when the specified database has been successfully deleted.
             */
            deleteDatabase(name: string) {
                var indexedDb = window.indexedDB;

                return new DatabasePromise((resolve, reject) => {
                    if (isNull(indexedDb)) {
                        reject(new DatabaseError(null, 'IndexedDb is not supported'));
                    }

                    var dbRequest = indexedDb.deleteDatabase(name);

                    dbRequest.onerror = (event) => {
                        reject(new DatabaseError((<any>event.target).errorCode, 'Unknown error'));
                    };

                    dbRequest.onsuccess = (event) => {
                        resolve();
                    };
                });
            }

            /**
             * Compares two values as keys to determine ordering and equality for 
             * IndexedDB operations, such as storing and iterating.
             * 
             * @param first The first value to compare.
             * @param second The second value to compare with the first.
             * @return {number} Returns -1 if {first} is less than {second}, 
             * 0 if {first} is equal to {second}, and 1 if {first} is greater 
             * than {second}.
             */
            cmp(first: any, second: any) {
                var indexedDb = window.indexedDB;

                if (isNull(indexedDb)) {
                    //exception.fatal('IndexedDb is not supported', ExceptionType.Injectable);
                }

                return indexedDb.cmp(first, second);
            }
        }

        register.injectable('$indexedDb', Factory);
    }
}
