module plat.storage {
    'use strict';

    /**
     * @name TemplateCache
     * @memberof plat.storage
     * @kind class
     * 
     * @extends {plat.storage.Cache<any>}
     * 
     * @description
     * Used for caching compiled nodes. This class will
     * clone a template when you put it in the cache. It will
     * also clone the template when you retrieve it.
     */
    export class TemplateCache extends Cache<async.IThenable<DocumentFragment>> {
        protected static _inject: any = {
            _Promise: __Promise,
            _Exception: __ExceptionStatic
        };

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
        protected _Promise: async.IPromise;

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
        protected _Exception: IExceptionStatic;

        /**
         * @name constructor
         * @memberof plat.storage.TemplateCache
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.storage.TemplateCache|TemplateCache}. Creates a new {@link plat.storage.Cache|Cache}  
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

    register.injectable(__TemplateCache, TemplateCache);
}
