module plat.ui {
    'use strict';

    /**
     * @name BindablePropertyControl
     * @memberof plat.ui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * 
     * @description
     * An extended {@link plat.ui.TemplateControl|TemplateControl} that allows for the binding of a value to 
     * another listening control (e.g. {@link plat.controls.Bind|plat-bind} control).
     */
    export class BindablePropertyControl extends TemplateControl {
        /**
         * @name _listeners
         * @memberof plat.ui.BindablePropertyControl
         * @kind property
         * @access protected
         * 
         * @type {Array<plat.IPropertyChangedListener>}
         * 
         * @description
         * The set of functions added externally that listens 
         * for property changes.
         */
        protected _listeners: Array<(newValue: any, oldValue?: any) => void> = [];

        /**
         * @name observeProperty
         * @memberof plat.ui.BindablePropertyControl
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
        observeProperty(listener: (newValue: any, oldValue?: any) => void): IRemoveListener {
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
         * @name setProperty
         * @memberof plat.ui.BindablePropertyControl
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function that lets this control know when the context's value of the bindable 
         * property has changed.
         * 
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue? The old value of the bindable property.
         * @param {boolean} firstTime? A boolean signifying whether this is the first set of the property.
         * 
         * @returns {void}
         */
        setProperty(newValue: any, oldValue?: any, firstTime?: boolean): void { }

        /**
         * @name propertyChanged
         * @memberof plat.ui.BindablePropertyControl
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
        propertyChanged(newValue: any, oldValue?: any): void {
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
         * @memberof plat.ui.BindablePropertyControl
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
}
