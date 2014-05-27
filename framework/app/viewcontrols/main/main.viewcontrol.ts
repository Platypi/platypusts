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
            this.context;
            //this.context.user = {
            //    name: 'will',
            //    role: 'contributor'
            //}

            //setTimeout(() => {
            //    this.context.user.name = 'matt';
            //}, 1000);
        }

        submit() {
            this.context;
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, undefined, ['/', ':test/page(/:baz)(/*path)']);
}
