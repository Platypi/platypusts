module plat.controls {
    /**
     * An AttributeControl that binds to a specified DOM event handler.
     */
    export class SimpleEventControl extends AttributeControl implements ISimpleEventControl {
        $Parser: expressions.IParser = acquire(__Parser);
        $Regex: expressions.IRegex = acquire(__Regex);

        event: string;
        attribute: string;

        /**
         * Our event handler bound to our own context.
         */
        _listener: EventListener = this._onEvent.bind(this);

        /**
         * A parsed form of the expression found in the attribute's value.
         */
        _expression: Array<string> = [];

        /**
         * An array of the aliases used in the expression.
         */
        _aliases: Array<string> = [];

        /**
         * Kicks off finding and setting the listener.
         */
        loaded(): void {
            if (isNull(this.element)) {
                return;
            }

            this.attribute = camelCase(this.type);
            this._setListener();
        }

        /**
         * Disposes of the event listener.
         */
        dispose(): void {
            this._listener = null;
        }

        /**
         * Sets the event listener.
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

            this.addEventListener(this.element, this.event, this._listener, false);
        }

        /**
         * Finds the first instance of the specified function 
         * in the parent control chain.
         * 
         * @param identifier the function identifer
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
         * Constructs the function to evaluate with 
         * the evaluated arguments taking resources 
         * into account.
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
         * Calls the specified function when the DOM event is fired.
         * 
         * @param ev The event object.
         */
        _onEvent(ev: any): void {
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

            fn.apply(control, args.concat(ev));
        }

        /**
         * Finds all alias contained within the expression.
         * 
         * @param arguments The array of arguments as strings.
         */
        _findAliases(arguments: Array<string>): Array<string> {
            var length = arguments.length,
                arg: string,
                exec: RegExpExecArray,
                aliases: IObject<boolean> = {},
                $regex = this.$Regex;

            for (var i = 0; i < length; ++i) {
                arg = arguments[i].trim();

                if (arg[0] === '@') {
                    exec = $regex.aliasRegex.exec(arg);
                    aliases[!isNull(exec) ? exec[0] : arg.substr(1)] = true;
                }
            }

            return Object.keys(aliases);
        }

        /**
         * Parses the expression and separates the function 
         * from its arguments.
         * 
         * @param expression The expression to parse.
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
     * Describes an attribute object that deals with DOM events.
     */
    export interface ISimpleEventControl extends IAttributeControl {
        /**
         * The event name.
         */
        event: string;

        /**
         * The camel-cased name of the control as it appears as an attribute.
         */
        attribute: string;
    }

    export class Tap extends SimpleEventControl {
        event: string = '$tap';
    }

    export class Blur extends SimpleEventControl {
        event: string = 'blur';
    }

    export class Change extends SimpleEventControl {
        event: string = 'change';
    }

    export class Copy extends SimpleEventControl {
        event: string = 'copy';
    }

    export class Cut extends SimpleEventControl {
        event: string = 'cut';
    }

    export class Paste extends SimpleEventControl {
        event: string = 'paste';
    }

    export class DblTap extends SimpleEventControl {
        event: string = '$dbltap';
    }

    export class Focus extends SimpleEventControl {
        event: string = 'focus';
    }

    export class TouchStart extends SimpleEventControl {
        event: string = '$touchstart';
    }

    export class TouchEnd extends SimpleEventControl {
        event: string = '$touchend';
    }

    export class TouchMove extends SimpleEventControl {
        event: string = '$touchmove';
    }

    export class TouchCancel extends SimpleEventControl {
        event: string = '$touchcancel';
    }

    export class Hold extends SimpleEventControl {
        event: string = '$hold';
    }

    export class Release extends SimpleEventControl {
        event: string = '$release';
    }

    export class Swipe extends SimpleEventControl {
        event: string = '$swipe';
    }

    export class SwipeLeft extends SimpleEventControl {
        event: string = '$swipeleft';
    }

    export class SwipeRight extends SimpleEventControl {
        event: string = '$swiperight';
    }

    export class SwipeUp extends SimpleEventControl {
        event: string = '$swipeup';
    }

    export class SwipeDown extends SimpleEventControl {
        event: string = '$swipedown';
    }

    export class Track extends SimpleEventControl {
        event: string = '$track';
    }

    export class TrackLeft extends SimpleEventControl {
        event: string = '$trackleft';
    }

    export class TrackRight extends SimpleEventControl {
        event: string = '$trackright';
    }

    export class TrackUp extends SimpleEventControl {
        event: string = '$trackup';
    }

    export class TrackDown extends SimpleEventControl {
        event: string = '$trackdown';
    }

    export class Submit extends SimpleEventControl {
        event: string = 'submit';

        /**
         * Prevents the default submit action unless 
         * the "action" attribute is present.
         * 
         * @param ev The event object.
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
}
