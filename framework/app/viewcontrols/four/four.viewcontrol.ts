module app.viewcontrols {
    'use strict';

    export class Four extends plat.ui.ViewControl {
        templateUrl = 'viewcontrols/four/four.viewcontrol.html';
        context: { views: Array<Function>; } = {
            views: [One, Two, Three, Four]
        };

        constructor(private Promise: plat.async.IPromise, router: plat.routing.Router) {
            super();

            router.configure([
                { pattern: '/one', view: One },
                { pattern: '/two', view: Two },
                { pattern: '/three', view: Three },
                { pattern: '/four', view: Four }
            ]);
        }

        navigatedTo() {
            
        }

        navigatingFrom() {
            // console.log('navigatingFrom:', this.uid);
        }

        canNavigateFrom() {

        }

        canNavigateTo() {
            // console.log('canNavigateTo:', this.uid);
            //return new this.Promise((resolve, reject) => {
            //    setTimeout(() => {
            //        console.log(this.navigator.router.navigating);
            //        this.navigator.navigate(Three);
            //        resolve();
            //    }, 1000);
            //});
        }
    }

    plat.register.viewControl('four', Four, [
        plat.async.IPromise,
        plat.routing.Router
    ]);
}
