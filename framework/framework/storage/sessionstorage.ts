module plat.storage {
    /**
     * @name SessionStorage
     * @memberof plat.storage
     * @kind class
     * 
     * @extends {plat.storage.BaseStorage}
     * @implements {plat.storage.ISessionStorage}
     * 
     * @description
     * A class for wrapping SessionStorage as an injectable.
     */
    export class SessionStorage extends BaseStorage implements ISessionStorage {
        constructor() {
            super((<Window>plat.acquire(__Window)).sessionStorage);
        }
    }

    /**
     * The Type for referencing the '_sessionStorage' injectable as a dependency.
     */
    export function ISessionStorage(): ISessionStorage {
        return new SessionStorage();
    }

    register.injectable(__SessionStorage, ISessionStorage);
    
    /**
     * @name ISessionStorage
     * @memberof plat.storage
     * @kind interface
     * 
     * @description
     * Describes an object used to wrap session storage into an injectable.
     */
    export interface ISessionStorage {
        /**
         * @name length
         * @memberof plat.storage.ISessionStorage
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Returns the number of items in sessionStorage.
         */
        length: number;
        
        /**
         * @name clear
         * @memberof plat.storage.ISessionStorage
         * @kind function
         * @access public
         * 
         * @description
         * Clears sessionStorage, deleting all of its keys.
         * 
         * @returns {void}
         */
        clear(): void;
        
        /**
         * @name getItem
         * @memberof plat.storage.ISessionStorage
         * @kind function
         * @access public
         * 
         * @description
         * Gets an item out of sessionStorage with the assigned key.
         * 
         * @param {string} key The key of the item to retrieve from sessionStorage.
         * 
         * @typeparam {any} T The type of item being retrieved.
         * 
         * @returns {T} The item retrieved from storage.
         */
        getItem<T>(key: string): T;
        
        /**
         * @name key
         * @memberof plat.storage.ISessionStorage
         * @kind function
         * @access public
         * 
         * @description
         * Allows for iterating over sessionStorage keys with an index. When
         * called with an index, it will return the key at that index in 
         * sessionStorage.
         * 
         * @param {number} index The index used to retrieve the associated key.
         * 
         * @returns {string} The key at the given index.
         */
        key(index: number): string;
        
        /**
         * @name removeItem
         * @memberof plat.storage.ISessionStorage
         * @kind function
         * @access public
         * 
         * @description
         * Searches in sessionStorage for an item and removes it if it 
         * exists.
         * 
         * @param {string} key The key of the item to remove from storage.
         * 
         * @returns {void}
         */
        removeItem(key: string): void;
        
        /**
         * @name setItem
         * @memberof plat.storage.ISessionStorage
         * @kind function
         * @access public
         * 
         * @description
         * Adds data to sessionStorage with the designated key.
         * 
         * @param {string} key The key of the item to store in sessionStorage.
         * @param {any} data The data to store in sessionStorage with the key.
         * 
         * @returns {void}
         */
        setItem(key: string, data: any): void;
    }
}
