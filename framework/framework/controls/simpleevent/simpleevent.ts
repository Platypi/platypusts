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
            _regex: __Regex
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
        event: string;

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
        attribute: string;

        /**
         * @name _expression
         * @memberof plat.controls.SimpleEventControl
         * @kind property
         * @access protected
         * 
         * @type {Array<string>}
         * 
         * @description
         * A parsed form of the expression found in the attribute's value.
         */
        protected _expression: Array<string> = [];

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
        protected _aliases: Array<string> = [];

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
        loaded(): void {
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
            var fn = this.attributes[this.attribute];

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
         * Constructs the function to evaluate with 
         * the evaluated arguments taking resources 
         * into account.
         * 
         * @returns {{ fn: () => void; control: any; args: Array<expressions.IParsedExpression>; }} 
         * The function to call and the associated arguments, as well as the control context with which to call the function.
         */
        protected _buildExpression(): { fn: () => void; context: any; args: Array<expressions.IParsedExpression>; } {
            var expression = this._expression.slice(0),
                _parser = this._parser,
                parent = this.parent,
                hasParent = !isNull(parent),
                listenerStr = expression.shift(),
                listener: IControlProperty,
                context: any,
                fn: () => void,
                aliases: IObject<any>,
                argContext: any;

            if (!isNull(parent)) {
                aliases = parent.getResources(this._aliases);
                argContext = parent.context;
            }

            if (listenerStr[0] !== '@') {
                var _Exception: IExceptionStatic = this._Exception;
                listener = this.findProperty(listenerStr);

                if (isNull(listener)) {
                    _Exception.warn('Could not find property ' + listenerStr + ' on any parent control.',
                        _Exception.CONTROL);
                    return {
                        fn: noop,
                        context: <ui.TemplateControl>{},
                        args: []
                    };
                }

                var parsedExpression = listener.expresssion,
                    identifiers = parsedExpression.identifiers;

                if (identifiers.length > 1) {
                    _Exception.warn('Cannot have more than one identifier in a ' + this.type +
                        '\'s expression.', _Exception.CONTROL);
                    return {
                        fn: noop,
                        context: <ui.TemplateControl>{},
                        args: []
                    };
                }

                var identifier = identifiers[0],
                    split = identifier.split('.');

                // pop key
                split.pop();
                context = split.length === 0 ? listener.control : _parser.parse(split.join('.')).evaluate(listener.control);
                fn = listener.value;
            } else {
                fn = isNull(aliases) ? noop : (aliases[listenerStr] || noop);
                context = undefined;
            }

            var length = expression.length,
                args: Array<expressions.IParsedExpression> = [];

            for (var i = 0; i < length; ++i) {
                args.push(_parser.parse(expression[i]).evaluate(argContext, aliases));
            }

            return {
                fn: fn,
                context: context,
                args: args
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
            var expression = this._buildExpression(),
                fn = expression.fn;

            if (!isFunction(fn)) {
                var _Exception: IExceptionStatic = this._Exception;
                _Exception.warn('Cannot find registered event method ' +
                    this._expression[0] + ' for control: ' + this.type, _Exception.BIND);
                return;
            }

            fn.apply(expression.context, expression.args.concat(<any>ev));
        }

        /**
         * @name _findAliases
         * @memberof plat.controls.SimpleEventControl
         * @kind function
         * @access protected
         * 
         * @description
         * Finds all alias contained within the expression.
         * 
         * @param {Array<string>} args The array of arguments as strings.
         * 
         * @returns {Array<string>} The aliases.
         */
        protected _findAliases(args: Array<string>): Array<string> {
            var length = args.length,
                arg: string,
                exec: RegExpExecArray,
                aliases: IObject<boolean> = {},
                _regex = this._regex;

            for (var i = 0; i < length; ++i) {
                arg = args[i].trim();

                if (arg[0] === '@') {
                    exec = _regex.aliasRegex.exec(arg);
                    aliases[!isNull(exec) ? exec[0] : arg.slice(1)] = true;
                }
            }

            return Object.keys(aliases);
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

            var exec = this._regex.argumentRegex.exec(expression);
            if (!isNull(exec)) {
                this._expression = [expression.slice(0, exec.index)]
                    .concat((exec[1] !== '') ? exec[1].split(',') : []);
            } else {
                this._expression.push(expression);
            }

            this._aliases = this._findAliases(this._expression);
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
        event: string = __tap;
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
        event: string = 'blur';
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
        event: string = 'change';
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
        event: string = 'copy';
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
        event: string = 'cut';
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
        event: string = 'paste';
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
        event: string = __dbltap;
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
        event: string = 'focus';
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
        event: string = __touchstart;
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
        event: string = __touchend;
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
        event: string = __touchmove;
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
        event: string = __touchcancel;
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
        event: string = __hold;
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
        event: string = __release;
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
        event: string = __swipe;
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
        event: string = __swipeleft;
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
        event: string = __swiperight;
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
        event: string = __swipeup;
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
        event: string = __swipedown;
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
        event: string = __track;
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
        event: string = __trackleft;
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
        event: string = __trackright;
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
        event: string = __trackup;
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
        event: string = __trackdown;
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
        event: string = __trackend;
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
        event: string = 'submit';

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
            _compat: __Compat
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
        event: string = 'input';

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
            var element = this.element,
                _compat = this._compat,
                composing = false,
                input = 'input',
                timeout: IRemoveListener,
                eventListener = (ev: Event): void => {
                    if (composing) {
                        return;
                    }

                    this._onEvent(ev);
                },
                postponedEventListener = (ev: Event): void => {
                    if (isFunction(timeout)) {
                        return;
                    }

                    timeout = postpone((): void => {
                        eventListener(ev);
                        timeout = null;
                    });
                };

            if (isUndefined(_compat.ANDROID)) {
                this.addEventListener(element, 'compositionstart',(): void => { composing = true; }, false);
                this.addEventListener(element, 'compositionend',(ev: Event): void => {
                    composing = false;
                    eventListener(ev);
                }, false);
            }

            this.addEventListener(element, input, eventListener, false);
            this.addEventListener(element, 'change', eventListener, false);

            if (_compat.hasEvent(input)) {
                return;
            }

            this.addEventListener(element, 'keydown',(ev: KeyboardEvent): void => {
                var key = ev.keyCode,
                    codes = KeyCodes;

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
