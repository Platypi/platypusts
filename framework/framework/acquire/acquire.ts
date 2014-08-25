/**
 * @name plat
 * @kind namespace
 * @access public
 * 
 * @description
 * The entry point into the platypus library.
 */
module plat {
    /**
     * @name acquire
     * @memberof plat
     * @kind function
     * @variation 0
     * @access public
     * @static
     * 
     * @description
     * Returns the requested injectable dependency.
     * 
     * @typeparam {any} T The type of the requested dependency.
     * 
     * @param {() => T} dependency The dependency Type to return.
     * 
     * @returns T The requested dependency.
     */
    export function acquire<T>(dependency: () => T): T;
    /**
     * @name acquire
     * @memberof plat
     * @kind function
     * @variation 1
     * @access public
     * @static
     * 
     * @description
     * Returns the requested injectable dependency.
     * 
     * @param {Function} dependency The dependency Type to return.
     * 
     * @returns {any} The requested dependency.
     */
    export function acquire(dependency: Function): any;
    /**
     * @name acquire
     * @memberof plat
     * @kind function
     * @variation 2
     * @access public
     * @static
     * 
     * @description
     * Returns the requested injectable dependency.
     * 
     * @param {Function} dependency An array of Types specifying the injectable dependencies.
     * 
     * @returns {Array<any>} The dependencies, in the order they were requested.
     */
    export function acquire(dependencies: Array<Function>): Array<any>;
    /**
     * @name acquire
     * @memberof plat
     * @kind function
     * @variation 3
     * @access public
     * @static
     * 
     * @description
     * Returns the requested injectable dependency.
     * 
     * @param {string} dependency The injectable dependency type to return.
     * 
     * @returns {any} The requested dependency.
     */
    export function acquire(dependency: string): any;
    /**
     * @name acquire
     * @memberof plat
     * @kind function
     * @variation 4
     * @access public
     * @static
     * 
     * @description
     * Gathers dependencies and returns them as an array in the order they were requested.
     * 
     * @param {Array<string>} dependencies An array of strings specifying the injectable dependencies.
     * 
     * @returns {Array<any>} The dependencies, in the order they were requested.
     */
    export function acquire(dependencies: Array<string>): Array<any>;
    /**
     * @name acquire
     * @memberof plat
     * @kind function
     * @variation 5
     * @access public
     * @static
     * 
     * @description
     * Gathers dependencies and returns them as an array in the order they were requested.
     * 
     * @param {Array<any>} dependencies An array of strings or Functions specifying the injectable dependencies.
     * 
     * @returns {Array<any>} The dependencies, in the order they were requested.
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
}
