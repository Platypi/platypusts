module plat.web {
    /**
     * The Type for referencing the '$History' injectable as a dependency. 
     * Used so that the window.history can be mocked.
     */
    export function Location($window?: Window): Location {
        return $window.location;
    }

    register.injectable(__Location, Location, [__Window]);
}
