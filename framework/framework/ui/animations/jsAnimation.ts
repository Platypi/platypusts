module plat.ui.animations {
    /**
     * @name JsAnimation
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @extends {plat.ui.animations.BaseAnimation}
     * @implements {plat.ui.animations.IJsAnimation}
     * 
     * @description
     * A class for creating a single JavaScript animation for a single element.
     */
    export class JsAnimation extends BaseAnimation implements IJsAnimation {
        /**
         * @name isJs
         * @memberof plat.ui.animations.JsAnimation
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * A flag specifying that this animation is a JavaScript implementation.
         */
        isJs = true;
    }

    /**
     * @name IJsAnimation
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @extends {plat.ui.animations.IBaseAnimation}
     * 
     * @description
     * Describes an object representing a single JavaScript animation for a single element.
     */
    export interface IJsAnimation extends IBaseAnimation {
        /**
         * @name isJs
         * @memberof plat.ui.animations.IJsAnimation
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * A flag specifying that this animation is a JavaScript implementation.
         */
        isJs: boolean;
    }
}
