module plat.ui.animations {
    export class SimpleCssAnimation extends Animation implements ISimpleCssAnimation {
        $Window: Window = acquire(__Window);

        className: string;

        start(): void {
            var $compat = this.$Compat,
                animationId = $compat.animationEvents.$animation,
                element = this.element,
                className = this.className;

            addClass(element, className);

            var computedStyle = this.$Window.getComputedStyle(element);
            if (computedStyle[<any>(animationId + 'Name')] === 'none' ||
                computedStyle[<any>(animationId + 'PlayState')] === 'paused') {
                removeClass(element, className);
                this.end();
                return;
            }

            this.animationEnd(() => {
                removeClass(element, className);
                this.end();
            });
        }

        cancel(): void {
            removeClass(this.element, this.className);
            super.cancel();
        }
    }

    export interface ISimpleCssAnimation {
        /**
         * The class name to place on the element.
         */
        className: string;
    }

    export class FadeIn extends SimpleCssAnimation {
        className = __FadeIn;
    }

    register.animation(__FadeIn, FadeIn);

    export class FadeOut extends SimpleCssAnimation {
        className = __FadeOut;
    }

    register.animation(__FadeOut, FadeOut);

    export class Enter extends SimpleCssAnimation {
        className = __Enter;
    }

    register.animation(__Enter, Enter);

    export class Leave extends SimpleCssAnimation {
        className = __Leave;
    }

    register.animation(__Leave, Leave);
}
