module app.viewcontrols {

    var count = 0,
        arrCount = 6;
    (<any>window).backCalled = 0;
    export class Main extends BaseViewControl {
        protected static _inject: any = {
            utils: plat.Utils
        };

        title = 'Main';
        //templateString = `
        //    <plat-foreach plat-context="items">
        //        <div>{{value}}-{{@index}}</div>
        //    </plat-foreach>
        //`;
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            views: ['alias-one', 'alias-two', 'alias-three', 'alias-four', 'alias-five', Three, Four],
            test: <Array<any>>[1, 2, 3, 4],
            items: <Array<{ value: string|number; }>>[],
            testClass: 'foo quux',
            select: [
                { value: 0, textContent: 'foo' },
                { value: 1, textContent: 'bar' },
                { value: 2, textContent: 'baz' }
            ],
            selectedVal: <any>null
        };

        constructor(router: plat.routing.Router) {
            super();
            router.configure([
                { pattern: '', view: One, alias: 'alias-one' },
                { pattern: '/two', view: One, alias: 'alias-two' },
                { pattern: '/6', view: Three, alias: 'alias-three' },
                { pattern: '/7', view: Three, alias: 'alias-four' },
                { pattern: '/8', view: One, alias: 'alias-five' },
                { pattern: '/three', view: Three },
                { pattern: '/four', view: Four }
            ]);

            router.unknown((info) => {
                info.view = viewcontrols.ErrorViewControl;
            });

            router.intercept((info) => {
                info.delegate.view = Four;
            });
        }

        initialize() {
            var items: Array<{ value: string|number; }> = [];

            for (var i = 0; i < 10; ++i) {
                items.push({ value: i });
            }

            this.context.items = items;
            setTimeout(() => {
                items.reverse();
            });
        }

        navigateTo(view: string) {
            this.navigator.navigate(view).then(() => {
                console.log('navigated!');
            });
        }

        navigatedTo() {
            this.navigator.navigate({}, {
                query: {
                    test: 'foo'
                }
            });
        }

        goBack() {
            this.navigator.goBack().then(() => {
                console.log('test');
            });
        }

        loaded() {
            this.head.title('Main Page');
            this.head.description('This is the main page');

            var x = this.context.select[0];
            this.context.select[0] = { value: 4, textContent: 'bar' };
            x.value = 6;

            setTimeout(() => {
                var item = this.context.select.shift();

                setTimeout(() => {
                    item.value = 3;
                }, 1000);
            }, 1000);
        }

        tap() {
            this.context;
        }

        keydown(ev: KeyboardEvent) {
        }

        key(type: string, ev: KeyboardEvent) {
            (<any>window).__ev = ev;
            console.log(ev);
            console.log('type: ' + type + ' locked: ' + ev.getModifierState('CapsLock'));
        }
    }

    plat.register.control('main', Main, [
        plat.routing.Router
    ]);
}
