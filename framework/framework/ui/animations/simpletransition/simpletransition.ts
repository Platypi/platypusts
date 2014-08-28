module plat.ui.animations {
    /**
     * A simple Css Animation class that places the 'plat-transition' class on an 
     * element, checks for transition properties, and waits for the transition to end.
     */
    export class SimpleCssTransition extends CssAnimation implements ISimpleCssTransition {
        $Window: Window = acquire(__Window);

        /**
         * A JavaScript object with key value pairs for adjusting transition values. 
         * (e.g. { width: '800px' } would set the element's width to 800px.
         */
        options: plat.IObject<string>;

        /**
         * The class name added to the animated element.
         */
        className = __SimpleTransition;

        start(): void {
            var transitionId = this.$Compat.animationEvents.$transition,
                element = this.element,
                className = this.className,
                endFn = () => {
                    removeClass(element, className);
                    this.end();
                };

            addClass(element, className);

            var computedStyle = this.$Window.getComputedStyle(element),
                transitionProperty = computedStyle[<any>(transitionId + 'Property')],
                transitionDuration = computedStyle[<any>(transitionId + 'Duration')];
            if (transitionProperty === '' || transitionProperty === 'none' ||
                transitionDuration === '' || transitionDuration === '0s') {
                this._animate();
                endFn();
                return;
            }

            this.transitionEnd(endFn);

            if (this._animate()) {
                return;
            }

            endFn();
        }

        cancel(): void {
            removeClass(this.element, this.className);
            super.cancel();
        }

        /**
         * Animate the element based on the options passed in
         */
        _animate(): boolean {
            var style = this.element.style || {},
                options = this.options || {},
                keys = Object.keys(options),
                length = keys.length,
                key: any,
                currentProperty: string,
                newProperty: string,
                unchanged = 0;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                currentProperty = style[key];
                newProperty = options[key];
                if (!isString(newProperty)) {
                    unchanged++;
                    continue;
                }

                style[key] = newProperty;
                if (currentProperty === style[key]) {
                    unchanged++;
                }
            }

            return unchanged < length;
        }
    }

    register.animation(__SimpleTransition, SimpleCssTransition);

    export interface ISimpleCssTransition extends ISimpleCssAnimation {
        /**
         * A JavaScript object with key value pairs for adjusting transition values. 
         * (e.g. { width: '800px' } would set the element's width to '800px'.
         */
        options: plat.IObject<string>;
    }
}
