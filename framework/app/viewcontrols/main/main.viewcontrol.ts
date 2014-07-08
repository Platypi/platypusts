module app {
    export class MainViewControl extends plat.ui.WebViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context: any = {
            items: [
                { first: 'Matt', last: 'Morgan', group: '0' },
                { first: 'Darion', last: 'Welch', group: '1' },
                { first: 'Will', last: 'Johnston', group: '0' }
            ],
            htmlObj: {},
            radioVal: null,
            firstName: 'Jon'
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
            this.context.items.push({ first: 'Donald', last: 'Jones', group: '1' });
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
