module plat.ui.animations {
    /**
     * @name SimpleCssTransition
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @extends {plat.ui.animations.CssAnimation}
     * @implements {plat.ui.animations.ISimpleCssTransition}
     * 
     * @description
     * A simple CSS Animation class that places the 'plat-transition' class on an 
     * element, checks for transition properties, and waits for the transition to end.
     */
    export class SimpleCssTransition extends CssAnimation implements ISimpleCssTransition {
        /**
         * @name _window
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        _window: Window = acquire(__Window);

        /**
         * @name options
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.ISimpleCssTransitionOptions}
         * 
         * @description
         * An optional options object that can denote a pseudo element animation and specify 
         * properties to modify during the transition.
         */
        options: ISimpleCssTransitionOptions;

        /**
         * @name className
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The class name added to the animated element.
         */
        className = __SimpleTransition;

        /**
         * @name _modifiedProperties
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access protected
         * 
         * @type {plat.IObject<string>}
         * 
         * @description
         * A JavaScript object containing all modified properties as a result 
         * of this animation. Used in the case of a disposal to reset the changed 
         * properties.
         */
        protected _modifiedProperties: IObject<string> = {};

        /**
         * @name _started
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Denotes whether or not the animation was ever started.
         */
        protected _started = false;

        /**
         * @name initialize
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind function
         * @access public
         * 
         * @description
         * Adds the class to enable the transition.
         * 
         * @returns {void}
         */
        initialize(): void {
            addClass(this.element, this.className);
        }

        /**
         * @name start
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind function
         * @access public
         * 
         * @description
         * A function denoting the start of the animation.
         * 
         * @returns {void}
         */
        start(): void {
            var transitionId = this._compat.animationEvents.$transition,
                element = this.element,
                endFn = () => {
                    removeClass(element, this.className);
                    this.end();
                },
                computedStyle = this._window.getComputedStyle(element, (this.options || <ISimpleCssTransitionOptions>{}).pseudo),
                transitionProperty = computedStyle[<any>(transitionId + 'Property')],
                transitionDuration = computedStyle[<any>(transitionId + 'Duration')];

            this._started = true;

            if (transitionProperty === '' || transitionProperty === 'none' ||
                transitionDuration === '' || transitionDuration === '0s') {
                this._animate();
                endFn();
                return;
            }

            this.transitionEnd(endFn);

            if (this._animate()) {
                return;
            }

            endFn();
        }

        /**
         * @name cancel
         * @memberof plat.ui.animations.SimpleCssTransition
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

            if (this._started) {
                return;
            }

            this._animate();
        }

        /**
         * @name dispose
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind function
         * @access public
         * 
         * @description
         * A function to be called to reset the last transition to its previous state.
         * 
         * @returns {void}
         */
        dispose(): void {
            var style = this.element.style || {},
                modifiedProperties = this._modifiedProperties,
                keys = Object.keys(modifiedProperties),
                key: any;

            while (keys.length > 0) {
                key = keys.pop();
                style[key] = modifiedProperties[key];
            }
        }

        /**
         * @name _animate
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind function
         * @access protected
         * 
         * @description
         * Animate the element based on the options passed in.
         * 
         * @returns {boolean} Whether or not the element is going to animate with the options passed in. 
         * If false, the control should begin cleaning up.
         */
        protected _animate(): boolean {
            var style = this.element.style || {},
                properties = (this.options || <ISimpleCssTransitionOptions>{}).properties || {},
                keys = Object.keys(properties),
                length = keys.length,
                key: any,
                modifiedProperties = this._modifiedProperties,
                currentProperty: string,
                newProperty: string,
                unchanged = 0;

            while (keys.length > 0) {
                key = keys.shift();
                currentProperty = style[key];
                newProperty = properties[key];
                if (!isString(newProperty)) {
                    unchanged++;
                    continue;
                }

                style[key] = newProperty;
                if (currentProperty === style[key]) {
                    unchanged++;
                } else {
                    modifiedProperties[key] = currentProperty;
                }
            }

            return unchanged < length;
        }
    }

    register.animation(__SimpleTransition, SimpleCssTransition);

    /**
     * @name ISimpleCssTransition
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @extends {plat.ui.animations.ISimpleCssAnimation}
     * 
     * @description
     * An object that allows for transitioned changes to an Element's style based on  
     * options passed in.
     */
    export interface ISimpleCssTransition extends ISimpleCssAnimation {
        /**
         * @name options
         * @memberof plat.ui.animations.ISimpleCssTransition
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.ISimpleCssTransitionOptions}
         * 
         * @description
         * An optional options object that can denote a pseudo element animation and specify 
         * properties to modify during the transition.
         */
        options: ISimpleCssTransitionOptions;
    }

    export interface ISimpleCssTransitionOptions extends ISimpleCssAnimationOptions {
        /**
         * @name properties
         * @memberof plat.ui.animations.ISimpleCssTransitionOptions
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<string>}
         * 
         * @description
         * A JavaScript object with key value pairs for adjusting transition values. 
         * (e.g. { width: '800px' } would set the element's width to 800px.
         */
        properties: IObject<string>;
    }
}
