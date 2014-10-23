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
    /**
     * @name Attributes
     * @memberof plat.ui
     * @kind class
     * 
     * @implements {plat.ui.IAttributesInstance}
     * 
     * @description
     * The class that stores the information about an Element's attributes (NamedNodeMap).
     * Methods are implemented to allow you to observe for changes on an attribute.
     * 
     * @remarks
     * Attributes for this object are converted from dash-notation to camelCase notation.
     */
    export class Attributes implements IAttributesInstance {
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
         * @type {plat.IControl}
         * 
         * @description
         * The control tied to this instance.
         */
        private __control: IControl;

        /**
         * @name initialize
         * @memberof plat.ui.Attributes
         * @kind function
         * @access public
         * 
         * @description
         * Initializes this instance with a {@link plat.IControl|IControl} and the camelCased 
         * attribute properties and their values.
         * 
         * @param {plat.IControl} control The function that acts as a listener.
         * @param {plat.IObject<string>} attributes The camelCased attribute properties and their values.
         * 
         * @returns {void}
         */
        initialize(control: IControl, attributes: IObject<string>): void {
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
        _attributeChanged(key: string, newValue: any, oldValue: any): void {
            var control = this.__control,
                listeners = this.__listeners[camelCase(key)],
                length = listeners.length;

            for (var i = 0; i < length; ++i) {
                listeners[i].call(control, newValue, oldValue);
            }
        }
    }

    /**
     * The Type for referencing the '$Attributes' injectable as a dependency.
     */
    export function IAttributesInstance(): IAttributesInstance {
        return new Attributes();
    }

    register.injectable(__AttributesInstance, IAttributesInstance, null, __INSTANCE);
    
    /**
     * @name IAttributesInstance
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Describes an object that stores the information about an Element's attribute NamedNodeMap.
     * Methods are implemented to allow you to observe for changes on an attribute.
     */
    export interface IAttributesInstance {
        [property: string]: any;

        /**
         * @name initialize
         * @memberof plat.ui.IAttributesInstance
         * @kind function
         * @access public
         * 
         * @description
         * Initializes this instance with a {@link plat.IControl|IControl} and the camelCased 
         * attribute properties and their values.
         * 
         * @param {plat.IControl} control The function that acts as a listener.
         * @param {plat.IObject<string>} attributes The camelCased attribute properties and their values.
         * 
         * @returns {void}
         */
        initialize(control: IControl, attributes: IObject<string>): void;

        /**
         * @name observe
         * @memberof plat.ui.IAttributesInstance
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
        observe(key: string, listener: (newValue: any, oldValue: any) => void): IRemoveListener;
    }
}
