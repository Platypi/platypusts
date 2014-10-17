module app {
    var count = 0;

    export class MainViewControl extends plat.ui.WebViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            text: <string>null,
            password: <string>null,
            keydown: ''
        };
        count: number;
        text: plat.controls.INamedElement<HTMLElement, void>;
        password: plat.controls.INamedElement<HTMLElement, void>;

        setTemplate() {
            this.count = count;
            if (count++ === 2) {
                var port = this.element.querySelector('plat-viewport');
                this.element.removeChild(port);
            }
        }

        navigatedTo(route: plat.web.IRoute<any>) {
            //if (route.path.length === 0) {
            //    return;
            //}

            //this.title = route.path.replace(/\//g, ' ');
        }

        loaded() {
            this.on('backButtonPressed', this.backButtonPressed);
            if (count === 3) {
                this.dispatchEvent('backbutton', 'direct');
            }
        }

        backButtonPressed(ev: plat.events.IDispatchEventInstance) {
            console.log('Here: ' + this.count);
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

    plat.register.viewControl('viewcontrol', MainViewControl, null, ['']);
}
