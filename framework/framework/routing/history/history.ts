module plat.routing {
    /**
     * The Type for referencing the '$History' injectable as a dependency. 
     * Used so that the window.history can be mocked.
     */
    export function History($window?: Window): History {
        return $window.history;
    }

    register.injectable(__History, History, [__Window]); 
}
 