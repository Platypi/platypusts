/**
 * @name storage
 * @memberof plat
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds classes and interfaces related to storage in platypus.
 */
module plat.storage {
    /**
     * @name caches
     * @memberof plat.storage
     * @kind property
     * @access private
     * @static
     * @exported false
     * 
     * @type {plat.IObject<plat.storage.Cache<any>>}
     * 
     * @description
     * The keyed collection of all created {@link plat.storage.Cache|Caches} in the 
     * {@link plat.storage.ICacheFactory|ICacheFactory}.
     */
    var caches: IObject<Cache<any>> = {};
    /**
     * @name internalCaches
     * @memberof plat.storage
     * @kind property
     * @access private
     * @static
     * @exported false
     * 
     * @type {any}
     * 
     * @description
     * Internal storage for all the items stored in each {@link plat.storage.Cache|Cache}.
     */
    var internalCaches: any = {};

    /**
     * @name Cache
     * @memberof plat.storage
     * @kind class
     * 
     * @implements {plat.storage.Cache<T>}
     * 
     * @description
     * A Cache class, for use with the {@link plat.storage.ICacheFactory|ICacheFactory} injectable. 
     * Used for storing objects. Takes in a generic type corresponding to the type of objects it contains.
     * 
     * @typeparam {any} T The type of objects stored in the cache.
     */
    export class Cache<T> {
        /**
         * @name create
         * @memberof plat.storage.Cache
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Method for creating a new cache object. Takes a generic type to denote the
         * type of objects stored in the new cache.  If a cache with the same ID already exists
         * in the {@link plat.storage.ICacheFactory|ICacheFactory}, a new cache will not be created.
         * 
         * @param {string} id The ID of the new Cache.
         * @param {plat.storage.ICacheOptions} options {@link plat.storage.ICacheOptions|ICacheOptions} 
         * for customizing the Cache.
         * 
         * @typeparam {any} T Denotes the type of objects stored in the new Cache.
         * 
         * @returns {plat.storage.Cache<T>} The new cache.
         */
        static create<T>(id: string, options?: ICacheOptions): Cache<T> {
            var cache: Cache<T> = caches[id];

            if (isNull(cache)) {
                cache = caches[id] = new Cache<T>(id, options);
            }

            return cache;
        }

        /**
         * @name fetch
         * @memberof plat.storage.Cache
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Gets a cache out of the {@link plat.storage.ICacheFactory|ICacheFactory} if it exists.
         * 
         * @param {string} id The identifier used to search for the cache.
         * 
         * @typeparam {any} T Denotes the type of objects stored in the new Cache.
         * 
         * @returns {plat.storage.Cache<T>} The cache with the input ID or undefined if it does not exist.
         */
        static fetch<T>(id: string): Cache<T> {
            return caches[id];
        }

        /**
         * @name clear
         * @memberof plat.storage.Cache
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Clears the {@link plat.storage.ICacheFactory|ICacheFactory} and all of its caches.
         * 
         * @returns {void}
         */
        static clear(): void {
            var keys = Object.keys(caches),
                length = keys.length;

            for (var i = 0; i < length; ++i) {
                caches[keys[i]].clear();
            }

            caches = <IObject<Cache<any>>>{};
        }

        /**
         * @name __size
         * @memberof plat.storage.Cache
         * @kind property
         * @access private
         * 
         * @type {number}
         * 
         * @description
         * The size of this cache specified by its ID.
         */
        private __size: number;
        /**
         * @name __id
         * @memberof plat.storage.Cache
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The ID of this cache.
         */
        private __id: string;
        /**
         * @name __options
         * @memberof plat.storage.Cache
         * @kind property
         * @access private
         * 
         * @type {plat.storage.ICacheOptions}
         * 
         * @description
         * The options for this cache.
         */
        private __options: ICacheOptions;

        /**
         * @name constructor
         * @memberof plat.storage.Cache
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.storage.Cache|Cache}.
         * 
         * @param {string} id The id to use to retrieve the cache from the {@link plat.storage.ICacheFactory|ICacheFactory}.
         * @param {plat.storage.ICacheOptions} options The {@link plat.storage.ICacheOptions|ICacheOptions} for customizing the cache.
         * 
         * @returns {plat.storage.Cache} A new {@link plat.storage.Cache|Cache} instance specified by the ID.
         */
        constructor(id: string, options?: ICacheOptions) {
            this.__id = id;
            this.__options = options;
            this.__size = 0;

            if (isNull(options)) {
                this.__options = {
                    timeout: 0
                };
            }

            internalCaches[id] = {};
        }

        /**
         * @name info
         * @memberof plat.storage.Cache
         * @kind function
         * @access public
         * 
         * @description
         * Retrieves the {@link plat.storage.ICacheInfo|ICacheInfo} about this cache 
         * (i.e. ID, size, options)
         * 
         * @returns {plat.storage.ICacheInfo} The information about this cache.
         */
        info(): ICacheInfo {
            return {
                id: this.__id,
                size: this.__size,
                options: this.__options
            };
        }
        
        /**
         * @name put
         * @memberof plat.storage.Cache
         * @kind function
         * @access public
         * 
         * @description
         * Method for inserting an object into an {@link plat.storage.Cache|Cache}.
         * 
         * @param {string} key The key to use for storage/retrieval of the object.
         * @param {T} value The value to store with the associated key.
         * 
         * @returns {T} The value inserted into an {@link plat.storage.Cache|Cache}.
         */
        put(key: string, value: T): T {
            var val = internalCaches[this.__id][key];
            internalCaches[this.__id][key] = value;

            if (isUndefined(val)) {
                this.__size++;
            }

            var timeout = this.__options.timeout;

            if (isNumber(timeout) && timeout > 0) {
                defer(<(key?: string) => void>this.remove, timeout, [key], this);
            }

            return value;
        }
        
        /**
         * @name read
         * @memberof plat.storage.Cache
         * @kind function
         * @access public
         * 
         * @description
         * Method for retrieving an object from an {@link plat.storage.Cache|Cache}.
         * 
         * @param key The key to search for in an {@link plat.storage.Cache|Cache}.
         * 
         * @returns {T} The value found at the associated key. Returns undefined for a cache miss.
         */
        read(key: string): T {
            return internalCaches[this.__id][key];
        }
        
        /**
         * @name remove
         * @memberof plat.storage.Cache
         * @kind function
         * @access public
         * 
         * @description
         * Method for removing an object from an {@link plat.storage.Cache|Cache}.
         * 
         * @param {string} key The key to remove from the {@link plat.storage.Cache|Cache}.
         * 
         * @returns {void}
         */
        remove(key: string): void {
            deleteProperty(internalCaches[this.__id], key);
            this.__size--;
        }
        
        /**
         * @name clear
         * @memberof plat.storage.Cache
         * @kind function
         * @access public
         * 
         * @description
         * Method for clearing an {@link plat.storage.Cache|Cache}, removing all of its keys.
         * 
         * @returns {void}
         */
        clear(): void {
            internalCaches[this.__id] = {};
            this.__size = 0;
        }
        
        /**
         * @name dispose
         * @memberof plat.storage.Cache
         * @kind function
         * @access public
         * 
         * @description
         * Method for removing an {@link plat.storage.Cache|ICache} from the {@link plat.storage.ICacheFactory|ICacheFactory}.
         * 
         * @returns {void}
         */
        dispose(): void {
            this.clear();
            deleteProperty(caches, this.__id);
        }
    }

    /**
     * The Type for referencing the '_CacheFactory' injectable as a dependency.
     */
    export function ICacheFactory(): ICacheFactory {
        return Cache;
    }

    register.injectable(__CacheFactory, ICacheFactory, null, __FACTORY);
    
    /**
     * @name CacheFactory
     * @memberof plat.storage
     * @kind interface
     * 
     * @description
     * Used to manage all the defined caches for the current application session.
     */
    export interface ICacheFactory {
        /**
         * @name create
         * @memberof plat.storage.ICacheFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Method for creating a new cache object. Takes a generic type to denote the
         * type of objects stored in the new cache.  If a cache with the same ID already exists
         * in the {@link plat.storage.ICacheFactory|ICacheFactory}, a new cache will not be created.
         * 
         * @param {string} id The ID of the new Cache.
         * @param {plat.storage.ICacheOptions} options {@link plat.storage.ICacheOptions|ICacheOptions} 
         * for customizing the Cache.
         * 
         * @typeparam {any} T Denotes the type of objects stored in the new Cache.
         * 
         * @returns {plat.storage.Cache<T>} The new cache.
         */
        create<T>(id: string, options?: ICacheOptions): Cache<T>;

        /**
         * @name fetch
         * @memberof plat.storage.ICacheFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Gets a cache out of the {@link plat.storage.ICacheFactory|ICacheFactory} if it exists.
         * 
         * @param {string} id The identifier used to search for the cache.
         * 
         * @typeparam {any} T Denotes the type of objects stored in the new Cache.
         * 
         * @returns {plat.storage.Cache<T>} The cache with the input ID or undefined if it does not exist.
         */
        fetch<T>(id: string): Cache<T>;

        /**
         * @name clear
         * @memberof plat.storage.ICacheFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Clears the {@link plat.storage.ICacheFactory|ICacheFactory} and all of its caches.
         * 
         * @returns {void}
         */
        clear(): void;
    }
    
    /**
     * A cache for persisting NodeManager trees.
     */
    export var managerCache = Cache.create<processing.NodeManager>('__managerCache');

    /**
     * The Type for referencing the '_managerCache' injectable as a dependency.
     */
    export function IManagerCache(): typeof managerCache {
        return managerCache;
    }

    register.injectable(__ManagerCache, IManagerCache);
    
    /**
     * @name ICacheOptions
     * @memberof plat.storage
     * @kind interface
     * 
     * @description
     * Options for a cache.
     */
    export interface ICacheOptions {
        /**
         * @name timeout
         * @memberof plat.storage.ICacheOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * Specifies a timeout for a cache value. When a value 
         * is put in the cache, it will be valid for the given
         * period of time (in milliseconds). After the timeout 
         * is reached, the value will automatically be removed
         * from the cache.
         */
        timeout?: number;
    }
    
    /**
     * @name ICacheInfo
     * @memberof plat.storage
     * @kind interface
     * 
     * @description
     * Contains information about an {@link plat.storage.Cache|Cache}.
     */
    export interface ICacheInfo {
        /**
         * @name id
         * @memberof plat.storage.ICacheInfo
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A unique id for the {@link plat.storage.Cache|Cache} object, used to 
         * retrieve the {@link plat.storage.Cache|ICache} out of the {@link plat.storage.ICacheFactory|CacheFactory}.
         */
        id: string;
        
        /**
         * @name size
         * @memberof plat.storage.ICacheInfo
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * Represents the number of items in the {@link plat.storage.Cache|Cache}.
         */
        size: number;
        
        /**
         * @name options
         * @memberof plat.storage.ICacheInfo
         * @kind property
         * @access public
         * 
         * @type {plat.storage.ICacheOptions}
         * 
         * @description
         * Represents the {@link plat.storage.ICacheOptions|ICacheOptions} that the 
         * {@link plat.storage.Cache|Cache} is using.
         */
        options: ICacheOptions;
    }
}
