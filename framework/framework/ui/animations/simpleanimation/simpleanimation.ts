/**
 * @name animations
 * @memberof plat.ui
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds all the classes and interfaces related to UI animation components for platypus.
 */
module plat.ui.animations {
    /**
     * @name SimpleCssAnimation
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @extends {plat.ui.animations.CssAnimation}
     * 
     * @description
     * A simple CSS Animation class that places the 'plat-animation' class on an 
     * element, checks for animation properties, and waits for the animation to end.
     */
    export class SimpleCssAnimation extends CssAnimation {
        protected static _inject: any = {
            _window: __Window
        };

        /**
         * @name _window
         * @memberof plat.ui.animations.SimpleCssAnimation
         * @kind property
         * @access protected
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        protected _window: Window;

        /**
         * @name className
         * @memberof plat.ui.animations.SimpleCssAnimation
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The class name added to the animated element.
         */
        className = __SimpleAnimation;

        /**
         * @name options
         * @memberof plat.ui.animations.SimpleCssAnimation
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.ISimpleAnimationOptions}
         * 
         * @description
         * An optional options object that can denote a pseudo element animation.
         */
        options: ISimpleCssAnimationOptions;

        /**
         * @name initialize
         * @memberof plat.ui.animations.SimpleCssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * Adds the class to start the animation.
         * 
         * @returns {void}
         */
        initialize(): void {
            var className = this.className;
            removeClass(this.element, className + ' ' + className + __END_SUFFIX);
        }

        /**
         * @name start
         * @memberof plat.ui.animations.SimpleCssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function denoting the start of the animation.
         * 
         * @returns {void}
         */
        start(): void {
            var animationId = this._compat.animationEvents.$animation,
                element = this.element,
                className = this.className;

            requestAnimationFrameGlobal(() => {
                addClass(element, className);

                var computedStyle = this._window.getComputedStyle(element,(this.options || <ISimpleCssAnimationOptions>{}).pseudo),
                    animationName = computedStyle[<any>(animationId + 'Name')];

                if (animationName === '' ||
                    animationName === 'none' ||
                    computedStyle[<any>(animationId + 'PlayState')] === 'paused') {
                    replaceClass(element, className, className + __END_SUFFIX);
                    this.end();
                    return;
                }

                this.animationEnd(() => {
                    requestAnimationFrameGlobal(() => {
                        replaceClass(element, className, className + __END_SUFFIX);
                        this.end();
                    });
                });
            });
        }

        /**
         * @name cancel
         * @memberof plat.ui.animations.SimpleCssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to be called to let it be known the animation is being cancelled. 
         * Replaces the animation class with the animation class and "-end" appended to it 
         * to allow it to jump to final state.
         * 
         * @returns {void}
         */
        cancel(): void {
            var className = this.className;
            replaceClass(this.element, className, className + __END_SUFFIX);
        }

        /**
         * @name dispose
         * @memberof plat.ui.animations.SimpleCssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to remove the end state from the element. Can be useful when combining 
         * multiple types of animations on the same element.
         * 
         * @returns {void}
         */
        dispose(): void {
            var className = this.className;
            removeClass(this.element, className + ' ' + className + __END_SUFFIX);
        }
    }

    register.animation(__SimpleAnimation, SimpleCssAnimation);

    /**
     * @name SimpleCssAnimationOptions
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @description
     * An interface describing the options for {@link plat.ui.animations.SimpleCssAnimation|SimpleCssAnimation}.
     */
    export interface ISimpleCssAnimationOptions {
        /**
         * @name pseudo
         * @memberof plat.ui.animations.SimpleCssAnimationOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The pseudo element identifier (i.e. '::before' if defined as .red::before).
         */
        pseudo?: string;
    }

    /**
     * @name FadeIn
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @extends {plat.ui.animations.SimpleCssAnimation}
     * 
     * @description
     * An animation control that fades in an element as defined by the included CSS.
     */
    export class FadeIn extends SimpleCssAnimation {
        /**
         * @name className
         * @memberof plat.ui.animations.FadeIn
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The class name added to the element fading in.
         */
        className = __FadeIn;
    }

    register.animation(__FadeIn, FadeIn);

    /**
     * @name FadeOut
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @extends {plat.ui.animations.SimpleCssAnimation}
     * 
     * @description
     * An animation control that fades out an element as defined by the included CSS.
     */
    export class FadeOut extends SimpleCssAnimation {
        /**
         * @name className
         * @memberof plat.ui.animations.FadeOut
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The class name added to the element fading out.
         */
        className = __FadeOut;
    }

    register.animation(__FadeOut, FadeOut);

    /**
     * @name Enter
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @extends {plat.ui.animations.SimpleCssAnimation}
     * 
     * @description
     * An animation control that causes an element to enter as defined by the included CSS.
     */
    export class Enter extends SimpleCssAnimation {
        /**
         * @name className
         * @memberof plat.ui.animations.Enter
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The class name added to the entering element.
         */
        className = __Enter;
    }

    register.animation(__Enter, Enter);

    /**
     * @name Leave
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @extends {plat.ui.animations.SimpleCssAnimation}
     * 
     * @description
     * An animation control that causes an element to leave as defined by the included CSS.
     */
    export class Leave extends SimpleCssAnimation {
        /**
         * @name className
         * @memberof plat.ui.animations.Leave
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The class name added to the leaving element.
         */
        className = __Leave;
    }

    register.animation(__Leave, Leave);
}
