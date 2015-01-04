module app {
    export class App extends plat.App {
        constructor($browserConfig: plat.web.IBrowserConfig, router: plat.routing.Router) {
            super();

            router.previousUrl = '/';
            router.configure({
                pattern: '/',
                view: viewcontrols.Main
            });
            $browserConfig.routingType = $browserConfig.HASH;
            $browserConfig.baseUrl = 'app';
        }

        error(ev: plat.events.IErrorEvent<any>) {
            console.log(ev.error);
        }
    }

    plat.register.app('app', App, [
        plat.web.IBrowserConfig,
        plat.routing.IRouter
    ]);
}
