module plat {
    /**
     * The Type for referencing the '$window' injectable as a dependency. 
     * Used so that the Window can be mocked.
     */
    export function WindowStatic() {
        return window;
    }

    register.injectable('$window', WindowStatic,
        null, register.injectableType.STATIC);
}
