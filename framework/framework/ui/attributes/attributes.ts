module plat.ui {
    /**
     * The class that stores the information about an HTMLElement's attribute NamedNodeMap.
     * Methods are implemented to allow you to observe for changes on an attribute.
     * 
     * Attributes for this object are converted from dash-notation to camelCase notation.
     */
    export class Attributes implements IAttributes {
        private __listeners: IObject<Array<(newValue: any, oldValue: any) => void>> = {};
        private __control: IControl;

        /**
         * Stores the information about an HTMLElement's attribute NamedNodeMap, and allows a control to observe 
         * for changes on an attribute. The interface takes in a generic type, allowing ITemplateControls 
         * to specify an interface for their plat-options.
         * 
         * Attributes for this object are converted from dash-notation to camelCase notation. 'plat-options' are 
         * parsed and stored as an object on this object, all other attributes are stored with their string values.
         * 
         * @param control The control they'll be placed upon as a property.
         * @param attributes The attributes and their values present on the HTMLElement.
         */
        initialize(control: IControl, attributes: IObject<string>) {
            this.__control = control;

            var keys = Object.keys(attributes),
                attributeListeners = this.__listeners,
                key: string,
                length = keys.length,
                parent = control.parent,
                hasParent = !isNull(parent);

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                this[key] = attributes[key];
                attributeListeners[key] = [];
            }
        }

        /**
         * Provides a way to observe an attribute for changes.
         * 
         * @param key The attribute to observe for changes (e.g. 'platOptions').
         * @param listener The listener function to be called when the attribute changes. The
         * 'this' context of the listener will be scoped to the control instance.
         */
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
        attributeChanged(key: string, newValue: any, oldValue: any) {
            var control = this.__control,
                listeners = this.__listeners[camelCase(key)],
                length = listeners.length;

            for (var i = 0; i < length; ++i) {
                listeners[i].call(control, newValue, oldValue);
            }
        }
    }

    register.injectable('$attributes', Attributes, null, register.injectableType.MULTI);

    /**
     * Describes an object that stores the information about an HTMLElement's attribute NamedNodeMap.
     * Methods are implemented to allow you to observe for changes on an attribute.
     * 
     * Attributes for this object are converted from dash-notation to camelCase notation.
     */
    export interface IAttributes {
        /**
         * Stores the information about an HTMLElement's attribute NamedNodeMap, and allows a control to observe 
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
    }
}
