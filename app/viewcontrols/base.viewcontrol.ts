/// <reference path="../references.d.ts" />

module app.viewcontrols {
    plat.register.control('head', plat.ui.controls.Head);

    export class BaseViewControl extends plat.ui.ViewControl {
        protected static _inject: any = {
            head: __Head
        };

        head: plat.ui.controls.Head;
    }
}
