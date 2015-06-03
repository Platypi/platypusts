module plat.ui {
    'use strict';

    /**
     * @name BindControl
     * @memberof plat.ui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {plat.observable.ISupportTwoWayBinding}
     * 
     * @description
     * An extended {@link plat.ui.TemplateControl|TemplateControl} that allows for the binding of a value to 
     * another listening control (e.g. {@link plat.controls.Bind|plat-bind} control).
     */
    export class BindControl extends TemplateControl implements observable.ISupportTwoWayBinding {
        /**
         * @name priority
         * @memberof plat.ui.BindControl
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * Set to 120, higher than {@link plat.controls.Bind|`plat-bind`} to ensure that BinControls load 
         * prior to the `plat-bind`.
         */
        priority: number = 120;

        /**
         * @name _listeners
         * @memberof plat.ui.BindControl
         * @kind property
         * @access protected
         * 
         * @type {Array<plat.IPropertyChangedListener<any>>}
         * 
         * @description
         * The set of functions added externally that listens 
         * for property changes.
         */
        protected _listeners: Array<IPropertyChangedListener<any>> = [];

        /**
         * @name onInput
         * @memberof plat.ui.BindControl
         * @kind function
         * @access public
         * 
         * @description
         * Adds a listener to be called when the bindable property changes.
         * 
         * @param {plat.IPropertyChangedListener<any>} listener The function that acts as a listener.
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
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the 
         * databinding.
         * 
         * @returns {void}
         */
        observeProperties(binder: observable.IImplementTwoWayBinding): void { }

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
}
