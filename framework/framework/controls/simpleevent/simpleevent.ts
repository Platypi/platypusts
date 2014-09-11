module plat.controls {
    /**
     * @name SimpleEventControl
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.AttributeControl}
     * @implements {plat.controls.ISimpleEventControl}
     * 
     * @description
     * An {@link plat.controls.AttributeControl|AttributeControl} that binds to a specified DOM event handler.
     */
    export class SimpleEventControl extends AttributeControl implements ISimpleEventControl {
        /**
         * @name $Parser
         * @memberof plat.controls.SimpleEventControl
         * @kind property
         * @access public
         * 
         * @type {plat.expressions.IParser}
         * 
         * @description
         * Reference to the {@link plat.expressions.IParser|IParser} injectable.
         */
        $Parser: expressions.IParser = acquire(__Parser);

        /**
         * @name $Regex
         * @memberof plat.controls.SimpleEventControl
         * @kind property
         * @access public
         * 
         * @type {plat.expressions.IRegex}
         * 
         * @description
         * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
         */
        $Regex: expressions.IRegex = acquire(__Regex);

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
        _expression: Array<string> = [];

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
        _aliases: Array<string> = [];

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
         * Sets the event listener.
         * 
         * @returns {void}
         */
        _setListener(): void {
            var attr = this.attribute;
            if (isEmpty(this.event) || isEmpty(attr)) {
                return;
            }

            this._parseArgs((<any>this.attributes)[attr]);

            if (isNull(this._expression)) {
                return;
            }

            this.addEventListener(this.element, this.event, this._onEvent, false);
        }

        /**
         * @name _findListener
         * @memberof plat.controls.SimpleEventControl
         * @kind function
         * @access protected
         * 
         * @description
         * Finds the first instance of the specified function 
         * in the parent control chain.
         * 
         * @param {string} identifier the function identifer
         * 
         * @returns {{ control: ui.ITemplateControl; value: any; }} The instance of the specified function.
         */
        _findListener(identifier: string): { control: ui.ITemplateControl; value: any; } {
            var control: ui.ITemplateControl = <any>this,
                expression = this.$Parser.parse(identifier),
                value: any;

            while (!isNull(control)) {
                value = expression.evaluate(control);
                if (!isNull(value)) {
                    return {
                        control: control,
                        value: value
                    };
                }
                control = control.parent;
            }

            return {
                control: null,
                value: null
            };
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
         * @returns {{ fn: () => void; control: ui.ITemplateControl; args: Array<expressions.IParsedExpression>; }} 
         * The function to call and the associated arguments, as well as the control context with which to call the function.
         */
        _buildExpression(): { fn: () => void; control: ui.ITemplateControl; args: Array<expressions.IParsedExpression>; } {
            var expression = this._expression.slice(0),
                hasParent = !isNull(this.parent),
                aliases = hasParent ? this.parent.getResources(this._aliases) : null,
                listenerStr = expression.shift(),
                listener: { control: ui.ITemplateControl; value: any; },
                control: ui.ITemplateControl,
                fn: () => void;

            if (listenerStr[0] !== '@') {
                listener = this._findListener(listenerStr);

                if (isNull(listener)) {
                    return {
                        fn: noop,
                        control: <ui.ITemplateControl>{},
                        args: []
                    };
                }

                fn = listener.value;
                control = listener.control;
            } else {
                fn = aliases[listenerStr];
                control = null;
            }

            var length = expression.length,
                args: Array<expressions.IParsedExpression> = [],
                $parser = this.$Parser;

            for (var i = 0; i < length; ++i) {
                args.push($parser.parse(expression[i]).evaluate(hasParent ? this.parent.context : null, aliases));
            }

            return {
                fn: fn,
                control: control,
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
        _onEvent(ev: Event): void {
            var expression = this._buildExpression(),
                fn = expression.fn,
                control = expression.control,
                args = expression.args;

            if (!isFunction(fn)) {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.warn('Cannot find registered event method ' +
                    this._expression[0] + ' for control: ' + this.type, $exception.BIND);
                return;
            }

            fn.apply(control, args.concat(<any>ev));
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
        _findAliases(args: Array<string>): Array<string> {
            var length = args.length,
                arg: string,
                exec: RegExpExecArray,
                aliases: IObject<boolean> = {},
                $regex = this.$Regex;

            for (var i = 0; i < length; ++i) {
                arg = args[i].trim();

                if (arg[0] === '@') {
                    exec = $regex.aliasRegex.exec(arg);
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
        _parseArgs(expression: string): void {
            var exec = this.$Regex.argumentRegex.exec(expression),
                haveArgs = !isNull(exec);

            if (isEmpty(expression)) {
                return;
            }

            if (haveArgs) {
                this._expression = [expression.slice(0, exec.index)]
                    .concat((exec[1] !== '') ? exec[1].split(',') : []);
            } else {
                this._expression.push(expression);
            }

            this._aliases = this._findAliases(this._expression);
        }
    }

    /**
     * @name ISimpleEventControl
     * @memberof plat.controls
     * @kind interface
     * 
     * @extends {plat.controls.IAttributeControl}
     * 
     * @description
     * An {@link plat.controls.IAttributeControl|IAttributeControl} that binds to a specified DOM event handler.
     */
    export interface ISimpleEventControl extends IAttributeControl {
        /**
         * @name event
         * @memberof plat.controls.ISimpleEventControl
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
         * @memberof plat.controls.ISimpleEventControl
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
        event: string = __$tap;
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
        event: string = __$dbltap;
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
        event: string = __$touchstart;
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
        event: string = __$touchend;
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
        event: string = __$touchmove;
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
        event: string = __$touchcancel;
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
        event: string = __$hold;
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
        event: string = __$release;
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
        event: string = __$swipe;
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
        event: string = __$swipeleft;
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
        event: string = __$swiperight;
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
        event: string = __$swipeup;
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
        event: string = __$swipedown;
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
        event: string = __$track;
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
        event: string = __$trackleft;
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
        event: string = __$trackright;
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
        event: string = __$trackup;
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
        event: string = __$trackdown;
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
        event: string = __$trackend;
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
        _onEvent(ev: Event): void {
            if (!this.element.hasAttribute('action')) {
                ev.preventDefault();
            }

            super._onEvent(ev);
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
}
