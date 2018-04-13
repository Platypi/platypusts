/// <reference path="../../references.d.ts" />

module app.viewcontrols {
    export class Main extends BaseViewControl {
        protected static _inject: any = {
            utils: plat.Utils,
        };

        public templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        public context = {
            isAdmin: false,
        };

        constructor(router: plat.routing.Router) {
            super();
        }
    }

    plat.register.viewControl('main', Main, [
        plat.routing.Router,
    ]);
}
