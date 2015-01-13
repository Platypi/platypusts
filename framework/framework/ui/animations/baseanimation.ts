module plat.ui.animations {
    /**
     * @name BaseAnimation
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @implements {plat.ui.animations.IBaseAnimation}
     * 
     * @description
     * A class representing a single animation for a single element.
     */
    export class BaseAnimation implements IBaseAnimation {
        /**
         * @name _compat
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access public
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        _compat: ICompat = acquire(__Compat);

        /**
         * @name element
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access public
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The node having the animation performed on it.
         */
        element: HTMLElement;

        /**
         * @name dom
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IDom}
         * 
         * @description
         * Contains DOM helper methods for manipulating this control's element.
         */
        dom: IDom = acquire(__Dom);

        /**
         * @name options
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * Specified options for the animation.
         */
        options: any;

        /**
         * @name _resolve
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access protected
         * 
         * @type {() => void}
         * 
         * @description
         * The resolve function for the end of the animation.
         */
        protected _resolve: () => void;

        /**
         * @name initialize
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function for initializing the animation or any of its properties before start.
         * 
         * @returns {void}
         */
        initialize(): void { }

        /**
         * @name start
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function denoting the start of the animation.
         * 
         * @returns {void}
         */
        start(): void { }

        /**
         * @name end
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to be called when the animation is over.
         * 
         * @returns {void}
         */
        end(): void {
            if (isFunction(this._resolve)) {
                this._resolve();
                this._resolve = null;
            }
        }

        /**
         * @name cancel
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function to be called to let it be known the animation is being cancelled.
         * 
         * @returns {void}
         */
        cancel(): void { }

        /**
         * @name dispose
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function for reverting any modifications or changes that may have been made as a 
         * result of this animation.
         * 
         * @returns {void}
         */
        dispose(): void { }

        /**
         * @name instantiate
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the element and key properties of this animation and grabs a 
         * reference to its resolve function.
         * 
         * @param {Element} element The element on which the animation will occur.
         * @param {any} options Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimationPromise} The promise that will resolve when the 
         * animation is complete and end() is called.
         */
        instantiate(element: Element, options?: any): IAnimatingThenable {
            this.element = <HTMLElement>element;
            this.options = options;

            var promise = new AnimationPromise((resolve) => {
                this._resolve = resolve;
                this.initialize();
            });

            promise.initialize(this);

            return promise;
        }
    }

    /**
     * @name IBaseAnimation
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @description
     * Describes an object representing a single animation for a single element.
     */
    export interface IBaseAnimation {
        /**
         * @name element
         * @memberof plat.ui.animations.IBaseAnimation
         * @kind property
         * @access public
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The node having the animation performed on it.
         */
        element: HTMLElement;

        /**
         * @name dom
         * @memberof plat.ui.animations.IBaseAnimation
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IDom}
         * 
         * @description
         * Contains DOM helper methods for manipulating this control's element.
         */
        dom: IDom;

        /**
         * @name options
         * @memberof plat.ui.animations.IBaseAnimation
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * Specified options for the animation.
         */
        options: any;

        /**
         * @name initialize
         * @memberof plat.ui.animations.IBaseAnimation
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function for initializing the animation or any of its properties before start.
         * 
         * @returns {void}
         */
        initialize(): void;

        /**
         * @name start
         * @memberof plat.ui.animations.IBaseAnimation
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function denoting the start of the animation.
         * 
         * @returns {void}
         */
        start(): void;

        /**
         * @name end
         * @memberof plat.ui.animations.IBaseAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to be called when the animation is over.
         * 
         * @returns {void}
         */
        end(): void;

        /**
         * @name cancel
         * @memberof plat.ui.animations.IBaseAnimation
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function to be called to let it be known the animation is being cancelled.
         * 
         * @returns {void}
         */
        cancel(): void;

        /**
         * @name dispose
         * @memberof plat.ui.animations.IBaseAnimation
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function for reverting any modifications or changes that may have been made as a 
         * result of this animation.
         * 
         * @returns {void}
         */
        dispose(): void;

        /**
         * @name instantiate
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the element and key properties of this animation.
         * 
         * @param {Element} element The element on which the animation will occur.
         * @param {any} options Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimationPromise} The promise that will resolve when the 
         * animation is complete and end() is called.
         */
        instantiate(element: Element, options?: any): IAnimatingThenable;
    }
}
