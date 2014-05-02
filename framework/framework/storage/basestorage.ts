module plat.storage {
    /**
     * A base class for storing data with a designated storage type.
     */
    export class BaseStorage implements IBaseStorage {
        constructor() {
            forEach((<Storage>(<any>this).__storage), (value, key) => {
                this[key] = value;
            });
        }

        /**
         * Returns the number of items in storage.
         */
        get length() {
            return (<Storage>(<any>this).__storage).length;
        }

        /**
         * Clears storage, deleting all of its keys.
         */
        clear() {
            (<Storage>(<any>this).__storage).clear();
        }

        /**
         * Gets an item out of local storage with the assigned key.
         * 
         * @param key The key of the item to retrieve from storage.
         * @return {T} The item retrieved from storage.
         */
        getItem<T>(key: string): T {
            return (<Storage>(<any>this).__storage).getItem(key);
        }

        /**
         * Allows for iterating over storage keys with an index. When
         * called with an index, it will return the key at that index in 
         * storage.
         * 
         * @param index The index used to retrieve the associated key.
         * @return {string} The key at the given index.
         */
        key(index: number) {
            return (<Storage>(<any>this).__storage).key(index);
        }

        /**
         * Searches in this.__storage for an item and removes it if it 
         * exists.
         * 
         * @param key the Key of the item to remove from this.__storage.
         */
        removeItem(key: string) {
            (<Storage>(<any>this).__storage).removeItem(key);
        }

        /**
         * Adds data to storage with the designated key.
         * 
         * @param key The key of the item to store in storage.
         * @param data The data to store in storage with the key.
         */
        setItem(key: string, data: any) {
            (<Storage>(<any>this).__storage).setItem(key, data);
            this[key] = this.getItem(key);
        }
    }

    /**
     * An object designed for storing data with a designated storage type.
     */
    export interface IBaseStorage {
        /**
         * Returns the number of items in storage.
         */
        length: number;

        /**
         * Clears storage, deleting all of its keys.
         */
        clear(): void;

        /**
         * Gets an item out of storage with the assigned key.
         * 
         * @param key The key of the item to retrieve from storage.
         * @return {T} The item retrieved from storage.
         */
        getItem<T>(key: string): T;

        /**
         * Allows for iterating over storage keys with an index. When
         * called with an index, it will return the key at that index in 
         * storage.
         * 
         * @param index The index used to retrieve the associated key.
         * @return {string} The key at the given index.
         */
        key(index: number): string;

        /**
         * Searches in storage for an item and removes it if it 
         * exists.
         * 
         * @param key the Key of the item to remove from storage.
         */
        removeItem(key: string): void;

        /**
         * Adds data to storage with the designated key.
         * 
         * @param key The key of the item to store in storage.
         * @param data The data to store in storage with the key.
         */
        setItem(key: string, data: any): void;
    }
}
