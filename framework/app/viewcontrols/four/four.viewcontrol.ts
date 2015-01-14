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
            throw new Error('test');
        }

        navigatingFrom() {
            // console.log('navigatingFrom:', this.uid);
        }

        canNavigateFrom() {

        }

        canNavigateTo() {
            // console.log('canNavigateTo:', this.uid);
        }
    }

    plat.register.viewControl('four', Four, [
        plat.routing.IRouter
    ]);
}
