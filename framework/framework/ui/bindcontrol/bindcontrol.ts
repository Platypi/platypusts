module plat.ui {
    'use strict';

    /**
     * @name BindControl
     * @memberof plat.ui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {plat.ui.ISupportTwoWayBinding}
     * 
     * @description
     * An extended {@link plat.ui.TemplateControl|TemplateControl} that allows for the binding of a value to 
     * another listening control (e.g. {@link plat.controls.Bind|plat-bind} control).
     */
    export class BindControl extends TemplateControl implements ISupportTwoWayBinding {
        /**
         * @name _listeners
         * @memberof plat.ui.BindControl
         * @kind property
         * @access protected
         * 
         * @type {Array<plat.IPropertyChangedListener>}
         * 
         * @description
         * The set of functions added externally that listens 
         * for property changes.
         */
        protected _listeners: Array<IPropertyChangedListener> = [];

        /**
         * @name onInput
         * @memberof plat.ui.BindControl
         * @kind function
         * @access public
         * 
         * @description
         * Adds a listener to be called when the bindable property changes.
         * 
         * @param {plat.IPropertyChangedListener} listener The function that acts as a listener.
         * 
         * @returns {plat.IRemoveListener} A function to stop listening for property changes.
         */
        onInput(listener: (newValue: any, oldValue: any) => void): IRemoveListener {
            var listeners = this._listeners;

            listeners.push(listener);

            return (): void => {
                var index = listeners.indexOf(listener);
                if (index === -1) {
                    return;
                }

                listeners.splice(index, 1);
            };
        }

        /**
         * @name observeProperties
         * @memberof plat.ui.BindControl
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function that allows this control to observe both the bound property itself as well as 
         * potential child properties if being bound to an object.
         * 
         * @param {(listener: plat.ui.IBoundPropertyChangedListener, identifier: string) => void} observe 
         * A function that allows bound properties to be observed with defined listeners.
         * @param {string} identifier The identifier off of the bound object to listen to for changes.
         * 
         * @returns {void}
         */
        observeProperties(observe: (listener: (newValue: any, oldValue: any, identifier: string, firstTime?: boolean) => void,
            identifier: string) => void): void { }

        /**
         * @name inputChanged
         * @memberof plat.ui.BindControl
         * @kind function
         * @access public
         * 
         * @description
         * A function that signifies when this control's bindable property has changed.
         * 
         * @param {any} newValue The new value of the property after the change.
         * @param {any} oldValue? The old value of the property prior to the change.
         * 
         * @returns {void}
         */
        inputChanged(newValue: any, oldValue?: any): void {
            if (newValue === oldValue) {
                return;
            }

            var listeners = this._listeners,
                length = listeners.length;

            for (var i = 0; i < length; ++i) {
                listeners[i](newValue, oldValue);
            }
        }

        /**
         * @name dispose
         * @memberof plat.ui.BindControl
         * @kind function
         * @access public
         * 
         * @description
         * Removes references to the listeners 
         * defined externally.
         * 
         * @returns {void}
         */
        dispose(): void {
            this._listeners = [];
        }
    }

    /**
     * @name ISupportTwoWayBinding
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Defines methods that interface with a control that handles two way databinding (e.g. {@link plat.controls.Bind|plat-bind} control).
     */
    export interface ISupportTwoWayBinding {
        /**
         * @name observeProperty
         * @memberof plat.ui.ISupportTwoWayBinding
         * @kind function
         * @access public
         * 
         * @description
         * Adds a listener to be called when the bindable property changes.
         * 
         * @param {plat.IPropertyChangedListener} listener The function that acts as a listener.
         * 
         * @returns {plat.IRemoveListener} A function to stop listening for property changes.
         */
        onInput(listener: (newValue: any, oldValue?: any) => void): IRemoveListener;

        /**
         * @name observeProperties
         * @memberof plat.ui.ISupportTwoWayBinding
         * @kind function
         * @access public
         * 
         * @description
         * A function that allows this control to observe both the bound property itself as well as 
         * potential child properties if being bound to an object.
         * 
         * @param {(listener: plat.ui.IBoundPropertyChangedListener, identifier: string) => void} 
         * observe A function that allows bound properties to be observed with defined listeners.
         * @param {string} identifier? The identifier off of the bound object to listen to for changes. If not defined 
         * the listener will listen for changes to the bound item itself.
         * 
         * @returns {void}
         */
        observeProperties(observe: (listener: (newValue: any, oldValue: any, identifier: string, firstTime?: boolean) => void,
            identifier?: string) => void): void;
    }

    /**
     * @name IBoundPropertyChangedListener
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Defines a function that will be called whenever a bound property specified by a given identifier has changed.
     */
    export interface IBoundPropertyChangedListener {
        /**
         * @memberof plat.ui.IBoundPropertyChangedListener
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * The method signature for {@link plat.IBoundPropertyChangedListener|IBoundPropertyChangedListener}.
         * 
         * @param {any} newValue The new value of the observed property.
         * @param {any} oldValue The previous value of the observed property.
         * @param {any} identifier The string or number identifier that specifies the changed property.
         * @param {boolean} firstTime? True if this is the first case where the bound property is being set.
         * 
         * @returns {void}
         */
        (newValue: any, oldValue: any, identifier: any, firstTime?: boolean): void;
    }
}
