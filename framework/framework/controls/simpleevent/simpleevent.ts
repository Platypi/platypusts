module plat.controls {
    /**
     * An AttributeControl that binds to a specified DOM event handler.
     */
    export class SimpleEventControl extends AttributeControl implements ISimpleEventControl {
        /**
         * The event name.
         */
        event: string;

        /**
         * The camel-cased name of the control as it appears as an attribute.
         */
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
        $parser: expressions.IParser = acquire('$parser');
        $regex: expressions.IRegex = acquire('$regex');
        $ExceptionStatic: IExceptionStatic = acquire('$ExceptionStatic');

        /**
         * Kicks off finding and setting the listener.
         */
        loaded() {
            if (isNull(this.element)) {
                return;
            }

            this.attribute = camelCase(this.type);
            this._setListener();
        }

        /**
         * Disposes of the event listener.
         */
        dispose() {
            this._listener = null;
        }

        /**
         * Sets the event listener.
         */
        _setListener() {
            var attr = this.attribute;
            if (isEmpty(this.event) || isEmpty(attr)) {
                return;
            }

            this._parseArgs(this.attributes[attr]);

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
        _findListener(identifier: string) {
            var control: IControl = this,
                expression = this.$parser.parse(identifier),
                value;

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
        _buildExpression() {
            var expression = this._expression.slice(0),
                hasParent = !isNull(this.parent),
                aliases = hasParent ? this.parent.getResources(this._aliases) : null,
                listenerStr = expression.shift(),
                listener,
                control,
                fn;

            if (listenerStr[0] !== '@') {
                listener = this._findListener(listenerStr);

                if (isNull(listener)) {
                    return {
                        fn: noop,
                        control: {},
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
                args = [],
                parser = this.$parser;

            for (var i = 0; i < length; ++i) {
                args.push(parser.parse(expression[i]).evaluate(hasParent ? this.parent.context : null, aliases));
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
        _onEvent(ev: any) {
            var expression = this._buildExpression(),
                fn = expression.fn,
                control = expression.control,
                args = expression.args;

            if (!isFunction(fn)) {
                this.$ExceptionStatic.warn('Cannot find registered event method ' +
                    this._expression[0] + ' for control: ' + this.type);
                return;
            }

            fn.apply(control, args.concat(ev));
        }

        /**
         * Finds all alias contained within the expression.
         * 
         * @param arguments The array of arguments as strings.
         */
        _findAliases(arguments: Array<string>) {
            var length = arguments.length,
                arg: string,
                alias: string,
                exec: RegExpExecArray,
                aliases = {},
                aliasRegex = this.$regex.aliasRegex;

            for (var i = 0; i < length; ++i) {
                arg = arguments[i].trim();

                if (arg[0] === '@') {
                    exec = aliasRegex.exec(arg);
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
        _parseArgs(expression: string) {
            var exec = this.$regex.argumentRegex.exec(expression),
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
        /**
         * The event name.
         */
        event: string = 'tap';
    }

    export class Blur extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'blur';
    }

    export class Change extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'change';
    }

    export class Copy extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'copy';
    }

    export class Cut extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'cut';
    }

    export class Paste extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'paste';
    }

    export class DblTap extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'dbltap';
    }

    export class Focus extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'focus';
    }

    export class TouchStart extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'touchstart';
    }

    export class TouchEnd extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'touchend';
    }

    export class TouchMove extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'touchmove';
    }

    export class TouchEnter extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'touchenter';
    }

    export class TouchLeave extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'touchleave';
    }

    export class TouchCancel extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'touchcancel';
    }

    export class Hold extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'hold';
    }

    export class Release extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'release';
    }

    export class Swipe extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'swipe';
    }

    export class SwipeLeft extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'swipeleft';
    }

    export class SwipeRight extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'swiperight';
    }

    export class SwipeUp extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'swipeup';
    }

    export class SwipeDown extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'swipedown';
    }

    export class Track extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'track';
    }

    export class TrackLeft extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'trackleft';
    }

    export class TrackRight extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'trackright';
    }

    export class TrackUp extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'trackup';
    }

    export class TrackDown extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'trackdown';
    }

    export class Submit extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'submit';

        /**
         * Prevents the default submit action unless 
         * the "action" attribute is present.
         * 
         * @param ev The event object.
         */
        _onEvent(ev: Event) {
            if (!this.element.hasAttribute('action')) {
                ev.preventDefault();
            }

            super._onEvent(ev);
        }
    }

    register.control('plat-tap', Tap);
    register.control('plat-blur', Blur);
    register.control('plat-change', Change);
    register.control('plat-copy', Copy);
    register.control('plat-cut', Cut);
    register.control('plat-paste', Paste);
    register.control('plat-dbltap', DblTap);
    register.control('plat-focus', Focus);
    register.control('plat-submit', Submit);
    register.control('plat-touchstart', TouchStart);
    register.control('plat-touchend', TouchEnd);
    register.control('plat-touchmove', TouchMove);
    register.control('plat-touchenter', TouchEnter);
    register.control('plat-touchleave', TouchLeave);
    register.control('plat-touchcancel', TouchCancel);
    register.control('plat-hold', Hold);
    register.control('plat-release', Release);
    register.control('plat-swipe', Swipe);
    register.control('plat-swipeleft', SwipeLeft);
    register.control('plat-swiperight', SwipeRight);
    register.control('plat-swipeup', SwipeUp);
    register.control('plat-swipedown', SwipeDown);
    register.control('plat-track', Track);
    register.control('plat-trackleft', TrackLeft);
    register.control('plat-trackright', TrackRight);
    register.control('plat-trackup', TrackUp);
    register.control('plat-trackdown', TrackDown);
}
