/// <reference path="../references.d.ts" />

module plat {
    'use strict';

    /**
     * The Type for referencing the '_window' injectable as a dependency. 
     * Used so that the Window can be mocked.
     */
    export function Window(): Window {
        return window;
    }

    register.injectable(__Window, Window);
}
