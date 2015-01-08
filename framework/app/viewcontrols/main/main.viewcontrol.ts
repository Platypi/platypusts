module app.viewcontrols {
    var count = 0,
        arrCount = 6;

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
    }

    plat.register.viewControl('main', Main, [
        plat.routing.IRouter
    ]);
}
