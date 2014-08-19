module plat.ui.animations {
    /**
     * A simple Css Animation class that places the 'plat-animation' class on an 
     * element, checks for animation properties, and waits for the animation to end.
     */
    export class SimpleCssAnimation extends CssAnimation implements ISimpleCssAnimation {
        $Window: Window = acquire(__Window);

        /**
         * The class name added to the animated element.
         */
        className = __SimpleAnimation;

        start(): void {
            var animationId = this.$Compat.animationEvents.$animation,
                element = this.element,
                className = this.className;

            addClass(element, className);

            var computedStyle = this.$Window.getComputedStyle(element),
                animationName = computedStyle[<any>(animationId + 'Name')];
            if (animationName === '' ||
                animationName === 'none' ||
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

    register.animation(__SimpleAnimation, SimpleCssAnimation);

    /**
     * An interface for extending the SimpleCssAnimation or SimpleCssTransition and allowing for 
     * custom class names to initiate animations or transitions.
     */
    export interface ISimpleCssAnimation extends ICssAnimation {
        /**
         * The class name to place on the element.
         */
        className: string;
    }

    /**
     * An animation control that fades in an element as defined by the included CSS.
     */
    export class FadeIn extends SimpleCssAnimation {
        className = __FadeIn;
    }

    register.animation(__FadeIn, FadeIn);

    /**
     * An animation control that fades out an element as defined by the included CSS.
     */
    export class FadeOut extends SimpleCssAnimation {
        className = __FadeOut;
    }

    register.animation(__FadeOut, FadeOut);

    /**
     * An animation control that causes an element to enter as defined by the included CSS.
     */
    export class Enter extends SimpleCssAnimation {
        className = __Enter;
    }

    register.animation(__Enter, Enter);

    /**
     * An animation control that causes an element to leave as defined by the included CSS.
     */
    export class Leave extends SimpleCssAnimation {
        className = __Leave;
    }

    register.animation(__Leave, Leave);
}
