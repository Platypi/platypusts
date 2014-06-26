module app {
    export class MainViewControl extends plat.ui.WebViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            names: [
                { name: 'Matt' },
                { name: 'Darion' },
                { name: 'Will' }
            ],
            selected: 'Matt',
            person: {},
            Matt: {
                test: ''
            },
            Darion: {
                test: ''
            },
            Will: {
                test: ''
            }
        };
        custom: plat.controls.INamedElement<HTMLElement, CustomControl>;

        navigatedTo(route: plat.web.IRoute<any>) {
            console.log((<any>Object).observe);
            if (route.path.length === 0) {
                return;
            }

            this.title = route.path.replace(/\//g, ' ');
        }

        change() {
            this.custom.control.personChanged();
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, ['foo'], ['']);

    export class CustomControl extends plat.ui.TemplateControl {
        setTemplate() {
            this.bindableTemplates.add('1', this.element.querySelector('first'));
        }

        loaded() {
            this.context.person = this.context.Matt;
            this.bindableTemplates.bind('1', 'person').then((template) => {
                this.element.appendChild(template);
            });
        }

        personChanged() {
            this.context.person = (<any>this.context)[this.context.selected];
        }
    }

    plat.register.control('custom-control', CustomControl);
}
