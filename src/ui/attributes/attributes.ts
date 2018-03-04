/**
 * @name ui
 * @memberof plat
 * @kind namespace
 * @access public
 *
 * @description
 * Holds all the classes and interfaces related to UI components for platypus.
 */
namespace plat.ui {
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
        private __listeners: IObject<
            ((newValue: any, oldValue: any) => void)[]
        > = {};
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

        public static getInstance(): Attributes {
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
        public initialize(control: Control, attributes: IObject<string>): void {
            this.__control = control;

            const keys = Object.keys(attributes);
            const attributeListeners = this.__listeners;
            let key: string;
            const length = keys.length;

            for (let i = 0; i < length; i += 1) {
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
         * @param {plat.IPropertyChangedListener} listener The listener function to be called when the attribute changes.
         * @param {string} key The attribute to observe for changes (e.g. 'src').
         *
         * @returns {plat.IRemoveListener} A function to stop observing this attribute for changes.
         */
        public observe(
            listener: (newValue: any, oldValue: any) => void,
            key: string
        ): IRemoveListener {
            const listeners = this.__listeners[camelCase(key)];

            if (isNull(listeners)) {
                return noop;
            }

            listener = listener.bind(this.__control);
            listeners.push(listener);

            return (): void => {
                const index = listeners.indexOf(listener);
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
        protected _attributeChanged(
            key: string,
            newValue: any,
            oldValue: any
        ): void {
            const listeners = this.__listeners[camelCase(key)];
            const length = listeners.length;

            for (let i = 0; i < length; i += 1) {
                listeners[i](newValue, oldValue);
            }
        }
    }

    export function IAttributesFactory(): typeof Attributes {
        return Attributes;
    }

    register.injectable(__AttributesInstance, Attributes, null, __INSTANCE);
    register.injectable(
        __AttributesFactory,
        IAttributesFactory,
        null,
        __FACTORY
    );
}
