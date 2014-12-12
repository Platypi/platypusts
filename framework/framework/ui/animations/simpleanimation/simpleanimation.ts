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
     * @implements {plat.ui.animations.ISimpleCssAnimation}
     * 
     * @description
     * A simple CSS Animation class that places the 'plat-animation' class on an 
     * element, checks for animation properties, and waits for the animation to end.
     */
    export class SimpleCssAnimation extends CssAnimation implements ISimpleCssAnimation {
        /**
         * @name $Window
         * @memberof plat.ui.animations.SimpleCssAnimation
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        $Window: Window = acquire(__Window);

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
            var element = this.element,
                className = this.className,
                hasClassName = hasClass(element, className);

            removeClass(element, className + ' ' + className + __END_SUFFIX);
            if (hasClassName) {
                postpone(addClass, [element, className]);
                return;
            }

            addClass(element, className);
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
            var animationId = this.$Compat.animationEvents.$animation,
                element = this.element,
                className = this.className,
                computedStyle = this.$Window.getComputedStyle(element, (this.options || <ISimpleCssAnimationOptions>{}).pseudo),
                animationName = computedStyle[<any>(animationId + 'Name')];

            if (animationName === '' ||
                animationName === 'none' ||
                computedStyle[<any>(animationId + 'PlayState')] === 'paused') {
                removeClass(element, className);
                addClass(element, className + __END_SUFFIX);
                this.end();
                return;
            }

            this.animationEnd(() => {
                removeClass(element, className);
                addClass(element, className + __END_SUFFIX);
                this.end();
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
            var element = this.element,
                className = this.className;
            removeClass(element, className);
            addClass(element, className + __END_SUFFIX);
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
            removeClass(this.element, this.className + __END_SUFFIX);
        }
    }

    register.animation(__SimpleAnimation, SimpleCssAnimation);

    /**
     * @name ISimpleCssAnimation
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @extends {plat.ui.animations.ICssAnimation}
     * 
     * @description
     * An interface for extending the {@link plat.ui.animations.SimpleCssAnimation|SimpleCssAnimation} 
     * or {@link plat.ui.animations.SimpleCssTransition|SimpleCssTransition} and allowing for 
     * custom class names to initiate animations or transitions.
     */
    export interface ISimpleCssAnimation extends ICssAnimation {
        /**
         * @name className
         * @memberof plat.ui.animations.ISimpleCssAnimation
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The class name added to the animated element.
         */
        className: string;

        /**
         * @name options
         * @memberof plat.ui.animations.ISimpleCssAnimation
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.ISimpleAnimationOptions}
         * 
         * @description
         * An optional options object that can denote a pseudo element animation.
         */
        options: ISimpleCssAnimationOptions;
    }

    /**
     * @name ISimpleCssAnimationOptions
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @description
     * An interface describing the options for {@link plat.ui.animations.ISimpleCssAnimation|ISimpleCssAnimation}.
     */
    export interface ISimpleCssAnimationOptions {
        /**
         * @name pseudo
         * @memberof plat.ui.animations.ISimpleCssAnimationOptions
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
