module plat.ui.animations {
    /**
     * @name JsAnimation
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @extends {plat.ui.animations.BaseAnimation}
     * 
     * @description
     * A class for creating a single JavaScript animation for a single element.
     */
    export class JsAnimation extends BaseAnimation {
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
}
