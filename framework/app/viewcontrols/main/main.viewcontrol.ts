module app {
    export class MainViewControl extends plat.ui.ViewControl {
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context: any = {
            href: 'http://google.com',
            names: [
                'Matt',
                'M@',
                'Darion',
                'Jonathan',
                'Paul',
                'Will'
            ],
            users: null
        };
        hello = true;
        constructor(private animator: plat.ui.IAnimator) { super(); }

        loaded() {
            this.animator.animate(this.element, 'fade');
        }

        submit() {
            this.context;
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, [plat.ui.IAnimator], ['/', ':test/page(/:baz)(/*path)']);

    class MyAnimation extends plat.ui.Animation {
        start() {
            this.dom.toggleClass(this.element, 'test-animation');

            this.animationEnd(() => {
                this.dom.toggleClass(this.element, 'test-animation');
                this.dom.toggleClass(this.element, 're-animation');
            }).animationEnd(() => {
                this.dom.toggleClass(this.element, 'test-animation');
                this.dom.toggleClass(this.element, 're-animation');
            }).animationEnd(() => {
                this.dom.toggleClass(this.element, 'test-animation');
                this.dom.toggleClass(this.element, 're-animation');
            }).animationEnd(() => {
                this.dom.toggleClass(this.element, 'test-animation');
                this.dom.toggleClass(this.element, 're-animation');
            });
        }
    }

    plat.register.animation('fade', MyAnimation);
}
