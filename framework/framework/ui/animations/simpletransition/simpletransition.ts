module plat.ui.animations {
    'use strict';

    /**
     * @name SimpleCssTransition
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @extends {plat.ui.animations.CssAnimation}
     * 
     * @description
     * A simple CSS Animation class that places the 'plat-transition' class on an 
     * element, checks for transition properties, and waits for the transition to end.
     */
    export class SimpleCssTransition extends CssAnimation {
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
         * @name _stopAnimation
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access public
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for stopping a potential callback in the animation chain.
         */
        protected _stopAnimation: IRemoveListener = noop;

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
         * @name _normalizeRegex
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access protected
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression to normalize modified property keys.
         */
        protected _normalizeRegex = /-/g;

        /**
         * @name _nonNumRegex
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access protected
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression grab everything that is not a number.
         */
        protected _nonNumRegex = /[^\-0-9\.]/g;

        /**
         * @name _normalizedKeys
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access protected
         * 
         * @type {plat.IObject<boolean>}
         * 
         * @description
         * An Object whose keys are the normalized keys of modified properties.
         */
        protected _normalizedKeys: IObject<boolean> = {};

        /**
         * @name _transitionCount
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The "transitionend" event handler call count.
         */
        protected _transitionCount = 0;

        /**
         * @name _count
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The user defined "transitionend" event handler call count.
         */
        protected _count = 0;

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
            addClass(this.element, this.className + __INIT_SUFFIX);
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
            this._stopAnimation = requestAnimationFrameGlobal((): void => {
                var element = this.element,
                    className = this.className;

                if (element.offsetParent === null) {
                    this._animate();
                    this._dispose();
                    this.end();
                }

                addClass(element, className);
                this._started = true;

                var utils = this.utils,
                    transitionId = this._animationEvents.$transition,
                    options = this.options || <ISimpleCssTransitionOptions>{},
                    count = options.count,
                    computedStyle = this._window.getComputedStyle(element, options.pseudo),
                    transitionProperty = computedStyle[<any>(transitionId + 'Property')],
                    transitionDuration = computedStyle[<any>(transitionId + 'Duration')];

                if (utils.isNumber(count) && count > 0) {
                    this._count = count;
                }

                if (transitionProperty === '' || transitionProperty === 'none' ||
                    transitionDuration === '' || transitionDuration === '0s') {
                    this._animate();
                    this._dispose();
                    this.end();
                    return;
                }

                if (options.preserveInit === false) {
                    removeClass(element, className + __INIT_SUFFIX);
                }

                this._stopAnimation = this.transitionEnd(this._done);

                if (this._animate()) {
                    return;
                } else if (utils.isEmpty(options.properties)) {
                    var properties = transitionProperty.split(','),
                        property: any,
                        length = properties.length,
                        computedProperties = <Array<string>>[],
                        normalizedKeys = this._normalizedKeys,
                        normalizeRegex = this._normalizeRegex,
                        i = 0;

                    for (; i < length; ++i) {
                        property = properties[i];
                        normalizedKeys[property.replace(normalizeRegex, '').toLowerCase()] = true;
                        computedProperties.push(computedStyle[property]);
                    }

                    utils.defer((): void => {
                        if (this._stopAnimation === noop) {
                            // disposal has already occurred
                            return;
                        }

                        for (i = 0; i < length; ++i) {
                            property = properties[i];
                            if (property === 'all' || computedStyle[property] !== computedProperties[i]) {
                                // we know the transition started or we can't know due to 'all' being set
                                return;
                            }
                        }

                        this._dispose();
                        this.end();
                    }, this._toMs(transitionDuration) + this._toMs(computedStyle[<any>(transitionId + 'Delay')]));
                    return;
                }

                this._dispose();
                this.end();
            });
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
            this._stopAnimation();

            if (!this._started) {
                this._animate();
            }

            this._dispose();
            this.end();
        }

        /**
         * @name _dispose
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind function
         * @access public
         * 
         * @description
         * Removes the animation class and the animation "-init" class.
         * 
         * @returns {void}
         */
        protected _dispose(): void {
            var className = this.className;
            removeClass(this.element, className + ' ' + className + __INIT_SUFFIX);
            this._stopAnimation = noop;
        }

        /**
         * @name _done
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind function
         * @access protected
         * 
         * @description
         * A handler for the "transitionend" event. Will clean up the class and resolve the 
         * promise when necessary based on the options that were input.
         * 
         * @param {TransitionEvent} ev? The transition event object.
         * @param {boolean} immediate? Whether clean up should be immediate or conditional.
         * 
         * @returns {void}
         */
        protected _done(ev: TransitionEvent): void {
            var keys = Object.keys(this._modifiedProperties),
                propertyName = ev.propertyName;
            if (isString(propertyName)) {
                propertyName = propertyName.replace(this._normalizeRegex, '').toLowerCase();
                var count = ++this._transitionCount;
                if ((this._normalizedKeys[propertyName] === true && count < keys.length) || (count < this._count)) {
                    return;
                }
            }

            this._dispose();
            this.end();
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
                normalizedKeys = this._normalizedKeys,
                normalizeRegex = this._normalizeRegex,
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
                    normalizedKeys[key.replace(normalizeRegex, '').toLowerCase()] = true;
                }
            }

            return unchanged < length;
        }

        /**
         * @name _toMs
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind function
         * @access protected
         * 
         * @description
         * A function that converts a string value expressed as either seconds or milliseconds 
         * to a numerical millisecond value.
         * 
         * @param {string} duration The transition duration specified by the computed style.
         * 
         * @returns {number} The millisecond value as a number.
         */
        protected _toMs(duration: string): number {
            var regex = this._nonNumRegex,
                units = duration.match(regex)[0],
                time = Number(duration.replace(regex, ''));

            if (!this.utils.isNumber(time)) {
                return 0;
            } else if (units === 's') {
                return time * 1000;
            } else if (units === 'ms') {
                return time;
            }

            return 0;
        }
    }

    register.animation(__SimpleTransition, SimpleCssTransition);

    /**
     * @name ISimpleCssTransitionOptions
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @extends {plat.ui.animations.ISimpleCssAnimationOptions}
     * 
     * @description
     * An interface describing the options for {@link plat.ui.animations.SimpleCssTransition|SimpleCssTransition}.
     */
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

        /**
         * @name preserveInit
         * @memberof plat.ui.animations.ISimpleCssTransitionOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean specifying whether or not to leave the '*-init' class on the element 
         * after the transition has started. Defaults to true as we want to keep all  
         * initial states and definitions throughout the transition 
         * (and/or initial transition states will be overwritten upon start).
         */
        preserveInit: boolean;

        /**
         * @name count
         * @memberof plat.ui.animations.ISimpleCssTransitionOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * A defined transition count number. Useful when the transition property name 'all' 
         * is used in conjunction with another transition property and transitions are being 
         * performed through CSS.
         */
        count: number;
    }
}
