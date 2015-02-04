module app.viewcontrols {
    'use strict';

    export class Three extends BaseViewControl {
        templateUrl = 'viewcontrols/three/three.viewcontrol.html';
        context: { views: Array<Function>; } = {
            views: [One, Two, Three, Four]
        };

        constructor(router: plat.routing.Router) {
            super();

            router.configure([
                { pattern: '', view: One },
                { pattern: '/two', view: Two },
                { pattern: '/three', view: Three },
                { pattern: '/four', view: Four }
            ]);
        }


        navigatedTo() {
            console.log('navto');
        }

        navigatingFrom() {
            // console.log('navigatingFrom:', this.uid);
        }

        canNavigateFrom() {
            // console.log('canNavigateFrom:', this.uid);
        }

        canNavigateTo() {
            // console.log('canNavigateTo:', this.uid);
        }

        loaded() {
            this.head.title('Page Three');
            this.head.description('This is the Third page');
        }
    }

    plat.register.viewControl('three', Three, [
        plat.routing.Router
    ]);
}
