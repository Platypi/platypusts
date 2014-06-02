module plat {
    /**
     * Returns the requested injectable dependency.
     * 
     * @param dependency The dependency Type to return.
     * @param {any} The requested dependency.
     */
    export function acquire(dependency: Function): any;
    /**
     * Returns the requested injectable dependency.
     * 
     * @param dependency An array of Types specifying the injectable dependencies.
     * @return {Array<any>} The dependencies, in the order they were requested.
     */
    export function acquire(dependencies: Array<Function>): Array<any>;
    /**
     * Returns the requested injectable dependency.
     * 
     * @param dependency The injectable dependency type to return.
     * @param {any} The requested dependency.
     */
    export function acquire(dependency: string): any;
    /**
     * Gathers dependencies and returns them as an array in the order they were requested.
     * 
     * @param dependencies An array of strings specifying the injectable dependencies.
     * @return {Array<any>} The dependencies, in the order they were requested.
     */
    export function acquire(dependencies: Array<string>): Array<any>;
    /**
     * Gathers dependencies and returns them as an array in the order they were requested.
     * 
     * @param dependencies An array of strings or Functions specifying the injectable dependencies.
     * @return {Array<any>} The dependencies, in the order they were requested.
     */
    export function acquire(dependencies: Array<any>): Array<any>;
    export function acquire(dependencies: any) {
        var deps: Array<dependency.IInjector<any>>,
            array = isArray(dependencies);

        if (array) {
            deps = dependency.Injector.getDependencies(dependencies);
        } else {
            deps = dependency.Injector.getDependencies([dependencies]);
        }

        var length = deps.length,
            output: Array<any> = [];

        for (var i = 0; i < length; ++i) {
            output.push(deps[i].inject());
        }

        if (!array) {
            return output[0];
        }

        return output;
    }

    /**
     * Returns the requested dependency or gathers dependencies and passes them back 
     * as an array in the order they were specified.
     */
    export interface IAcquire {
        /**
         * Returns the requested injectable dependency.
         * 
         * @param dependency The dependency Type to return.
         * @param {any} The requested dependency.
         */
        (dependency: Function): any;
        /**
         * Returns the requested injectable dependency.
         * 
         * @param dependency An array of Types specifying the injectable dependencies.
         * @return {Array<any>} The dependencies, in the order they were requested.
         */
        (dependencies: Array<Function>): Array<any>;
        /**
         * Returns the requested injectable dependency.
         * 
         * @param dependency The injectable dependency type to return.
         * @param {any} The requested dependency.
         */
        (dependency: string): any;
        /**
         * Gathers dependencies and returns them as an array in the order they were requested.
         * 
         * @param dependencies An array of strings specifying the injectable dependencies.
         * @return {Array<any>} The dependencies, in the order they were requested.
         */
        (dependencies: Array<string>): Array<any>;
        /**
         * Gathers dependencies and returns them as an array in the order they were requested.
         * 
         * @param dependencies An array of strings or Functions specifying the injectable dependencies.
         * @return {Array<any>} The dependencies, in the order they were requested.
         */
        (dependencies: Array<any>): Array<any>;
    }
}
