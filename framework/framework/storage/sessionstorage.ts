module plat.storage {
    /**
     * A class for wrapping SessionStorage as an injectable.
     */
    export class SessionStorage extends BaseStorage implements ISessionStorage {
        private __storage: Storage = (<Window>acquire(__Window)).sessionStorage;
    }

    /**
     * The Type for referencing the '$SessionStorage' injectable as a dependency.
     */
    export var ISessionStorage = SessionStorage;

    register.injectable(__SessionStorage, ISessionStorage);

    /**
     * Describes an object used to wrap session storage into an injectable.
     */
    export interface ISessionStorage {
        /**
         * Returns the number of items in sessionStorage.
         */
        length: number;

        /**
         * Clears sessionStorage, deleting all of its keys.
         */
        clear(): void;

        /**
         * Gets an item out of session storage with the assigned key.
         * 
         * @param key The key of the item to retrieve from sessionStorage.
         * @return {T} The item retrieved from sessionStorage.
         */
        getItem<T>(key: string): T;

        /**
         * Allows for iterating over sessionStorage keys with an index. When
         * called with an index, it will return the key at that index in 
         * sessionStorage.
         * 
         * @param index The index used to retrieve the associated key.
         * @return {string} The key at the given index.
         */
        key(index: number): string;

        /**
         * Searches in sessionStorage for an item and removes it if it 
         * exists.
         * 
         * @param key the Key of the item to remove from sessionStorage.
         */
        removeItem(key: string): void;

        /**
         * Adds data to sessionStorage with the designated key.
         * 
         * @param key The key of the item to store in sessionStorage.
         * @param data The data to store in sessionStorage with the key.
         */
        setItem(key: string, data: any): void;
    }
}
