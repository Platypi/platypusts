module plat.routing {
    /**
     * The Type for referencing the '_history' injectable as a dependency. 
     * Used so that the window.history can be mocked.
     */
    export function History(_window?: Window): History {
        return _window.history;
    }

    register.injectable(__History, History, [__Window]); 
}
 