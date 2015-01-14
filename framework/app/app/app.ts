module app {
    export class App extends plat.App {
        constructor(_browserConfig: plat.web.IBrowserConfig, router: plat.routing.Router) {
            super();

            _browserConfig.baseUrl = 'app';

            router.configure([
                { pattern: '', view: viewcontrols.Main },
                { pattern: '/one', view: viewcontrols.One }
            ]);
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
