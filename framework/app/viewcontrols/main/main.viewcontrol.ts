module app {
    export class MainViewControl extends plat.ui.ViewControl {
        context = {
            href: 'http://google.com'
        };
        hello = true;
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        initialize() {
            this.context;
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, undefined, ['/', ':test/page(/:baz)(/*path)']);
}
