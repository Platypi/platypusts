module app {
    export class MainViewControl extends plat.ui.ViewControl {
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context: any = {
            href: 'http://google.com',
            names: [
                'Matt',
                'M@',
                'Darion',
                'Jonathan',
                'Paul',
                'Will'
            ],
            users: null
        };
        hello = true;

        loaded() {
        }

        submit() {
            this.context;
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, null, ['/', ':test/page(/:baz)(/*path)']);
}
