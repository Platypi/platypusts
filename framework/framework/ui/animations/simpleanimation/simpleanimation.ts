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
         * @name initialize
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

        /**
         * @name cancel
         * @memberof plat.ui.animations.SimpleCssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to be called to let it be known the animation is being cancelled.
         * 
         * @returns {void}
         */
        cancel(): void {
            removeClass(this.element, this.className);
            super.cancel();
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
