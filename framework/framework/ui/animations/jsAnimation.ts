module plat.ui {
    /**
     * A class for creating a single JavaScript animation for a single element.
     */
    export class JsAnimation extends BaseAnimation implements IJsAnimation {
        /**
         * A flag specifying that this animation is a JavaScript implementation.
         */
        isJs = true;
    }

    /**
     * Describes an object representing a single JavaScript animation for a single element.
     */
    export interface IJsAnimation extends IBaseAnimation {
        /**
         * A flag specifying that this animation is a JavaScript implementation.
         */
        isJs: boolean;
    }
}
