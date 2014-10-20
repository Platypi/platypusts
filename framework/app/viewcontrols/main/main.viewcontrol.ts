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
            console.log(this.navigator.history.length);
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
        error(ev: plat.events.IErrorEvent<any>) {
            console.log(ev.error);
        }
    }

    plat.register.app('app', App);
}
