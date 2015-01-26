module app.viewcontrols {
    var count = 0,
        arrCount = 6;
    (<any>window).backCalled = 0;
    export class Main extends plat.ui.ViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            views: [One, Two, Three, Four]
        };

        constructor(router: plat.routing.Router) {
            super();

            router.configure([
                { pattern: '/one', view: One },
                { pattern: '/two', view: Two },
                { pattern: '/three', view: Three },
                { pattern: '/four', view: Four }
            ]);
        }

        navigateTo(view: string) {
            this.navigator.navigate(view).then(() => {
                console.log('navigated!');
            });
        }

        goBack() {
            this.dispatchEvent('backbutton', 'direct');
            //this.navigator.goBack();
            (<any>window).backCalled++;
        }
    }
    class Router2 extends plat.routing.Router {
        //protected static _inject: any = {
        //    utils: plat.IUtils
        //};
        //utils: plat.Utils;

        constructor() {
            super();
        }
    }


    class Router3 extends Router2 {
        utils: plat.IUtils;

        constructor(utils: any) {
            super();
            console.log(utils);
            console.log(this.utils);
        }
    }


    plat.register.viewControl('main', Main, [
        Router3
    ]);
}
