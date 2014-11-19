module plat.storage {
    /**
     * @name LocalStorage
     * @memberof plat.storage
     * @kind class
     * 
     * @extends {plat.storage.BaseStorage}
     * @implements {plat.storage.ILocalStorage}
     * 
     * @description
     * A class used to wrap HTML5 localStorage into an injectable.
     */
    export class LocalStorage extends BaseStorage implements ILocalStorage {
        constructor() {
            super((<Window>plat.acquire(__Window)).localStorage;
        }
    }

    /**
     * The Type for referencing the '$LocalStorage' injectable as a dependency.
     */
    export function ILocalStorage(): ILocalStorage {
        return new LocalStorage();
    }

    register.injectable(__LocalStorage, ILocalStorage);
    
    /**
     * @name ILocalStorage
     * @memberof plat.storage
     * @kind interface
     * 
     * @description
     * Describes an object used to wrap local storage into an injectable.
     */
    export interface ILocalStorage {
        /**
         * @name length
         * @memberof plat.storage.ILocalStorage
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Returns the number of items in localStorage.
         */
        length: number;
        
        /**
         * @name clear
         * @memberof plat.storage.ILocalStorage
         * @kind function
         * @access public
         * 
         * @description
         * Clears localStorage, deleting all of its keys.
         * 
         * @returns {void}
         */
        clear(): void;
        
        /**
         * @name getItem
         * @memberof plat.storage.ILocalStorage
         * @kind function
         * @access public
         * 
         * @description
         * Gets an item out of localStorage with the assigned key.
         * 
         * @param {string} key The key of the item to retrieve from localStorage.
         * 
         * @typeparam {any} T The type of item being retrieved.
         * 
         * @returns {T} The item retrieved from storage.
         */
        getItem<T>(key: string): T;
        
        /**
         * @name key
         * @memberof plat.storage.ILocalStorage
         * @kind function
         * @access public
         * 
         * @description
         * Allows for iterating over localStorage keys with an index. When
         * called with an index, it will return the key at that index in 
         * localStorage.
         * 
         * @param {number} index The index used to retrieve the associated key.
         * 
         * @returns {string} The key at the given index.
         */
        key(index: number): string;
        
        /**
         * @name removeItem
         * @memberof plat.storage.ILocalStorage
         * @kind function
         * @access public
         * 
         * @description
         * Searches in localStorage for an item and removes it if it 
         * exists.
         * 
         * @param {string} key The key of the item to remove from storage.
         * 
         * @returns {void}
         */
        removeItem(key: string): void;
        
        /**
         * @name setItem
         * @memberof plat.storage.ILocalStorage
         * @kind function
         * @access public
         * 
         * @description
         * Adds data to localStorage with the designated key.
         * 
         * @param {string} key The key of the item to store in localStorage.
         * @param {any} data The data to store in localStorage with the key.
         * 
         * @returns {void}
         */
        setItem(key: string, data: any): void;
    }
}
