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
         * @name $Compat
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access public
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        $Compat: ICompat = acquire(__Compat);

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
        _resolve: () => void;

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
         * @name done
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to be called when the animation is over.
         * 
         * @returns {void}
         */
        done(): void {
            if (isFunction(this._resolve)) {
                this._resolve();
                this._resolve = null;
            }
            this.dispose();
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
         * @name _init
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access protected
         * 
         * @description
         * Initializes the element and key properties of this animation and passes in the function 
         * to resolve when finished.
         * 
         * @param {Element} element The element on which the animation will occur.
         * @param {any} options Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimationPromise} The promise that will resolve when the 
         * animation is complete and end() is called.
         */
        _init(element: Element, options?: any): IAnimationPromise {
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
         * @name done
         * @memberof plat.ui.animations.IBaseAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to be called when the animation is over.
         * 
         * @returns {void}
         */
        done(): void;

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
    }
}
