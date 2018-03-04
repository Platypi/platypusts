/**
 * @name plat
 * @kind namespace
 * @access public
 *
 * @description
 * The entry point into the platypus library.
 */
namespace plat {
    'use strict';

    if (!isUndefined(window)) {
        if (isUndefined((<any>window).plat)) {
            (<any>window).plat = plat;
        }

        if (isUndefined((<any>window).module)) {
            (<any>window).module = {};
        }
    }

    /**
     * @name acquire
     * @memberof plat
     * @kind function
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
    export function acquire<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
        dependencies: [
            ((...args: any[]) => T1) | (new (...args: any[]) => T1),
            ((...args: any[]) => T2) | (new (...args: any[]) => T2),
            ((...args: any[]) => T3) | (new (...args: any[]) => T3),
            ((...args: any[]) => T4) | (new (...args: any[]) => T4),
            ((...args: any[]) => T5) | (new (...args: any[]) => T5),
            ((...args: any[]) => T6) | (new (...args: any[]) => T6),
            ((...args: any[]) => T7) | (new (...args: any[]) => T7),
            ((...args: any[]) => T8) | (new (...args: any[]) => T8),
            ((...args: any[]) => T9) | (new (...args: any[]) => T9),
            ((...args: any[]) => T10) | (new (...args: any[]) => T10)
        ]
    ): [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10];
    export function acquire<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        dependencies: [
            ((...args: any[]) => T1) | (new (...args: any[]) => T1),
            ((...args: any[]) => T2) | (new (...args: any[]) => T2),
            ((...args: any[]) => T3) | (new (...args: any[]) => T3),
            ((...args: any[]) => T4) | (new (...args: any[]) => T4),
            ((...args: any[]) => T5) | (new (...args: any[]) => T5),
            ((...args: any[]) => T6) | (new (...args: any[]) => T6),
            ((...args: any[]) => T7) | (new (...args: any[]) => T7),
            ((...args: any[]) => T8) | (new (...args: any[]) => T8),
            ((...args: any[]) => T9) | (new (...args: any[]) => T9)
        ]
    ): [T1, T2, T3, T4, T5, T6, T7, T8, T9];
    export function acquire<T1, T2, T3, T4, T5, T6, T7, T8>(
        dependencies: [
            ((...args: any[]) => T1) | (new (...args: any[]) => T1),
            ((...args: any[]) => T2) | (new (...args: any[]) => T2),
            ((...args: any[]) => T3) | (new (...args: any[]) => T3),
            ((...args: any[]) => T4) | (new (...args: any[]) => T4),
            ((...args: any[]) => T5) | (new (...args: any[]) => T5),
            ((...args: any[]) => T6) | (new (...args: any[]) => T6),
            ((...args: any[]) => T7) | (new (...args: any[]) => T7),
            ((...args: any[]) => T8) | (new (...args: any[]) => T8)
        ]
    ): [T1, T2, T3, T4, T5, T6, T7, T8];
    export function acquire<T1, T2, T3, T4, T5, T6, T7>(
        dependencies: [
            ((...args: any[]) => T1) | (new (...args: any[]) => T1),
            ((...args: any[]) => T2) | (new (...args: any[]) => T2),
            ((...args: any[]) => T3) | (new (...args: any[]) => T3),
            ((...args: any[]) => T4) | (new (...args: any[]) => T4),
            ((...args: any[]) => T5) | (new (...args: any[]) => T5),
            ((...args: any[]) => T6) | (new (...args: any[]) => T6),
            ((...args: any[]) => T7) | (new (...args: any[]) => T7)
        ]
    ): [T1, T2, T3, T4, T5, T6, T7];
    export function acquire<T1, T2, T3, T4, T5, T6>(
        dependencies: [
            ((...args: any[]) => T1) | (new (...args: any[]) => T1),
            ((...args: any[]) => T2) | (new (...args: any[]) => T2),
            ((...args: any[]) => T3) | (new (...args: any[]) => T3),
            ((...args: any[]) => T4) | (new (...args: any[]) => T4),
            ((...args: any[]) => T5) | (new (...args: any[]) => T5),
            ((...args: any[]) => T6) | (new (...args: any[]) => T6)
        ]
    ): [T1, T2, T3, T4, T5, T6];
    export function acquire<T1, T2, T3, T4, T5>(
        dependencies: [
            ((...args: any[]) => T1) | (new (...args: any[]) => T1),
            ((...args: any[]) => T2) | (new (...args: any[]) => T2),
            ((...args: any[]) => T3) | (new (...args: any[]) => T3),
            ((...args: any[]) => T4) | (new (...args: any[]) => T4),
            ((...args: any[]) => T5) | (new (...args: any[]) => T5)
        ]
    ): [T1, T2, T3, T4, T5];
    export function acquire<T1, T2, T3, T4>(
        dependencies: [
            ((...args: any[]) => T1) | (new (...args: any[]) => T1),
            ((...args: any[]) => T2) | (new (...args: any[]) => T2),
            ((...args: any[]) => T3) | (new (...args: any[]) => T3),
            ((...args: any[]) => T4) | (new (...args: any[]) => T4)
        ]
    ): [T1, T2, T3, T4];
    export function acquire<T1, T2, T3>(
        dependencies: [
            ((...args: any[]) => T1) | (new (...args: any[]) => T1),
            ((...args: any[]) => T2) | (new (...args: any[]) => T2),
            ((...args: any[]) => T3) | (new (...args: any[]) => T3)
        ]
    ): [T1, T2, T3];
    export function acquire<T1, T2>(
        dependencies: [
            ((...args: any[]) => T1) | (new (...args: any[]) => T1),
            ((...args: any[]) => T2) | (new (...args: any[]) => T2)
        ]
    ): [T1, T2];
    export function acquire<T>(
        dependency: ((...args: any[]) => T) | (new (...args: any[]) => T)
    ): T;
    export function acquire(
        dependencies:
            | ((...args: any[]) => any)
            | (new (...args: any[]) => any)
            | Function
            | Function[]
            | string
            | string[]
            | any[]
    ): any;
    export function acquire(dependencies: any): any {
        const array = isArray(dependencies);
        let deps: dependency.Injector<any>[];

        if (array) {
            deps = dependency.Injector.getDependencies(<any[]>dependencies);
        } else {
            deps = dependency.Injector.getDependencies([dependencies]);
        }

        const length = deps.length;
        const output: any[] = [];

        for (let i = 0; i < length; i += 1) {
            output.push(deps[i].inject());
        }

        if (!array) {
            return output[0];
        }

        return output;
    }
}
