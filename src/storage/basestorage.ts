module plat.storage {
    'use strict';

    /**
     * @name BaseStorage
     * @memberof plat.storage
     * @kind class
     * 
     * @description
     * A base class for storing data with a designated storage type.
     */
    export class BaseStorage {
        [key: string]: any;

        /**
         * @name _storage
         * @memberof plat.storage.LocalStorage
         * @kind property
         * @access protected
         * 
         * @type {Storage}
         * 
         * @description
         * Reference to HTML5 localStorage.
         */
        protected _storage: Storage;

        /**
         * @name constructor
         * @memberof plat.storage.BaseStorage
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.storage.BaseStorage|BaseStorage}.
         * 
         * @returns {plat.storage.BaseStorage}
         */
        constructor(storage: Storage) {
            this._storage = storage;

            forEach((value, key): void => {
                this[key] = value;
            }, storage);
        }

        /**
         * @name length
         * @memberof plat.storage.BaseStorage
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Returns the number of items in storage.
         */
        get length(): number {
            return this._storage.length;
        }

        /**
         * @name clear
         * @memberof plat.storage.BaseStorage
         * @kind function
         * @access public
         * 
         * @description
         * Clears storage, deleting all of its keys.
         * 
         * @returns {void}
         */
        clear(): void {
            this._storage.clear();
        }

        /**
         * @name getItem
         * @memberof plat.storage.BaseStorage
         * @kind function
         * @access public
         * 
         * @description
         * Gets an item out of storage with the assigned key.
         * 
         * @param {string} key The key of the item to retrieve from storage.
         * 
         * @typeparam {any} T The type of item being retrieved.
         * 
         * @returns {T} The item retrieved from storage.
         */
        getItem<T>(key: string): T {
            return this._storage.getItem(key);
        }

        /**
         * @name key
         * @memberof plat.storage.BaseStorage
         * @kind function
         * @access public
         * 
         * @description
         * Allows for iterating over storage keys with an index. When
         * called with an index, it will return the key at that index in 
         * storage.
         * 
         * @param {number} index The index used to retrieve the associated key.
         * 
         * @returns {string} The key at the given index.
         */
        key(index: number): string {
            return this._storage.key(index);
        }

        /**
         * @name removeItem
         * @memberof plat.storage.BaseStorage
         * @kind function
         * @access public
         * 
         * @description
         * Searches in storage for an item and removes it if it 
         * exists.
         * 
         * @param {string} key The key of the item to remove from storage.
         * 
         * @returns {void}
         */
        removeItem(key: string): void {
            this._storage.removeItem(key);
        }

        /**
         * @name setItem
         * @memberof plat.storage.BaseStorage
         * @kind function
         * @access public
         * 
         * @description
         * Adds data to storage with the designated key.
         * 
         * @param {string} key The key of the item to store in storage.
         * @param {any} data The data to store in storage with the key.
         * 
         * @returns {void}
         */
        setItem(key: string, data: any): void {
            this._storage.setItem(key, data);
            this[key] = this.getItem(key);
        }
    }
}
