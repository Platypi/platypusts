module app.viewcontrols {
    var count = 0,
        arrCount = 6;
    (<any>window).backCalled = 0;
    export class Main extends plat.ui.ViewControl {
        protected static _inject: any = {
            utils: plat.Utils
        };

        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            views: [One, Two, Three, Four],
            items: <Array<string>>[]
        };

        constructor(router: plat.routing.Router) {
            super();
            //router.configure([
            //    { pattern: '/one', view: One },
            //    { pattern: '/two', view: Two },
            //    { pattern: '/three', view: Three },
            //    { pattern: '/four', view: Four }
            //]);
        }

        initialize() {
            var items: Array<string> = [];
            for (var i = 0; i < 1000; ++i) {
                items.push('' + i);
            }

            this.context.items = items;
        }

        navigateTo(view: string) {
            this.navigator.navigate(view).then(() => {
                console.log('navigated!');
            });
        }

        goBack() {
            this.navigator.goBack().then(() => {
                console.log('test');
            });
        }
    }

    plat.register.control('main', Main, [
        //plat.routing.Router
    ]);
}
