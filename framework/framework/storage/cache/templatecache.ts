module plat.storage {
    /**
     * Used for caching compiled nodes. This class will
     * clone a template when you put it in the cache. It will
     * also clone the template when you retrieve it.
     */
    class TemplateCache extends Cache<any> implements ITemplateCache {
        $ExceptionStatic: IExceptionStatic = acquire('$ExceptionStatic');
        constructor() {
            super('__templateCache');
        }

        /**
         * Takes in a Node or a Promise. If the value is a 
         * Node, the node will be cloned and put into the cache.
         * 
         * @param key The key used to store the value.
         * @param value The template promise or Node.
         * 
         * @return {T|async.IPromise<T, Error>} The value
         */
        put(key: string, value: any) {
            super.put(key, value);

            if (isNode(value)) {
                value = value.cloneNode(true);
            }

            return value;
        }

        /**
         * Method for retrieving a Node from a TemplateCache. If a Node 
         * is found in the cache, it will be cloned.
         * 
         * @param key The key to search for in a TemplateCache.
         * 
         * @return {T|async.IPromise<T, Error>} The value found at the associated key. 
         * Returns null for an ITemplateCache miss.
         */
        read(key: string) {
            var template: any = super.read(key);

            if (isNull(template)) {
                return template;
            } else if (isNode(template)) {
                return template.cloneNode(true);
            }

            return template.then((node: Node) => {
                return this.put(key, node).cloneNode(true);
            }).catch((error) => {
                this.$ExceptionStatic.warn('Error retrieving template from promise.', this.$ExceptionStatic.TEMPLATE);
            });
        }
    }

    register.injectable('$templateCache', TemplateCache);

    /**
     * Interface for TemplateCache, used to manage all templates. Returns a unique template 
     * for every read, to avoid having to call cloneNode.
     */
    export interface ITemplateCache extends ICache<async.IPromise<DocumentFragment, Error>> {
        /**
         * Takes in a Node or a Promise. If the value is a 
         * Node, the node will be cloned and put into the cache.
         * 
         * @param key The key used to store the value.
         * @param value The template promise or Node.
         */
        put(key: string, value: any): any;

        /**
         * Method for retrieving a Node from an ITemplateCache. The returned Node will be 
         * cloned to avoid manipulating the cached template.
         * 
         * @param key The key to search for in an ITemplateCache.
         * 
         * @return {Node|async.IPromise<T, Error>} The value found at the associated key. 
         * Returns null for an ITemplateCache miss.
         */
        read(key: string): any;
    }
}
