module plat.controls {
    'use strict';

    /**
     * @name ObservableAttributeControl
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.AttributeControl}
     *
     * @description
     * An {@link plat.AttributeControl|AttributeControl} that deals with observing changes for a specified property.
     */
    export class ObservableAttributeControl extends AttributeControl {
        protected static _inject: any = {
            _ContextManager: __ContextManagerStatic
        };

        /**
         * @name _ContextManager
         * @memberof plat.controls.ObservableAttributeControl
         * @kind property
         * @access protected
         *
         * @type {plat.observable.IContextManagerStatic}
         *
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
         */
        protected _ContextManager: observable.IContextManagerStatic;

        /**
         * @name property
         * @memberof plat.controls.ObservableAttributeControl
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The property to set on the associated template control.
         */
        property: string = '';

        /**
         * @name attribute
         * @memberof plat.controls.ObservableAttributeControl
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
         * @name priority
         * @memberof plat.controls.ObservableAttributeControl
         * @kind property
         * @access public
         *
         * @type {number}
         *
         * @description
         * This control needs to load before its templateControl
         */
        priority: number = 200;

        /**
         * @name _listeners
         * @memberof plat.controls.ObservableAttributeControl
         * @kind property
         * @access protected
         *
         * @type {Array<plat.IPropertyChangedListener>}
         *
         * @description
         * The set of functions added by the Template Control that listens
         * for property changes.
         */
        protected _listeners: Array<(newValue: any, oldValue: any) => void> = [];

        /**
         * @name _removeListener
         * @memberof plat.controls.ObservableAttributeControl
         * @kind property
         * @access protected
         *
         * @type {IRemoveListener}
         *
         * @description
         * The function to stop listening for property changes.
         */
        protected _removeListener: IRemoveListener;

        /**
         * @name _boundAddListener
         * @memberof plat.controls.ObservableAttributeControl
         * @kind property
         * @access protected
         *
         * @type {plat.controls.ObservableAttributeControl._addListener}
         *
         * @description
         * The _addListener function bound to this control.
         */
        protected _boundAddListener: typeof ObservableAttributeControl.prototype._addListener = this._addListener.bind(this);

        /**
         * @name initialize
         * @memberof plat.controls.ObservableAttributeControl
         * @kind function
         * @access public
         *
         * @description
         * Sets the initial value of the property on
         * the Template Control.
         *
         * @returns {void}
         */
        initialize(): void {
            this.attribute = camelCase(this.type);
            this._setProperty(this._getValue());
        }

        /**
         * @name loaded
         * @memberof plat.controls.ObservableAttributeControl
         * @kind function
         * @access public
         *
         * @description
         * Observes the property and resets the value.
         *
         * @returns {void}
         */
        loaded(): void {
            this._observeProperty();
            this._setProperty(this._getValue());
        }

        /**
         * @name dispose
         * @memberof plat.controls.ObservableAttributeControl
         * @kind function
         * @access public
         *
         * @description
         * Stops listening for changes to the evaluated
         * expression and removes references to the listeners
         * defined by the Template Control.
         *
         * @returns {void}
         */
        dispose(): void {
            if (isFunction(this._removeListener)) {
                this._removeListener();
            }

            this._listeners = [];
        }

        /**
         * @name _setProperty
         * @memberof plat.controls.ObservableAttributeControl
         * @kind function
         * @access protected
         *
         * @description
         * Sets the property on the Template Control.
         *
         * @param {any} value The new value of the evaluated expression.
         * @param {any} oldValue? The old value of the evaluated expression.
         *
         * @returns {void}
         */
        protected _setProperty(value: any, oldValue?: any): void {
            let templateControl = this.templateControl;

            if (isNull(templateControl)) {
                return;
            }

            this._ContextManager.defineGetter(templateControl, this.property, <observable.IObservableProperty<any>>{
                value: value,
                observe: this._boundAddListener
            }, true, true);

            this._callListeners(value, oldValue);
        }

        /**
         * @name _callListeners
         * @memberof plat.controls.ObservableAttributeControl
         * @kind function
         * @access protected
         *
         * @description
         * Calls the listeners defined by the Template Control.
         *
         * @param {any} value The new value of the evaluated expression.
         * @param {any} oldValue The old value of the evaluated expression.
         *
         * @returns {void}
         */
        protected _callListeners(newValue: any, oldValue: any): void {
            let listeners = this._listeners,
                length = listeners.length;

            for (let i = 0; i < length; ++i) {
                listeners[i](newValue, oldValue);
            }
        }

        /**
         * @name _addListener
         * @memberof plat.controls.ObservableAttributeControl
         * @kind function
         * @access protected
         *
         * @description
         * Adds a listener as defined by the Template Control.
         *
         * @param {plat.IPropertyChangedListener} listener The listener added by the Template Control.
         */
        protected _addListener(listener: (newValue: any, oldValue: any) => void): IRemoveListener {
            let listeners = this._listeners;

            listener = listener.bind(this.templateControl);
            listeners.push(listener);

            return (): void => {
                let index = listeners.indexOf(listener);
                if (index === -1) {
                    return;
                }

                listeners.splice(index, 1);
            };
        }

        /**
         * @name _getValue
         * @memberof plat.controls.ObservableAttributeControl
         * @kind function
         * @access protected
         *
         * @description
         * Evaluates the attribute's value.
         *
         * @returns {any}
         */
        protected _getValue(): any {
            if (isNull(this.templateControl)) {
                return;
            }

            return this.evaluateExpression(this.attributes[this.attribute]);
        }

        /**
         * @name _observeProperty
         * @memberof plat.controls.ObservableAttributeControl
         * @kind function
         * @access protected
         *
         * @description
         * Observes the attribute's value.
         *
         * @returns {void}
         */
        protected _observeProperty(): void {
            if (isNull(this.templateControl)) {
                return;
            }

            this._removeListener = this.observeExpression(this._setProperty, this.attributes[this.attribute]);
        }
    }

    /**
     * @name Options
     * @memberof plat.controls
     * @kind class
     *
     * @extends {plat.controls.ObservableAttributeControl}
     *
     * @description
     * An {@link plat.controls.ObservableAttributeControl|ObservableAttributeControl} that sets 'options' as the
     * associated property.
     */
    export class Options extends ObservableAttributeControl {
        /**
         * @name property
         * @memberof plat.controls.Options
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The property to set on the associated template control.
         */
        property: string = 'options';
    }

    register.control(__Options, Options);
}
