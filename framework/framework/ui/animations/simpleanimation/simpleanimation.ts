module plat.ui.animations {
    export class SimpleCssAnimation extends Animation implements ISimpleCssAnimation {
        $Window: Window = acquire(__Window);

        className: string;

        start() {
            var $compat = this.$Compat,
                $dom = this.dom,
                animationId = $compat.animationEvents.$animation,
                element = this.element,
                className = this.className;

            $dom.addClass(element, className);

            var computedStyle = this.$Window.getComputedStyle(element);
            if (computedStyle[<any>(animationId + 'Name')] === 'none' ||
                computedStyle[<any>(animationId + 'PlayState')] === 'paused') {
                $dom.removeClass(element, className);
                this.end();
                return;
            }

            this.animationEnd((ev: Event) => {
                $dom.removeClass(element, className);
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
