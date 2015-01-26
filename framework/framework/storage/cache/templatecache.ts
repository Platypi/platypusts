module plat.storage {
    /**
     * @name TemplateCache
     * @memberof plat.storage
     * @kind class
     * 
     * @extends {plat.storage.Cache<any>}
     * @implements {plat.storage.ITemplateCache}
     * 
     * @description
     * Used for caching compiled nodes. This class will
     * clone a template when you put it in the cache. It will
     * also clone the template when you retrieve it.
     */
    export class TemplateCache extends Cache<async.IThenable<DocumentFragment>> implements ITemplateCache {
        /**
         * @name _Promise
         * @memberof plat.storage.TemplateCache
         * @kind property
         * @access protected
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        protected _Promise: async.IPromise = acquire(__Promise);

        /**
         * @name _Exception
         * @memberof plat.storage.TemplateCache
         * @kind property
         * @access protected
         * 
         * @type {plat.IExceptionStatic}
         * 
         * @description
         * Reference to the {@link plat.IExceptionStatic|IExceptionStatic} injectable.
         */
        protected _Exception: IExceptionStatic = acquire(__ExceptionStatic);

        /**
         * @name constructor
         * @memberof plat.storage.TemplateCache
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.storage.TemplateCache|TemplateCache}. Creates a new {@link plat.storage.ICache|ICache}  
         * with the ID "__templateCache".
         * 
         * @returns {plat.storage.TemplateCache}
         */
        constructor() {
            super('__templateCache');
        }
        
        /**
         * @name put
         * @memberof plat.storage.TemplateCache
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Stores a Node in the cache as a DocumentFragment.
         * 
         * @param {string} key The key to use for storage/retrieval of the object.
         * @param {Node} value The Node.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves with a 
         * DocumentFragment containing the input Node.
         */
        put(key: string, value: Node): async.IThenable<DocumentFragment>;
        /**
         * @name put
         * @memberof plat.storage.TemplateCache
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Stores a {@link plat.async.IPromise|IPromise} in the cache.
         * 
         * @param {string} key The key to use for storage/retrieval of the object.
         * @param {plat.async.IThenable<Node>} value {@link plat.async.Promise|Promise} that 
         * should resolve with a Node.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A {@link plat.async.Promise|Promise} that resolves when 
         * the input {@link plat.async.Promise|Promise} resolves.
         */
        put(key: string, value: async.IThenable<Node>): async.IThenable<DocumentFragment>;
        put(key: string, value: any): async.IThenable<DocumentFragment> {
            var Promise = this._Promise;
            super.put(key, Promise.resolve<DocumentFragment>(value));

            if (isDocumentFragment(value)) {
                value = value.cloneNode(true);
            } else if (isNode(value)) {
                var fragment = document.createDocumentFragment();
                fragment.appendChild(value.cloneNode(true));
                value = fragment;
            }

            return Promise.resolve<DocumentFragment>(value);
        }
        
        /**
         * @name read
         * @memberof plat.storage.TemplateCache
         * @kind function
         * @access public
         * 
         * @description
         * Method for retrieving a Node from this cache. The DocumentFragment that resolves from the returned 
         * {@link plat.async.Promise|Promise} will be cloned to avoid manipulating the cached template.
         * 
         * @param {string} key The key to search for in this cache.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} The {@link plat.async.Promise|Promise} found at the associated key. 
         * Returns undefined for a cache miss.
         */
        read(key: string): async.IThenable<DocumentFragment> {
            var promise: async.IThenable<DocumentFragment> = super.read(key);

            if (isNull(promise)) {
                return <any>this._Promise.reject(null);
            }

            return promise.then((node) => {
                return this.put(key, node);
            }, (error: Error) => {
                var _Exception: IExceptionStatic = this._Exception;
                _Exception.warn('Error retrieving template from promise.', _Exception.TEMPLATE);
                return <DocumentFragment>null;
            });
        }
    }

    /**
     * The Type for referencing the '_templateCache' injectable as a dependency.
     */
    export function ITemplateCache(): ITemplateCache {
        return new TemplateCache();
    }

    register.injectable(__TemplateCache, ITemplateCache);
    
    /**
     * @name ITemplateCache
     * @memberof plat.storage
     * @kind interface
     * 
     * @extends {plat.storage.ICache<plat.async.IThenable<DocumentFragment>>}
     * 
     * @description
     * Used to manage all templates. Returns a unique template 
     * for every read, to avoid having to call cloneNode.
     */
    export interface ITemplateCache extends ICache<async.IThenable<DocumentFragment>> {
        /**
         * @name put
         * @memberof plat.storage.ITemplateCache
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Stores a Node in the cache as a DocumentFragment.
         * 
         * @param {string} key The key to use for storage/retrieval of the object.
         * @param {Node} value The Node.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves with a 
         * DocumentFragment containing the input Node.
         */
        put(key: string, value: Node): async.IThenable<DocumentFragment>;
        /**
         * @name put
         * @memberof plat.storage.ITemplateCache
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Stores a {@link plat.async.IPromise|IPromise} in the cache.
         * 
         * @param {string} key The key to use for storage/retrieval of the object.
         * @param {plat.async.IThenable<Node>} value {@link plat.async.Promise|Promise} that 
         * should resolve with a Node.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A {@link plat.async.Promise|Promise} that resolves when 
         * the input {@link plat.async.Promise|Promise} resolves.
         */
        put(key: string, value: async.IThenable<Node>): async.IThenable<DocumentFragment>;
        
        /**
         * @name read
         * @memberof plat.storage.ITemplateCache
         * @kind function
         * @access public
         * 
         * @description
         * Method for retrieving a Node from this cache. The DocumentFragment that resolves from the returned 
         * {@link plat.async.Promise|Promise} will be cloned to avoid manipulating the cached template.
         * 
         * @param {string} key The key to search for in this cache.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} The {@link plat.async.Promise|Promise} found at the associated key. 
         * Returns undefined for a cache miss.
         */
        read(key: string): async.IThenable<DocumentFragment>;
    }
}
