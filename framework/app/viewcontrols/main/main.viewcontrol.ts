module app {
    var count = 0,
        arrCount = 6;

    export class MainViewControl extends plat.ui.ViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            text: <string>null,
            password: <string>null,
            keydown: '',
            count: 0,
            arr: [1, 2, 3, 4, 5],
            nested: [
                ['foo', 'bar', 'baz'],
                ['quux'],
                ['foobar', 'bazquux']
            ],
            iff: true
        };
        text: plat.controls.INamedElement<HTMLElement, void>;
        password: plat.controls.INamedElement<HTMLElement, void>;

        initialize() {
            var a = plat.acquire(MainViewControl),
                b = plat.acquire(MainViewControl);

            console.log('a instanceof MainViewControl: ', a instanceof MainViewControl);
            console.log('b instanceof MainViewControl: ', a instanceof MainViewControl);
            console.log('a !== b: ', a !== b);
        }

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
        }

        loaded() {

        }

        backButtonPressed(ev: plat.events.IDispatchEventInstance) {
            console.log('Here: ' + this.context.count);
        }

        foo() {
            var context = this.context;
            context.arr.splice(0, 1, arrCount++);
        }

        bar() {
            this.context.arr.splice(0, 1);
        }

        keyDown() {
            console.log(this.context.keydown);
        }
    }

    plat.register.viewControl('viewcontrol', (<any>MainViewControl), null, ['']);

    class App extends plat.App {
        constructor($browserConfig: plat.web.IBrowserConfig) {
            super();

            $browserConfig.baseUrl = 'app';
        }

        ready(ev: plat.events.ILifecycleEvent) {
            ev.preventDefault();

            setTimeout(() => {
                this.load();
            });
        }

        error(ev: plat.events.IErrorEvent<any>) {
            console.log(ev.error);
        }
    }

    plat.register.app('app', App, [
        plat.web.IBrowserConfig
    ]);
}
