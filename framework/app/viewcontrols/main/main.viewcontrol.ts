module app {
    export class MainViewControl extends plat.ui.WebViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context: any = {
            items: [
                { first: 'Matt', last: 'Morgan' },
                { first: 'Darion', last: 'Welch' },
                { first: 'Will', last: 'Johnston' }
            ],
        };

        navigatedTo(route: plat.web.IRoute<any>) {
            console.log((<any>Object).observe);
            if (route.path.length === 0) {
                return;
            }

            this.title = route.path.replace(/\//g, ' ');
        }

        pushPop() {
            var items = this.context.items;
            if (items.length % 2 === 0) {
                items.push({ first: 'Jon', last: 'McCann' });
                return;
            }

            items.pop();
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, ['foo'], ['']);
}
