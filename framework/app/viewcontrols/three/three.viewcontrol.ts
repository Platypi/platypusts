module app.viewcontrols {
    export class Three extends plat.ui.ViewControl {
        templateUrl = 'viewcontrols/three/three.viewcontrol.html';
        context = {
            views: ['one', 'two', 'three']
        };

        constructor(router: plat.routing.Router) {
            super();

            router.configure([
                { pattern: '/one', view: One },
                { pattern: '/two', view: Two },
                { pattern: '/three', view: Three }
            ]);
        }

    }

    plat.register.viewControl('three', Three, [
        plat.routing.IRouter
    ]);
}
