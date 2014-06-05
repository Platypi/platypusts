module plat.storage {
    /**
     * Used for caching compiled nodes. This class will
     * clone a template when you put it in the cache. It will
     * also clone the template when you retrieve it.
     */
    export class TemplateCache extends Cache<any> implements ITemplateCache {
        $Promise: async.IPromise = acquire(__Promise);

        constructor() {
            super('__templateCache');
        }

        put(key: string, value: Node): async.IThenable<DocumentFragment>;
        put(key: string, value: async.IThenable<Node>): async.IThenable<DocumentFragment>;
        put(key: string, value: any): async.IThenable<DocumentFragment> {
            super.put(key, this.$Promise.resolve<DocumentFragment>(value));

            if (isDocumentFragment(value)) {
                value = value.cloneNode(true);
            } else if (isNode(value)) {
                var fragment = document.createDocumentFragment();
                fragment.appendChild(value.cloneNode(true));
                value = fragment;
            }
            
            return this.$Promise.resolve<DocumentFragment>(value);
        }

        read(key: string): async.IThenable<DocumentFragment> {
            var promise: async.IThenable<DocumentFragment> = super.read(key);

            if (isNull(promise)) {
                return <any>this.$Promise.reject(null);
            }

            promise.then<DocumentFragment>((node) => {
                return this.put(key, node);
            }).catch((error) => {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.warn('Error retrieving template from promise.', $exception.TEMPLATE);
            });

            return promise;
        }
    }

    /**
     * The Type for referencing the '$TemplateCache' injectable as a dependency.
     */
    export function ITemplateCache(): ITemplateCache { 
        return new TemplateCache()
    }

    register.injectable(__TemplateCache, ITemplateCache);

    /**
     * Interface for TemplateCache, used to manage all templates. Returns a unique template 
     * for every read, to avoid having to call cloneNode.
     */
    export interface ITemplateCache extends ICache<async.IThenable<DocumentFragment>> {
        /**
         * Stores a Node in the cache as a DocumentFragment.
         * 
         * @param key The key used to store the value.
         * @param value The Node.
         */
        put(key: string, value: Node): async.IThenable<DocumentFragment>;
        /**
         * Stores a Promise in the cache.
         * 
         * @param key The key used to store the value.
         * @param value The Promise.
         */
        put(key: string, value: async.IThenable<Node>): async.IThenable<DocumentFragment>;

        /**
         * Method for retrieving a Node from an ITemplateCache. The returned DocumentFragment will be 
         * cloned to avoid manipulating the cached template. 
         * 
         * @param key The key to search for in an ITemplateCache.
         */
        read(key: string): async.IThenable<DocumentFragment>;
    }
}
