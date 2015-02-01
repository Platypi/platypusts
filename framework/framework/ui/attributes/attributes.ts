/**
 * @name ui
 * @memberof plat
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds all the classes and interfaces related to UI components for platypus.
 */
module plat.ui {
    'use strict';

    /**
     * @name Attributes
     * @memberof plat.ui
     * @kind class
     * 
     * @description
     * The class that stores the information about an Element's attributes (NamedNodeMap).
     * Methods are implemented to allow you to observe for changes on an attribute.
     * 
     * @remarks
     * Attributes for this object are converted from dash-notation to camelCase notation.
     */
    export class Attributes {
        [property: string]: any;

        /**
         * @name __listeners
         * @memberof plat.ui.Attributes
         * @kind property
         * @access private
         * 
         * @type {plat.IObject<Array<plat.IPropertyChangedListener>>}
         * 
         * @description
         * The set of functions added externally that listens 
         * for attribute changes.
         */
        private __listeners: IObject<Array<(newValue: any, oldValue?: any) => void>> = {};
        /**
         * @name __control
         * @memberof plat.ui.Attributes
         * @kind property
         * @access private
         * 
         * @type {plat.Control}
         * 
         * @description
         * The control tied to this instance.
         */
        private __control: Control;

        static getInstance() {
            return new Attributes();
        }

        /**
         * @name initialize
         * @memberof plat.ui.Attributes
         * @kind function
         * @access public
         * 
         * @description
         * Initializes this instance with a {@link plat.Control|Control} and the camelCased 
         * attribute properties and their values.
         * 
         * @param {plat.Control} control The function that acts as a listener.
         * @param {plat.IObject<string>} attributes The camelCased attribute properties and their values.
         * 
         * @returns {void}
         */
        initialize(control: Control, attributes: IObject<string>): void {
            this.__control = control;

            var keys = Object.keys(attributes),
                attributeListeners = this.__listeners,
                key: string,
                length = keys.length;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                (<any>this)[key] = attributes[key];
                attributeListeners[key] = [];
            }
        }

        /**
         * @name observe
         * @memberof plat.ui.Attributes
         * @kind function
         * @access public
         * 
         * @description
         * Provides a way to observe an attribute for changes.
         * 
         * @param {string} key The attribute to observe for changes (e.g. 'src').
         * @param {plat.IPropertyChangedListener} listener The listener function to be called when the attribute changes.
         * 
         * @returns {plat.IRemoveListener} A function to stop observing this attribute for changes.
         */
        observe(key: string, listener: (newValue: any, oldValue?: any) => void): IRemoveListener {
            var listeners = this.__listeners[camelCase(key)];

            if (isNull(listeners)) {
                return noop;
            }

            listener = listener.bind(this.__control);
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
         * @name _attributeChanged
         * @memberof plat.ui.Attributes
         * @kind function
         * @access protected
         * 
         * @description
         * Used to show an attribute has been changed and forces listeners to be fired.
         * 
         * @param {string} key The attribute being observed for changes (e.g. 'src').
         * @param {any} newValue The new value of the attribute.
         * @param {any} oldValue The previous value of the attribute.
         * 
         * @returns {void}
         */
        protected _attributeChanged(key: string, newValue: any, oldValue: any): void {
            var listeners = this.__listeners[camelCase(key)],
                length = listeners.length;

            for (var i = 0; i < length; ++i) {
                listeners[i](newValue, oldValue);
            }
        }
    }

    export function IAttributesFactory(): typeof Attributes {
        return Attributes;
    }

    register.injectable(__AttributesInstance, Attributes, null, __INSTANCE);
    register.injectable(__AttributesFactory, IAttributesFactory, null, __FACTORY);
}
