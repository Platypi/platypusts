/// <reference path="../references.d.ts" />

namespace app.viewcontrols {
    plat.register.control('head', plat.ui.controls.Head);

    export class BaseViewControl extends plat.ui.ViewControl {
        protected static _inject: any = {
            head: __Head,
        };

        public head: plat.ui.controls.Head;
    }
}
