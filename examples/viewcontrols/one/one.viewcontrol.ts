/// <reference path="../../references.d.ts" />

module app.viewcontrols {
    export class One extends BaseViewControl {
        templateUrl = 'viewcontrols/one/one.viewcontrol.html';
        context = {
            views: [
                { route: Main, name: 'main' },
                { route: Three, name: 'three' },
                { route: Four, name: 'four' }
            ]
        };
        constructor(router: plat.routing.Router) {
            super();
            console.log('constructing 1');
            router.configure([
                { pattern: '', view: Main },
                { pattern: '/three', view: Three },
                { pattern: '/four', view: Four }
            ]);
        }

        loaded() {
            this.head.title('Page One');
            this.head.description('This is the first page');
        }

        goBack() {
            this.navigator.goBack();
        }
    }

    plat.register.viewControl('one', One, [
        plat.routing.Router
    ]);
}
