module app {
    export class MainViewControl extends plat.ui.WebViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            names: [
                'Matt',
                'M@',
                'Darion',
                'Jonathan',
                'Paul',
                'Will'
            ],
            condition: false
        };
        navigatedTo(route: plat.web.IRoute<any>) {
            setInterval(() => {
                this.context.condition = !this.context.condition;
            }, 1000);
            if (route.path.length === 0) {
                return;
            }

            this.title = route.path.replace(/\//g, ' ');
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, undefined, ['']);
}
