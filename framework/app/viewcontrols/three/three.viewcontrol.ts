﻿module app.viewcontrols {
    export class Three extends plat.ui.ViewControl {
        templateUrl = 'viewcontrols/three/three.viewcontrol.html';
        context = {
            views: ['one', 'two', 'three', 'four']
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


        navigatedTo() {
            console.log('navigatedTo:', this.uid);
        }

        navigatingFrom() {
            console.log('navigatingFrom:', this.uid);
        }

        canNavigateFrom() {
            console.log('canNavigateFrom:', this.uid);
        }

        canNavigateTo() {
            console.log('canNavigateTo:', this.uid);
        }
    }

    plat.register.viewControl('three', Three, [
        plat.routing.IRouter
    ]);
}
