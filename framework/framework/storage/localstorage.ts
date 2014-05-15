module plat.storage {
    /**
     * A class used to wrap local storage into an injectable.
     */
    export class LocalStorage extends BaseStorage implements ILocalStorage {
        private __storage: Storage = (<Window>acquire('$window')).localStorage;
    }

    register.injectable('$localStorage', LocalStorage);

    /**
     * Describes an object used to wrap local storage into an injectable.
     */
    export interface ILocalStorage {
        /**
         * Returns the number of items in localStorage.
         */
        length: number;

        /**
         * Clears localStorage, deleting all of its keys.
         */
        clear(): void;

        /**
         * Gets an item out of local storage with the assigned key.
         * 
         * @param key The key of the item to retrieve from localStorage.
         * @return {T} The item retrieved from localStorage.
         */
        getItem<T>(key: string): T;

        /**
         * Allows for iterating over localStorage keys with an index. When
         * called with an index, it will return the key at that index in 
         * localStorage.
         * 
         * @param index The index used to retrieve the associated key.
         * @return {string} The key at the given index.
         */
        key(index: number): string;

        /**
         * Searches in localStorage for an item and removes it if it 
         * exists.
         * 
         * @param key the Key of the item to remove from localStorage.
         */
        removeItem(key: string): void;

        /**
         * Adds data to localStorage with the designated key.
         * 
         * @param key The key of the item to store in localStorage.
         * @param data The data to store in localStorage with the key.
         */
        setItem(key: string, data: any): void;
    }
}
