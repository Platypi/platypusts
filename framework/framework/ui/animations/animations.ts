module plat.ui {
    export class Animator implements IAnimator {

    }

    /**
     * The Type for referencing the '$Animator' injectable as a dependency.
     */
    export function IAnimator() {
        return new Animator();
    }

    register.injectable('$Animator', IAnimator);

    export interface IAnimator {

    }

    export class Animation implements IAnimationInstance {
        element: Node;
        key: string;

        start(): void { }

        end(): void { }

        animationStart(listener: () => void): void {

        }

        transitionStart(listener: () => void): void {

        }

        animationEnd(listener: () => void): void {

        }

        transitionEnd(listener: () => void): void {

        }
    }

    /**
     * The Type for referencing the '$AnimationInstance' injectable as a dependency.
     */
    export function IAnimationInstance() {
        return new Animation();
    }

    register.injectable('$AnimationInstance', IAnimationInstance, null, register.INSTANCE);

    export interface IAnimationInstance {
        /**
         * The node having the animation performed on it.
         */
        element: Node;

        /**
         * The key denoting this animation's type.
         */
        key: string;

        /**
         * A function denoting the start of the animation.
         */
        start(): void;

        /**
         * A function to be called when the animation is over.
         */
        end(): void;

        /**
         * A function to listen to the start of an animation event.
         * 
         * @param listener The function to call when the animation begins.
         */
        animationStart(listener: () => void): void;

        /**
         * A function to listen to the start of a transition event.
         * 
         * @param listener The function to call when the transition begins.
         */
        transitionStart(listener: () => void): void;

        /**
         * A function to listen to the end of an animation event.
         * 
         * @param listener The function to call when the animation ends.
         */
        animationEnd(listener: () => void): void;

        /**
         * A function to listen to the end of a transition event.
         * 
         * @param listener The function to call when the transition ends.
         */
        transitionEnd(listener: () => void): void;
    }
}
 