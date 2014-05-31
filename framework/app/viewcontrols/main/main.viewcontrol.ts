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
            this.context;
            //this.context.user = {
            //    name: 'will',
            //    role: 'contributor'
            //}

            //setTimeout(() => {
            //    this.context.user.name = 'matt';
            //}, 1000);
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
                console.log('1');
                this.dom.toggleClass(this.element, 'test-animation');
                this.dom.toggleClass(this.element, 're-animation');
            }).then(() => {
                console.log('2');
                this.dom.toggleClass(this.element, 're-animation');
                this.dom.toggleClass(this.element, 'test-animation');
            }).then(() => {
                console.log('3');
                this.dom.toggleClass(this.element, 'test-animation');
                this.dom.toggleClass(this.element, 're-animation');
            }).then(() => {
                console.log('4');
                this.dom.toggleClass(this.element, 're-animation');
                return true;
            });

        }
    }

    plat.register.animation('fade', MyAnimation);
}
