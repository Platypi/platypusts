module plat {
    /**
     * The Type for referencing the '$Window' injectable as a dependency. 
     * Used so that the Window can be mocked.
     */
    export function IWindow(): Window {
        return window;
    }

    register.injectable(__Window, IWindow);
}
