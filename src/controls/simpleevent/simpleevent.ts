module plat.controls {
    'use strict';

    /**
     * @name SimpleEventControl
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.AttributeControl}
     * @implements {plat.controls.ISendEvents}
     *
     * @description
     * An {@link plat.AttributeControl|AttributeControl} that binds to a specified DOM event handler.
     */
    export class SimpleEventControl extends AttributeControl implements ISendEvents {
        protected static _inject: any = {
            _parser: __Parser,
            _regex: __Regex,
        };

        /**
         * @name _parser
         * @memberof plat.controls.SimpleEventControl
         * @kind property
         * @access protected
         *
         * @type {plat.expressions.Parser}
         *
         * @description
         * Reference to the {@link plat.expressions.Parser|Parser} injectable.
         */
        protected _parser: expressions.Parser;

        /**
         * @name _regex
         * @memberof plat.controls.SimpleEventControl
         * @kind property
         * @access protected
         *
         * @type {plat.expressions.Regex}
         *
         * @description
         * Reference to the {@link plat.expressions.Regex|Regex} injectable.
         */
        protected _regex: expressions.Regex;

        /**
         * @name event
         * @memberof plat.controls.SimpleEventControl
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string;

        /**
         * @name attribute
         * @memberof plat.controls.SimpleEventControl
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The camel-cased name of the control as it appears as an attribute.
         */
        public attribute: string;

        /**
         * @name _listener
         * @memberof plat.controls.SimpleEventControl
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The string representation of the function to be fired.
         */
        protected _listener: string;

        /**
         * @name _aliases
         * @memberof plat.controls.SimpleEventControl
         * @kind property
         * @access protected
         *
         * @type {Array<string>}
         *
         * @description
         * An array of the aliases used in the expression.
         */
        protected _aliases: string[] = [];

        /**
         * @name _args
         * @memberof plat.controls.SimpleEventControl
         * @kind property
         * @access protected
         *
         * @type {plat.expressions.IParsedExpression}
         *
         * @description
         * A parsed form of an Array of the arguments to be passed into the function to be fired.
         */
        protected _args: expressions.IParsedExpression;

        /**
         * @name loaded
         * @memberof plat.controls.SimpleEventControl
         * @kind function
         * @access public
         *
         * @description
         * Kicks off finding and setting the listener.
         *
         * @returns {void}
         */
        public loaded(): void {
            if (isNull(this.element)) {
                return;
            }

            this.attribute = camelCase(this.type);
            this._setListener();
        }

        /**
         * @name _setListener
         * @memberof plat.controls.SimpleEventControl
         * @kind function
         * @access protected
         *
         * @description
         * Parses function args and sets the event listener.
         *
         * @returns {void}
         */
        protected _setListener(): void {
            const fn = this.attributes[this.attribute];

            if (isEmpty(this.event) || isEmpty(fn)) {
                return;
            }

            this._parseArgs(fn);
            this._addEventListeners();
        }

        /**
         * @name _addEventListeners
         * @memberof plat.controls.SimpleEventControl
         * @kind function
         * @access protected
         *
         * @description
         * Adds any and all necessary event listeners.
         *
         * @returns {void}
         */
        protected _addEventListeners(): void {
            this.addEventListener(this.element, this.event, this._onEvent, false);
        }

        /**
         * @name _buildExpression
         * @memberof plat.controls.SimpleEventControl
         * @kind function
         * @access protected
         *
         * @description
         * Constructs the function to evaluate with the evaluated arguments taking resources
         * into account.
         *
         * @returns {{ fn: () => void; control: any; args: Array<expressions.IParsedExpression>; }}
         * The function to call and the associated arguments, as well as the control context with which to call the function.
         */
        protected _buildExpression(): { context: any; args: expressions.IParsedExpression[]; fn(): void } {
            const parent = this.parent;
            const templateControl = this.templateControl;
            const listenerStr = this._listener;
            let context: any;
            let fn: () => void = noop;
            let aliases: IObject<any>;
            let argContext: any;

            if (!isNull(templateControl)) {
                aliases = templateControl.getResources(this._aliases);
                if (!isNull(parent)) {
                    argContext = parent.context;
                }
            } else if (!isNull(parent)) {
                aliases = parent.getResources(this._aliases);
                argContext = parent.context;
            }

            if (listenerStr[0] === '@') {
                if (!isNull(aliases)) {
                    const functionSplit = listenerStr.split('.');
                    let fnObj = aliases[functionSplit[0].slice(1)];

                    if (isObject(fnObj)) {
                        // shift off alias
                        functionSplit.shift();

                        let segment: string;
                        while (functionSplit.length > 1) {
                            segment = functionSplit.shift();
                            if (isNull(fnObj[segment])) {
                                break;
                            } else {
                                fnObj = fnObj[segment];
                            }
                        }

                        if (functionSplit.length === 1) {
                            segment = functionSplit.shift();
                            if (isFunction(fnObj[segment])) {
                                context = fnObj;
                                fn = fnObj[segment];
                            }
                        } else {
                            this._log.warn(`Invalid path for function "${listenerStr}"`);
                        }
                    } else if (isFunction(fnObj)) {
                        fn = fnObj;
                    }
                }
            } else {
                const listener = this.findProperty(listenerStr, this.templateControl);
                if (isNull(listener)) {
                    this._log.warn(`Could not find property ${listenerStr} on any associated control.`);

                    return {
                        fn: noop,
                        context: <ui.TemplateControl>{},
                        args: [],
                    };
                }

                const parsedExpression = listener.expression;
                const identifiers = parsedExpression.identifiers;

                if (identifiers.length > 1) {
                    this._log.warn(`Cannot have more than one identifier in a ${this.type}'s expression.`);

                    return {
                        fn: noop,
                        context: <ui.TemplateControl>{},
                        args: [],
                    };
                }

                const identifier = identifiers[0];
                const split = identifier.split('.');
                let control: any = listener.control;

                // pop key
                split.pop();
                if (split.length > 0) {
                    let seg: string;
                    while (split.length > 0) {
                        seg = split.shift();
                        if (isNull(control[seg])) {
                            break;
                        } else {
                            control = control[seg];
                        }
                    }
                }

                fn = listener.value;
                context = control;
            }

            return {
                fn: fn,
                context: context,
                args: isNull(this._args) ? [] : this._args.evaluate(argContext, aliases),
            };
        }

        /**
         * @name _onEvent
         * @memberof plat.controls.SimpleEventControl
         * @kind function
         * @access protected
         *
         * @description
         * Calls the specified function when the DOM event is fired.
         *
         * @param {Event} ev The event object.
         *
         * @returns {void}
         */
        protected _onEvent(ev: Event): void {
            const expression = this._buildExpression();
            const fn = expression.fn;

            if (!isFunction(fn)) {
                this._log.warn(`Cannot find registered event method ${this._listener} for control: ${this.type}`);

                return;
            }

            fn.apply(expression.context, expression.args.concat(<any>ev));
        }

        /**
         * @name _parseArgs
         * @memberof plat.controls.SimpleEventControl
         * @kind function
         * @access protected
         *
         * @description
         * Parses the expression and separates the function
         * from its arguments.
         *
         * @param {string} expression The expression to parse.
         *
         * @returns {void}
         */
        protected _parseArgs(expression: string): void {
            if (isEmpty(expression)) {
                return;
            }

            const exec = this._regex.argumentRegex.exec(expression);
            let listenerStr: string;
            let aliases: string[] = [];

            if (isNull(exec)) {
                listenerStr = expression;
            } else {
                listenerStr = expression.slice(0, exec.index);
                if (exec[1] !== '') {
                    // parse args as an array
                    const argExp = this._parser.parse(`[${exec[1]}]`);
                    aliases = argExp.aliases;
                    this._args = argExp;
                }
            }

            if (listenerStr[0] === '@') {
                const alias = listenerStr.slice(1).split('.')[0];
                if (aliases.indexOf(alias) === -1) {
                    aliases.push(alias);
                }
            }

            this._listener = listenerStr;
            this._aliases = aliases;
        }
    }

    /**
     * @name ISendEvents
     * @memberof plat.controls
     * @kind interface
     *
     * @description
     * An {@link plat.AttributeControl|AttributeControl} that binds to a specified DOM event handler.
     */
    export interface ISendEvents {
        /**
         * @name event
         * @memberof plat.controls.ISendEvents
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        event: string;

        /**
         * @name attribute
         * @memberof plat.controls.ISendEvents
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The camel-cased name of the control as it appears as an attribute.
         */
        attribute: string;
    }

    /**
     * @name Tap
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$tap' event.
     */
    export class Tap extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Tap
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __tap;
    }

    /**
     * @name Blur
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'blur' event.
     */
    export class Blur extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Blur
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = 'blur';
    }

    /**
     * @name Change
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'change' event.
     */
    export class Change extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Change
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = 'change';
    }

    /**
     * @name Copy
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'copy' event.
     */
    export class Copy extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Copy
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = 'copy';
    }

    /**
     * @name Cut
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'cut' event.
     */
    export class Cut extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Cut
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = 'cut';
    }

    /**
     * @name Paste
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'paste' event.
     */
    export class Paste extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Paste
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = 'paste';
    }

    /**
     * @name DblTap
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$dbltap' event.
     */
    export class DblTap extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.DblTap
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __dbltap;
    }

    /**
     * @name Focus
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'focus' event.
     */
    export class Focus extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Focus
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = 'focus';
    }

    /**
     * @name TouchStart
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$touchstart' event.
     */
    export class TouchStart extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.TouchStart
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __touchstart;
    }

    /**
     * @name TouchEnd
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$touchend' event.
     */
    export class TouchEnd extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.TouchEnd
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __touchend;
    }

    /**
     * @name TouchMove
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$touchmove' event.
     */
    export class TouchMove extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.TouchMove
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __touchmove;
    }

    /**
     * @name TouchCancel
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$touchcancel' event.
     */
    export class TouchCancel extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.TouchCancel
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __touchcancel;
    }

    /**
     * @name Hold
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$hold' event.
     */
    export class Hold extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Hold
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __hold;
    }

    /**
     * @name Release
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$release' event.
     */
    export class Release extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Release
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __release;
    }

    /**
     * @name Swipe
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$swipe' event.
     */
    export class Swipe extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Swipe
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __swipe;
    }

    /**
     * @name SwipeLeft
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$swipeleft' event.
     */
    export class SwipeLeft extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.SwipeLeft
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __swipeleft;
    }

    /**
     * @name SwipeRight
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$swiperight' event.
     */
    export class SwipeRight extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.SwipeRight
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __swiperight;
    }

    /**
     * @name SwipeUp
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$swipeup' event.
     */
    export class SwipeUp extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.SwipeUp
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __swipeup;
    }

    /**
     * @name SwipeDown
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$swipedown' event.
     */
    export class SwipeDown extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.SwipeDown
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __swipedown;
    }

    /**
     * @name Track
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$track' event.
     */
    export class Track extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Track
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __track;
    }

    /**
     * @name TrackLeft
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$trackleft' event.
     */
    export class TrackLeft extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.TrackLeft
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __trackleft;
    }

    /**
     * @name TrackRight
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$trackright' event.
     */
    export class TrackRight extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.TrackRight
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __trackright;
    }

    /**
     * @name TrackUp
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$trackup' event.
     */
    export class TrackUp extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.TrackUp
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __trackup;
    }

    /**
     * @name TrackDown
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$trackdown' event.
     */
    export class TrackDown extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.TrackDown
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __trackdown;
    }

    /**
     * @name TrackEnd
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$trackend' event.
     */
    export class TrackEnd extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.TrackEnd
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = __trackend;
    }

    /**
     * @name Submit
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'submit' event.
     */
    export class Submit extends SimpleEventControl {
        /**
         * @name event
         * @memberof plat.controls.Submit
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = 'submit';

        /**
         * @name _onEvent
         * @memberof plat.controls.SimpleEventControl
         * @kind function
         * @access protected
         *
         * @description
         * Prevents the default submit action unless
         * the "action" attribute is present.
         *
         * @param {Event} ev The event object.
         */
        protected _onEvent(ev: Event): void {
            if (!this.element.hasAttribute('action')) {
                ev.preventDefault();
            }

            super._onEvent(ev);
        }
    }

    /**
     * @name React
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.SimpleEventControl}
     *
     * @description
     * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'input' event. If
     * 'input' is not an event, it will simulate an 'input' using other events like 'keydown',
     * 'cut', 'paste', etc. Also fires on the 'change' event.
     */
    export class React extends SimpleEventControl {
        protected static _inject: any = {
            _compat: __Compat,
        };

        /**
         * @name _compat
         * @memberof plat.controls.React
         * @kind property
         * @access protected
         * @static
         *
         * @type {plat.Compat}
         *
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected _compat: Compat;

        /**
         * @name event
         * @memberof plat.controls.React
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event name.
         */
        public event: string = 'input';

        /**
         * @name _addEventListeners
         * @memberof plat.controls.React
         * @kind function
         * @access protected
         *
         * @description
         * Adds any and all necessary event listeners.
         *
         * @returns {void}
         */
        protected _addEventListeners(): void {
            const element = this.element;
            const _compat = this._compat;
            const input = 'input';
            let composing = false;
            let inputFired = false;
            let timeout: IRemoveListener;

            const eventListener = (ev: Event): void => {
                if (composing) {
                    return;
                }

                this._onEvent(ev);
            };

            const postponedEventListener = (ev: Event): void => {
                if (isFunction(timeout)) {
                    return;
                }

                timeout = postpone((): void => {
                    eventListener(ev);
                    timeout = null;
                });
            };

            if (isUndefined(_compat.ANDROID)) {
                this.addEventListener(element, 'compositionstart', (): void => { composing = true; }, false);
                this.addEventListener(element, 'compositionend', (ev: Event): void => {
                    composing = false;
                    eventListener(ev);
                }, false);
            }

            this.addEventListener(element, input, (ev: Event): void => {
                inputFired = true;
                eventListener(ev);
            }, false);
            this.addEventListener(element, 'change', (ev: Event): void => {
                if (inputFired) {
                    inputFired = false;

                    return;
                }
                eventListener(ev);
            }, false);

            if (_compat.hasEvent(input)) {
                return;
            }

            this.addEventListener(element, 'keydown', (ev: KeyboardEvent): void => {
                const key = ev.keyCode;
                const codes = KeyCodes;

                if (key === codes.lwk ||
                    key === codes.rwk ||
                    (key >= codes.shift && key <= codes.escape) ||
                    (key > codes.space && key <= codes.down)) {
                    return;
                }

                postponedEventListener(ev);
            }, false);
            this.addEventListener(element, 'cut', postponedEventListener, false);
            this.addEventListener(element, 'paste', postponedEventListener, false);
        }
    }

    register.control(__Tap, Tap);
    register.control(__Blur, Blur);
    register.control(__Change, Change);
    register.control(__Copy, Copy);
    register.control(__Cut, Cut);
    register.control(__Paste, Paste);
    register.control(__DblTap, DblTap);
    register.control(__Focus, Focus);
    register.control(__Submit, Submit);
    register.control(__TouchStart, TouchStart);
    register.control(__TouchEnd, TouchEnd);
    register.control(__TouchMove, TouchMove);
    register.control(__TouchCancel, TouchCancel);
    register.control(__Hold, Hold);
    register.control(__Release, Release);
    register.control(__Swipe, Swipe);
    register.control(__SwipeLeft, SwipeLeft);
    register.control(__SwipeRight, SwipeRight);
    register.control(__SwipeUp, SwipeUp);
    register.control(__SwipeDown, SwipeDown);
    register.control(__Track, Track);
    register.control(__TrackLeft, TrackLeft);
    register.control(__TrackRight, TrackRight);
    register.control(__TrackUp, TrackUp);
    register.control(__TrackDown, TrackDown);
    register.control(__TrackEnd, TrackEnd);
    register.control(__React, React);
}
