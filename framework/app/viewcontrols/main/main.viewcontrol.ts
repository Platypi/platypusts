module app {
    var count = 0;

    export class MainViewControl extends plat.ui.ViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            text: <string>null,
            password: <string>null,
            keydown: '',
            count: 0
        };
        text: plat.controls.INamedElement<HTMLElement, void>;
        password: plat.controls.INamedElement<HTMLElement, void>;

        navigate() {
            this.navigator.navigate(MainViewControl, {
                // initialize: true
            });
        }

        goBack() {
            this.navigator.goBack({
                // ViewControl: MainViewControl,
                parameter: true
            });
        }

        navigatedTo(param: any) {
            var x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            console.log(x.slice(-5));

            if (!param) {
                this.context.count = ++count;
            }
            // if (route.path.length === 0) {
            //     return;
            // }

            // this.title = route.path.replace(/\//g, ' ');
        }

        loaded() {

        }

        backButtonPressed(ev: plat.events.IDispatchEventInstance) {
            console.log('Here: ' + this.context.count);
        }

        foo() {
            var context = this.context;
            console.log(context.text);
            console.log(context.password);
            console.log('');
        }

        keyDown() {
            console.log(this.context.keydown);
        }
    }

    plat.register.viewControl('viewcontrol', (<any>MainViewControl), null, ['']);

    class App extends plat.App {
        //ready(ev: plat.events.ILifecycleEvent) {
        //    ev.cancel();

        //    setTimeout(() => {
        //        this.load();
        //    }, 5000);
        //}

        constructor($browserConfig: plat.web.IBrowserConfig) {
            super();

            $browserConfig.baseUrl = 'app';
        }

        error(ev: plat.events.IErrorEvent<any>) {
            console.log(ev.error);
        }
    }

    plat.register.app('app', App, [
        plat.web.IBrowserConfig
    ]);
}
