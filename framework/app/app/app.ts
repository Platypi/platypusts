module app {
    export class App extends plat.App {
        constructor(_browserConfig: plat.web.IBrowserConfig, router: plat.routing.Router) {
            super();

            _browserConfig.baseUrl = 'app';
            //_browserConfig.routingType = _browserConfig.STATE;
            //router.configure([
            //    { pattern: '', view: viewcontrols.Main },
            //    { pattern: '/one', view: viewcontrols.One }
            //]);

            //router.intercept(() => {
            //    return true;
            //});
        }

        ready() {
            console.log('app ready');
        }

        error(ev: plat.events.ErrorEvent<any>) {
            console.log(ev.error);
        }
    }

    plat.register.app('app', App, [
        plat.web.IBrowserConfig,
        //plat.routing.Router
    ]);
}
