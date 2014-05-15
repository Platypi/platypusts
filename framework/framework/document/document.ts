module plat {
    /**
     * The Type for referencing the '$document' injectable as a dependency. 
     * Used so that the Window can be mocked.
     */
    export function DocumentStatic(window: Window): Document {
        return window.document;
    }

    register.injectable('$document', DocumentStatic, [
        '$window'
    ], register.injectableType.STATIC);
}
