module app {
    export class MainViewControl extends plat.ui.WebViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            items: [
                { id: 0, first: 'Matt', last: 'Morgan', group: '0' },
                { id: 1, first: 'Darion', last: 'Welch', group: '1' },
                { id: 2, first: 'Will', last: 'Johnston', group: '0' }
            ],
            htmlObj: {},
            radioVal: <string>null,
            firstName: 'Matt',
            id: 2,
            item: <any>null
        };

        options: plat.controls.INamedElement<HTMLDivElement, void>;

        navigatedTo(route: plat.web.IRoute<any>) {
            if (route.path.length === 0) {
                return;
            }

            this.title = route.path.replace(/\//g, ' ');
        }

        loaded() {
            //this.options.element.textContent = 'Bar';
        }

        pushPop() {
            var context = this.context,
                items = context.items;
            if (items.length % 2 === 0) {
                items.push({ id: 3, first: 'Jon', last: 'McCann', group: '2' });
                context.item = null;
                return;
            }
            context.item = {
                items: [
                    { name: 'Will' },
                    { name: 'Darion' },
                    { name: 'Matt' }
                ]
            };
            items.pop();
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, null, ['']);
}
