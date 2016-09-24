/// <reference path="../../references.d.ts" />

module app.viewcontrols {
    export class Main extends BaseViewControl {
        protected static _inject: any = {
            utils: plat.Utils
        };

        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            arr: <Array<any>>[]
        };

        constructor(router: plat.routing.Router) {
            super();
        }

        push1() {
            this.context.arr.push({
                arr: []
            });
        }

        push2(index: number) {
            this.context.arr[index].arr.push({
                name: index
            });
        }

        splice1(index: number) {
            this.context.arr.splice(index, 1);
        }
    }

    plat.register.control('main', Main);
}
