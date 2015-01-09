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

        constructor(public router: plat.routing.Router) {
            super();
            
            router.configure([
                { pattern: '/one', view: One },
                { pattern: '/two', view: Two },
                { pattern: '/three', view: Three },
                { pattern: '/four', view: Four }
            ]);
        }

        navigateTo(view: string) {
            this.navigator.navigate(view);
        }

        goBack() {
            this.dispatchEvent('backbutton', 'direct');
            //this.navigator.goBack();
            (<any>window).backCalled++;
        }
    }

    plat.register.viewControl('main', Main, [
        plat.routing.IRouter
    ]);
}
