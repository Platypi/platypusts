module app {
    export class App extends plat.App {
        constructor($browserConfig: plat.web.IBrowserConfig, router: plat.routing.Router) {
            super();

            $browserConfig.routingType = $browserConfig.HASH;
            $browserConfig.baseUrl = 'app';

            router.configure({
                pattern: '',
                view: viewcontrols.Main
            });
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
