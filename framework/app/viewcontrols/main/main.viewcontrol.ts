module app {
    export class MainViewControl extends plat.ui.ViewControl {
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            href: 'http://google.com'
        };
        hello = true;
    }

    plat.register.viewControl('viewcontrol', MainViewControl, undefined, ['/', ':test/page(/:baz)(/*path)']);
}
