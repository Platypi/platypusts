module plat.ui {
    /**
     * A class representing a single animation for a single element.
     */
    export class BaseAnimation implements IBaseAnimation {
        $Compat: ICompat = acquire(__Compat);

        /**
         * The node having the animation performed on it.
         */
        element: HTMLElement;

        /**
         * Contains DOM helper methods for manipulating this control's element.
         */
        dom: IDom = acquire(__Dom);

        /**
         * Specified options for the animation.
         */
        options: any;

        private __resolve: () => void;

        /**
         * A function for initializing the animation or any of its properties before start.
         */
        initialize(): void { }

        /**
         * A function denoting the start of the animation.
         */
        start(): void { }

        /**
         * A function to be called when the animation is over.
         */
        end(): void {
            if (isFunction(this.__resolve)) {
                this.__resolve();
            }
            this.dispose();
        }

        /**
         * A function to be called to let it be known the animation is being cancelled.
         */
        cancel(): void {
            this.end();
        }

        /**
         * A function for reverting any modifications or changes that may have been made as a 
         * result of this animation.
         */
        dispose(): void {
            this.__resolve = null;
        }

        /**
         * Initializes the element and key properties of this animation and passes in the function 
         * to resolve when finished.
         * 
         * @param element The element on which the animation will occur.
         * @param options Specified options for the animation.
         */
        _init(element: Element, options?: any): IAnimationPromise {
            this.element = <HTMLElement>element;
            this.options = options;

            return new AnimationPromise((resolve) => {
                this.__resolve = resolve;
                this.initialize();
                this.start();
            }, { __animationInstance: this });
        }
    }

    /**
     * Describes an object representing a single animation for a single element.
     */
    export interface IBaseAnimation {
        /**
         * The node having the animation performed on it.
         */
        element: HTMLElement;

        /**
         * Contains DOM helper methods for manipulating this control's element.
         */
        dom: IDom;

        /**
         * Specified options for the animation.
         */
        options: any;

        /**
         * A function for initializing the animation or any of its properties before start.
         */
        initialize(): void;

        /**
         * A function denoting the start of the animation.
         */
        start(): void;

        /**
         * A function to be called when the animation is over.
         */
        end(): void;

        /**
         * A function for reverting any modifications or changes that may have been made as a 
         * result of this animation.
         */
        dispose(): void;

        /**
         * A function to be called to let it be known the animation is being cancelled.
         */
        cancel(): void;
    }
}
