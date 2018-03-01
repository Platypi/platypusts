module plat.web {
    'use strict';

    /**
     * The Type for referencing the '_history' injectable as a dependency.
     * Used so that the window.history can be mocked.
     */
    export function Location(_window?: Window): Location {
        return _window.location;
    }

    register.injectable(__Location, Location, [__Window]);
}
