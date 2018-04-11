namespace plat {
    'use strict';

    /**
     * The Type for referencing the '_document' injectable as a dependency.
     * Used so that the Window can be mocked.
     */
    export function Document(_window?: Window): Document {
        return _window.document;
    }

    register.injectable(__Document, Document, [__Window]);
}
