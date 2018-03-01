/// <reference path="../../references.d.ts" />

module app.viewcontrols {
    export class Main extends BaseViewControl {
        protected static _inject: any = {
            utils: plat.Utils,
        };

        public templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        public context = {
            arr: <any[]>[],
            options: [
                { value: 1, text: 'Option 1' },
                { value: 2, text: 'Option 2' },
                { value: 3, text: 'Option 3' },
                { value: 4, text: 'Option 4' },
            ],
            selected: 3,
        };

        constructor(router: plat.routing.Router) {
            super();
        }

        public push1() {
            console.log((<any>this.context).selected);
            this.context.arr.push({
                arr: [],
            });
        }

        public push2(index: number) {
            this.context.arr[index].arr.push({
                name: index,
            });
        }

        public splice1(index: number) {
            this.context.arr.splice(index, 1);
        }
    }

    plat.register.viewControl('main', Main, [
        plat.routing.Router,
    ]);
}

function foo(z: [string, string, string]) {

}

let x: [string, string, string] = ['foo', 'bar', 'baz'];
let y: string[] = x;

foo(x);
foo(y);
