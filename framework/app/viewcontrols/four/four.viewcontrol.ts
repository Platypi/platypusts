module app.viewcontrols {
    'use strict';

    export class Four extends plat.ui.ViewControl {
        templateUrl = 'viewcontrols/four/four.viewcontrol.html';
        context: { views: Array<Function>; } = {
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


        navigatedTo() {
            // console.log('navigatedTo:', this.uid);
        }

        navigatingFrom() {
            // console.log('navigatingFrom:', this.uid);
        }

        canNavigateFrom() {
        }

        canNavigateTo() {
            // console.log('canNavigateTo:', this.uid);
            this.navigator.navigate(Three);
        }
    }

    plat.register.viewControl('four', Four, [
        plat.routing.IRouter
    ]);
}
