/**
 * @name routing
 * @memberof plat
 * @kind namespace
 * @access public
 *
 * @description
 * Holds all classes and interfaces related to routing components in platypus.
 */
namespace plat.routing {
    'use strict';

    /**
     * The Type for referencing the 'History' injectable as a dependency.
     * Used so that the window.history can be mocked.
     */
    export function History(_window?: Window): History {
        return _window.history;
    }

    /**
     * @name IHistoryState
     * @memberof plat.routing
     * @kind interface
     *
     * @description
     * An interface for the state object in history.
     */
    export interface IHistoryState {
        /**
         * @name previousLocation
         * @memberof plat.routing.IHistoryState
         * @kind function
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
         * The location that existed before navigating to this page
         */
        previousLocation: string;
    }

    register.injectable(__History, History, [__Window]);
}
