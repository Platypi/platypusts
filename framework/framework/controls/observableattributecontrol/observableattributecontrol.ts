module plat.controls {
    /**
     * @name ObservableAttributeControl
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.AttributeControl}
     * @implements {plat.controls.IObservableAttributeControl}
     * 
     * @description
     * An {@link plat.controls.AttributeControl|AttributeControl} that deals with observing changes for a specified property.
     */
    export class ObservableAttributeControl extends AttributeControl implements IObservableAttributeControl {
        /**
         * @name $ContextManagerStatic
         * @memberof plat.controls.ObservableAttributeControl
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IContextManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
         */
        $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);

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
        priority = 200;

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
        _listeners: Array<(newValue: any, oldValue?: any) => void> = [];

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
        _removeListener: IRemoveListener;

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
        _setProperty(value: any, oldValue?: any): void {
            var templateControl = this.templateControl;

            if (isNull(templateControl)) {
                return;
            }

            this.$ContextManagerStatic.defineGetter(templateControl, this.property, <observable.IObservableProperty<any>>{
                value: value,
                observe: this._addListener.bind(this)
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
        _callListeners(newValue: any, oldValue: any): void {
            var listeners = this._listeners,
                length = listeners.length,
                templateControl = this.templateControl;

            for (var i = 0; i < length; ++i) {
                listeners[i].call(templateControl, newValue, oldValue);
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
        _addListener(listener: (newValue: any, oldValue: any) => void): IRemoveListener {
            var listeners = this._listeners;

            listeners.push(listener);

            return () => {
                var index = listeners.indexOf(listener);
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
        _getValue(): any {
            var expression = (<any>this.attributes)[this.attribute],
                templateControl = this.templateControl;

            if (isNull(templateControl)) {
                return;
            }

            return this.evaluateExpression(expression);
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
        _observeProperty(): void {
            var expression = (<any>this.attributes)[this.attribute],
                templateControl = this.templateControl;

            if (isNull(templateControl)) {
                return;
            }

            this._removeListener = this.observeExpression(expression, this._setProperty);
        }
    }

    /**
     * @name IObservableAttributeControl
     * @memberof plat.controls
     * @kind interface
     * 
     * @extends {plat.controls.IAttributeControl}
     * 
     * @description
     * An {@link plat.controls.IAttributeControl|IAttributeControl} that deals with observing changes for a specified property.
     */
    export interface IObservableAttributeControl extends IAttributeControl {
        /**
         * @name property
         * @memberof plat.controls.IObservableAttributeControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property to set on the associated template control.
         */
        property: string;

        /**
         * @name attribute
         * @memberof plat.controls.IObservableAttributeControl
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
