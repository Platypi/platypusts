namespace plat.ui.animations {
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
        public options: ISimpleCssTransitionOptions;

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
        public className: string = __SimpleTransition;

        /**
         * @name _animationCanceled
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access public
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function for stopping a potential callback in the animation chain.
         */
        protected _animationCanceled: IRemoveListener = noop;

        /**
         * @name _properties
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access protected
         *
         * @type {Array<string>}
         *
         * @description
         * An Array of all the properties the transition will be affecting.
         */
        protected _properties: string[];

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
        protected _normalizeRegex: RegExp = /-/g;

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
        protected _nonNumRegex: RegExp = /[^\-0-9\.]/g;

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
        protected _transitionCount: number = 0;

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
        protected _count: number = 0;

        /**
         * @name _started
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Denotes whether or not the transition was ever started.
         */
        protected _started: boolean = false;

        /**
         * @name _usingCss
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Denotes whether or not the transition changes are being performed
         * with CSS or with JS through this.options.
         */
        protected _usingCss: boolean = false;

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
        public initialize(): void {
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
        public start(): void {
            this._animationCanceled = requestAnimationFrameGlobal((): void => {
                const element = this.element;
                const className = this.className;

                if (element.offsetParent === null) {
                    this._animate();
                    this._dispose();
                    this.end();
                }

                addClass(element, className);
                this._started = true;

                const utils = this.utils;
                const transitionId = this._animationEvents.$transition;
                let options = this.options;

                if (!isObject(options)) {
                    options = <any>{};
                }

                const computedStyle = this._window.getComputedStyle(
                    element,
                    options.pseudo
                );
                const properties = (this._properties = computedStyle[
                    <any>`${transitionId}Property`
                ].split(','));
                const durations = computedStyle[
                    <any>`${transitionId}Duration`
                ].split(',');
                let length = properties.length;
                const propLength = length;
                let noTransition = false;
                let prop: string;

                while (length > 0) {
                    length -= 1;
                    prop = properties[length];
                    if (prop === '' || prop === 'none') {
                        properties.splice(length, 1);
                    } else if (propLength > 1 && prop === 'all') {
                        // most likely developer error (extra comma at end of shorthand multi transition declaration)
                        // so we will splice
                        this._log.debug(
                            `Improper transition declaration on class "${
                                element.className
                            }"`
                        );
                        properties.splice(length, 1);
                    }
                }

                if (properties.length === 0) {
                    noTransition = true;
                } else {
                    length = durations.length;
                    while (length > 0) {
                        length -= 1;
                        prop = durations[length];
                        if (!(prop === '' || prop === '0s')) {
                            break;
                        }
                    }

                    if (length < 0) {
                        noTransition = true;
                    }
                }

                if (noTransition) {
                    this._animate();
                    this._dispose();
                    this.end();

                    return;
                }

                if (utils.isNumber(options.count) && options.count > 0) {
                    this._count = options.count;
                }

                if (options.preserveInit === false) {
                    removeClass(element, className + __INIT_SUFFIX);
                }

                this._animationCanceled = this.transitionEnd(this._done);

                if (this._animate()) {
                    return;
                } else if (utils.isEmpty(options.properties)) {
                    this.__cssTransition(computedStyle, durations);

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
        public cancel(): void {
            this._animationCanceled();

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
            const className = this.className;
            removeClass(
                this.element,
                `${className} ${className}${__INIT_SUFFIX}`
            );
            this._animationCanceled = noop;
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
            let propertyName = ev.propertyName;
            if (isString(propertyName)) {
                this._transitionCount += 1;

                const count = this._transitionCount;
                propertyName = propertyName
                    .replace(this._normalizeRegex, '')
                    .toLowerCase();

                if (
                    count < this._count ||
                    (!this._usingCss &&
                        this._normalizedKeys[propertyName] === true &&
                        count < this._properties.length)
                ) {
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
            const normalizedKeys = this._normalizedKeys;
            const normalizeRegex = this._normalizeRegex;

            let options = this.options;

            if (!isObject(options)) {
                options = <any>{};
            }

            let properties = this.options.properties;

            if (!isObject(properties)) {
                properties = <any>{};
            }

            const keys = Object.keys(properties);
            const length = keys.length;
            let key: any;
            let currentProperty: string;
            let newProperty: string;
            let unchanged = 0;
            let style = this.element.style;

            if (!isObject(style)) {
                style = <any>{};
            }

            while (keys.length > 0) {
                key = keys.shift();
                currentProperty = style[key];
                newProperty = properties[key];
                if (!isString(newProperty)) {
                    unchanged += 1;
                    continue;
                }

                style[key] = newProperty;
                if (currentProperty === style[key]) {
                    unchanged += 1;
                } else {
                    normalizedKeys[
                        key.replace(normalizeRegex, '').toLowerCase()
                    ] = true;
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
            const regex = this._nonNumRegex;
            const units = duration.match(regex)[0];
            const time = Number(duration.replace(regex, ''));

            if (!this.utils.isNumber(time)) {
                return 0;
            } else if (units === 's') {
                return time * 1000;
            } else if (units === 'ms') {
                return time;
            }

            return 0;
        }

        /**
         * @name _cssTransition
         * @memberof plat.ui.animations.SimpleCssTransition
         * @kind function
         * @access protected
         *
         * @description
         * Handles element transitions that are defined with CSS.
         *
         * @param {CSSStyleDeclaration} computedStyle The computed style of the
         * element.
         * @param {Array<string>} durations The array of declared transition duration values.
         *
         * @returns {void}
         */
        private __cssTransition(
            computedStyle: CSSStyleDeclaration,
            durations: string[]
        ): void {
            const transitionId = this._animationEvents.$transition;
            const delays = computedStyle[<any>`${transitionId}Delay`].split(
                ','
            );
            const properties = this._properties;
            const length = properties.length;
            const normalizedKeys = this._normalizedKeys;
            const normalizeRegex = this._normalizeRegex;
            let i = 0;
            let count = 0;
            let changed = false;
            let computedProperty: string;
            let property: any;
            let duration: string;
            let delay: string;

            const defer = this.utils.defer.bind(
                this,
                (prop: any, computedProp: string): void => {
                    if (this._animationCanceled === noop) {
                        // disposal has already occurred
                        return;
                    } else if (
                        prop === 'all' ||
                        computedStyle[prop] !== computedProp
                    ) {
                        // we can't know if the transition started due to 'all' being set and have to rely on this.options.count
                        // or
                        // we know the transition started due to the properties being different
                        changed = true;
                    }

                    count += 1;
                    if (count < length || changed) {
                        return;
                    }

                    this._dispose();
                    this.end();
                }
            );

            this._usingCss = true;

            if (!isFinite(this._count) || this._count === 0) {
                this._count = length;
            }

            for (; i < length; i += 1) {
                property = properties[i] = properties[i].trim();
                duration =
                    durations.length > i
                        ? durations[i].trim()
                        : durations[durations.length - 1].trim();
                delay =
                    delays.length > i
                        ? delays[i].trim()
                        : delays[delays.length - 1].trim();
                normalizedKeys[
                    property.replace(normalizeRegex, '').toLowerCase()
                ] = true;
                computedProperty = computedStyle[property];

                defer(this._toMs(duration) + this._toMs(delay), [
                    property,
                    computedProperty,
                ]);
            }
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
    export interface ISimpleCssTransitionOptions
        extends ISimpleCssAnimationOptions {
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
        properties?: IObject<string>;

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
        preserveInit?: boolean;

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
        count?: number;
    }
}
