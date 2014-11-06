module plat {
    /**
     * The Type for referencing the '$Document' injectable as a dependency. 
     * Used so that the Window can be mocked.
     */
    export function Document($Window?: Window): Document {
        return $Window.document;
    }

    register.injectable(__Document, Document, [__Window]);
}
