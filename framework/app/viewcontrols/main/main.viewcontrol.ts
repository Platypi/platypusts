module app {
    export class MainViewControl extends plat.ui.ViewControl {
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            href: 'http://google.com',
            names: [
                'Matt',
                'M@',
                'Darion',
                'Jonathan',
                'Paul',
                'Will'
            ]
        };
        hello = true;
    }

    plat.register.viewControl('viewcontrol', MainViewControl, undefined, ['/', ':test/page(/:baz)(/*path)']);
}
