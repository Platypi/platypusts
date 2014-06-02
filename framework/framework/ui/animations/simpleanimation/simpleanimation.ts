module plat.ui.animations {
    export class SimpleCssAnimation extends Animation implements ISimpleCssAnimation {
        className: string;

        start() {
            if (!this.$Compat.platCss) {
                this.end();
                return;
            }

            this.dom.addClass(this.element, this.className);
            this.animationEnd(() => {
                this.dom.removeClass(this.element, this.className);
                this.end();
            });
        }
    }

    export interface ISimpleCssAnimation {
        /**
         * The class name to place on the element.
         */
        className: string;
    }

    register.animation(__FadeIn, FadeIn);

    export class FadeOut extends SimpleCssAnimation {
        className = __FadeOut;
    }

    register.animation(__FadeOut, FadeOut);

    export class FadeIn extends SimpleCssAnimation {
        className = __FadeIn;
    }

    export class Enter extends SimpleCssAnimation {
        className = __Enter;
    }

    register.animation(__Enter, Enter);

    export class Leave extends SimpleCssAnimation {
        className = __Leave;
    }

    register.animation(__Leave, Leave);
}
