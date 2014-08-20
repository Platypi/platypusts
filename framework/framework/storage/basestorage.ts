module plat.storage {
    /**
     * A base class for storing data with a designated storage type.
     */
    export class BaseStorage implements IBaseStorage {
        constructor() {
            forEach((<Storage>(<any>this).__storage), (value, key) => {
                (<any>this)[key] = value;
            });
        }

        get length(): number {
            return (<Storage>(<any>this).__storage).length;
        }

        clear() {
            (<Storage>(<any>this).__storage).clear();
        }

        getItem<T>(key: string): T {
            return (<Storage>(<any>this).__storage).getItem(key);
        }

        key(index: number): string {
            return (<Storage>(<any>this).__storage).key(index);
        }

        removeItem(key: string): void {
            (<Storage>(<any>this).__storage).removeItem(key);
        }

        setItem(key: string, data: any): void {
            (<Storage>(<any>this).__storage).setItem(key, data);
            (<any>this)[key] = this.getItem(key);
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
         * @returns {T} The item retrieved from storage.
         */
        getItem<T>(key: string): T;

        /**
         * Allows for iterating over storage keys with an index. When
         * called with an index, it will return the key at that index in 
         * storage.
         * 
         * @param index The index used to retrieve the associated key.
         * @returns {string} The key at the given index.
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
