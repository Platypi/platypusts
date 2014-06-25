module app {
    export class MainViewControl extends plat.ui.WebViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            names: [
                { name: 'Matt' },
                { name: 'M@' },
                { name: 'Darion' },
                { name: 'Jonathan' },
                { name: 'Paul' },
                { name: 'Will' }
            ],
            indexed: {
                val: 'foo'
            },
            selected: 'M@',
            index: 'indexed'
        };
        initialize() {
            var parser = plat.acquire(plat.expressions.IParser);

            var expr = parser.parse('context[index].val'),
                out = expr.evaluate({ context: this.context, index: this.context.index });

            out;
        }
        navigatedTo(route: plat.web.IRoute<any>) {
            console.log((<any>Object).observe);
            if (route.path.length === 0) {
                return;
            }

            this.title = route.path.replace(/\//g, ' ');
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, ['foo'], ['']);
}
