
/**
 * @name routing
 * @memberof plat
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds all classes and interfaces related to routing components in platypus.
 */
module plat.routing {
    'use strict';

    /**
     * The Type for referencing the 'History' injectable as a dependency. 
     * Used so that the window.history can be mocked.
     */
    export function History(_window?: Window): History {
        return _window.history;
    }

    register.injectable(__History, History, [__Window]);
}
