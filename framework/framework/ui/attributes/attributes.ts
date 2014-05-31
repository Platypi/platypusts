module plat.ui {
    /**
     * The class that stores the information about an Element's attribute NamedNodeMap.
     * Methods are implemented to allow you to observe for changes on an attribute.
     * 
     * Attributes for this object are converted from dash-notation to camelCase notation.
     */
    export class Attributes implements IAttributesInstance {
        private __listeners: IObject<Array<(newValue: any, oldValue: any) => void>> = {};
        private __control: IControl;

        initialize(control: IControl, attributes: IObject<string>): void {
            this.__control = control;

            var keys = Object.keys(attributes),
                attributeListeners = this.__listeners,
                key: string,
                length = keys.length,
                parent = control.parent,
                hasParent = !isNull(parent);

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                (<any>this)[key] = attributes[key];
                attributeListeners[key] = [];
            }
        }

        observe(key: string, listener: (newValue: any, oldValue: any) => void): IRemoveListener {
            var listeners = this.__listeners[camelCase(key)];

            if (isNull(listeners)) {
                return noop;
            }

            var length = listeners.length;

            listeners.push(listener);

            return () => {
                listeners.splice(length, 1);
            };
        }
        
        /**
         * Used to show an attribute has been changed and forces listeners to be fired.
         * 
         * @param key The attribute being observed for changes (e.g. 'platOptions').
         * @param newValue The new value of the attribute.
         * @param oldValue The previous value of the attribute.
         */
        attributeChanged(key: string, newValue: any, oldValue: any): void {
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
    export var IAttributesInstance = Attributes;

    register.injectable(__AttributesInstance, IAttributesInstance, null, register.INSTANCE);

    /**
     * Describes an object that stores the information about an Element's attribute NamedNodeMap.
     * Methods are implemented to allow you to observe for changes on an attribute.
     * 
     * Attributes for this object are converted from dash-notation to camelCase notation.
     */
    export interface IAttributesInstance {
        /**
         * Stores the information about an Element's attribute NamedNodeMap, and allows a control to observe 
         * for changes on an attribute. The interface takes in a generic type, allowing ITemplateControls 
         * to specify an interface for their plat-options.
         * 
         * Attributes for this object are converted from dash-notation to camelCase notation. 'plat-options' are 
         * parsed and stored as an object on this object, all other attributes are stored with their string values.
         */
        initialize(control: IControl, attributes: IObject<string>): void;

        /**
         * Provides a way to observe an attribute for changes.
         * 
         * @param key The attribute to observe for changes.
         * @param listener The listener function to be called when the attribute changes.
         */
        observe(key: string, listener: (newValue: any, oldValue: any) => void): IRemoveListener;

        /**
         * Used to show an attribute has been changed and forces listeners to be fired.
         * 
         * @param key The attribute being observed for changes (e.g. 'platOptions').
         * @param newValue The new value of the attribute.
         * @param oldValue The previous value of the attribute.
         */
        attributeChanged(key: string, newValue: any, oldValue: any): void;
    }
}
