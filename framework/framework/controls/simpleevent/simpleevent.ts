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
        _listener: any;

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
            if (isNull(this._listener) || isNull(this.element)) {
                return;
            }
            this.element.removeEventListener(this.event, this._listener);
            this._listener = null;
        }

        /**
         * Adds the event listener to the element.
         */
        _addEventListener() {
            this._listener = this._onEvent.bind(this);
            this.element.addEventListener(this.event, this._listener, false);
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

            this._addEventListener();
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
        event: string = 'click';
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
        event: string = 'dblclick';
    }

    export class Focus extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'focus';
    }

    export class MouseEnter extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'mouseenter';
    }

    export class MouseLeave extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'mouseleave';
    }

    export class MouseDown extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'mousedown';
    }

    export class MouseUp extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'mouseup';
    }

    export class MouseOver extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'mouseover';
    }

    export class MouseMove extends SimpleEventControl {
        /**
         * The event name.
         */
        event: string = 'mousemove';
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
    register.control('plat-mouseenter', MouseEnter);
    register.control('plat-mouseleave', MouseLeave);
    register.control('plat-mousedown', MouseDown);
    register.control('plat-mouseup', MouseUp);
    register.control('plat-mouseover', MouseOver);
    register.control('plat-mousemove', MouseMove);
    register.control('plat-submit', Submit);
}
