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
            views: [One, Two, Three, Four],
            test: [0, 1, 2, 3, 4, 5],
            items: <Array<{ value: string|number; }>>[],
            testClass: 'foo quux'
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

        goBack() {
            this.navigator.goBack().then(() => {
                console.log('test');
            });
        }

        loaded() {
            this.head.title('Main Page');
            this.head.description('This is the main page');
            var el = this.element.querySelector('.blah');
            this.dom.addClass(el, 'quux');
            el.setAttribute('other-class', '');
            this.context.testClass = 'bar baz';
            var test = this.context.test;
            setTimeout(() => {
                //test[0] = 1;
                //test.unshift(10, 5);
                //test.unshift(10);
                test.shift();
                //test.sort((a, b) => {
                //    return b - a;
                //});
                //test.reverse();
                //test.push(0, 1);
                //test.pop();
                //test.pop();
                //test.push(3);
                //test.push(4);
            }, 1000);
        }
    }

    plat.register.control('main', Main, [
        plat.routing.Router
    ]);
}
