module app {
    export class MainViewControl extends plat.ui.WebViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context: any = {
            items: [
                { id: 0, first: 'Matt', last: 'Morgan', group: '0' },
                { id: 1, first: 'Darion', last: 'Welch', group: '1' },
                { id: 2, first: 'Will', last: 'Johnston', group: '0' }
            ],
            htmlObj: {},
            radioVal: null,
            firstName: 'Matt',
            id: 2
        };

        options: plat.controls.INamedElement<HTMLDivElement, void>;

        navigatedTo(route: plat.web.IRoute<any>) {
            if (route.path.length === 0) {
                return;
            }

            this.title = route.path.replace(/\//g, ' ');
        }

        loaded() {
            this.options.element.textContent = 'Bar';
        }

        pushPop() {
            var items = this.context.items;
            if (items.length % 2 === 0) {
                items.push({ first: 'Jon', last: 'McCann', group: '2' });
                return;
            }
            items.pop();
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, ['foo'], ['']);
}
