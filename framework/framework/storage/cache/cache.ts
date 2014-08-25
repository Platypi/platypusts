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
    var caches: IObject<Cache<any>> = {};
    var internalCaches: any = {};

    /**
     * A Cache class, for use with the $CacheFactory injectable. Used for storing objects.
     * Takes in a generic type corresponding to the type of objects it contains.
     * 
     */
    export class Cache<T> implements ICache<T> {
        /**
         * Method for creating a new Cache. Takes a generic type to denote the
         * type of objects stored in the new Cache.  If the Cache already exists
         * in the $CacheFactory, a new Cache will not be created.
         * 
         * @static
         * @param id The id of the new Cache.
         * @param options ICacheOptions for customizing the Cache.
         */
        static create<T>(id: string, options?: ICacheOptions): ICache<T> {
            var cache: ICache<T> = caches[id];

            if (isNull(cache)) {
                cache = caches[id] = new Cache<T>(id, options);
            }

            return cache;
        }

        /**
         * Gets a cache out of the $CacheFactory if it exists.
         * 
         * @static
         * @param id The identifier used to search for the cache.
         * 
         * @returns {Cache<T>|undefined}
         */
        static fetch<T>(id: string): ICache<T> {
            return caches[id];
        }

        /**
         * Clears the CacheFactory and all of its caches.
         * 
         * @static
         */
        static clear(): void {
            var keys = Object.keys(caches),
                length = keys.length;

            for (var i = 0; i < length; ++i) {
                caches[keys[i]].clear();
            }

            caches = <IObject<Cache<any>>>{};
        }

        private __size: number;
        private __id: string;
        private __options: ICacheOptions;

        /**
         * @param id The id to use to retrieve the cache from the CacheFactory.
         * @param options The ICacheOptions for customizing the cache.
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

        info(): ICacheInfo {
            return {
                id: this.__id,
                size: this.__size,
                options: this.__options
            };
        }

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

        read(key: string): T {
            return internalCaches[this.__id][key];
        }

        remove(key: string): void {
            deleteProperty(internalCaches[this.__id], key);
            this.__size--;
        }

        clear(): void {
            internalCaches[this.__id] = {};
            this.__size = 0;
        }

        dispose(): void {
            this.clear();
            deleteProperty(caches, this.__id);
        }
    }

    /**
     * The Type for referencing the '$CacheFactory' injectable as a dependency.
     */
    export function ICacheFactory(): ICacheFactory {
        return Cache;
    }

    register.injectable(__CacheFactory, ICacheFactory, null, __FACTORY);

    /**
     * Used to manage all the defined caches for the current application session.
     */
    export interface ICacheFactory {
        /**
         * Method for creating a new ICache. Takes a generic type to denote the
         * type of objects stored in the new ICache.  If the ICache already exists
         * in the ICacheStatic, a new ICache will not be created.
         * 
         * @param id The id of the new ICache.
         * @param options ICacheOptions for customizing the ICache.
         * 
         * @returns {ICache} The newly created ICache object.
         */
        create<T>(id: string, options?: ICacheOptions): ICache<T>;

        /**
         * Gets a cache out of the ICacheStatic if it exists.
         * 
         * @param id The identifier used to search for the cache.
         * 
         * @returns {ICache|undefined}
         */
        fetch<T>(id: string): ICache<T>;

        /**
         * Clears the ICacheStatic and all of its caches.
         */
        clear(): void;
    }

    /**
     * The ICache interface describing a cache. Takes in a generic type
     * corresponding to the type of objects stored in the cache.
     */
    export interface ICache<T> {
        /**
         * Method for accessing information about an ICache.
         */
        info(): ICacheInfo;

        /**
         * Method for inserting an object into an ICache.
         * 
         * @param key The key to use for storage/retrieval of the object.
         * @param value The value to store with the associated key.
         * 
         * @returns {T} The value inserted into an ICache.
         */
        put(key: string, value: T): T;

        /**
         * Method for retrieving an object from an ICache.
         * 
         * @param key The key to search for in an ICache.
         * 
         * @returns {T|undefined} The value found at the associated key. 
         * Returns undefined for an ICache miss.
         */
        read(key: string): T;

        /**
         * Method for removing an object from an ICache.
         * 
         * @param key The key to remove from an ICache.
         */
        remove(key: string): void;

        /**
         * Method for clearing an ICache, removing all of its keys.
         */
        clear(): void;

        /**
         * Method for removing an ICache from the $CacheFactory.
         */
        dispose(): void;
    }

    /**
     * A cache for persisting NodeManager trees.
     */
    var managerCache = Cache.create<processing.INodeManager>('__managerCache');

    /**
     * The Type for referencing the '$ManagerCache' injectable as a dependency.
     */
    export function IManagerCache(): typeof managerCache {
        return managerCache;
    }

    register.injectable(__ManagerCache, IManagerCache);

    /**
     * Options for a cache.
     */
    export interface ICacheOptions {
        /**
         * Specifies a timeout for a cache value. When a value 
         * is put in the cache, it will be valid for the given
         * period of time (in milliseconds). After the timeout 
         * is reached, the value will automatically be removed
         * from the cache.
         */
        timeout?: number;
    }

    /**
     * Contains information about an ICache.
     */
    export interface ICacheInfo {
        /**
         * A unique id for the ICache object, used to 
         * retrieve the ICache out of the $CacheFactory.
         */
        id: string;

        /**
         * Represents the number of items in the ICache.
         */
        size: number;

        /**
         * Represents the ICacheOptions that the ICache is
         * using.
         */
        options: ICacheOptions;
    }
}
