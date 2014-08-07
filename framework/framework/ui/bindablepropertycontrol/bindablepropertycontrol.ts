module plat.ui {
    export class BindablePropertyControl extends TemplateControl implements IBindablePropertyControl {
        /**
         * The set of functions added externally that listens 
         * for property changes.
         */
        _listeners: Array<(newValue: any, oldValue?: any) => void> = [];

        /**
         * Adds a listener to be called when the bindable property changes.
         * 
         * @param listener The function that acts as a listener.
         */
        observeProperty(listener: (newValue: any, oldValue?: any) => void): IRemoveListener {
            var listeners = this._listeners,
                length = listener.length;

            listeners.push(listener);

            return () => {
                listeners.splice(length, 1);
            };
        }

        /**
         * A function that lets the BindablePropertyControl know when the context's value of the bindable 
         * property has changed.
         * 
         * @param newValue The new value of the bindable property.
         * @param oldValue The old value of the bindable property.
         * @param firstTime A boolean signifying whether this is the first set of the property.
         */
        setProperty(newValue: any, oldValue?: any, firstTime?: boolean): void { }

        /**
         * A function that signifies when BindablePropertyControl's bindable property has changed.
         * 
         * @param newValue The new value of the property after the change.
         * @param oldValue The old value of the property prior to the change.
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
         * Removes references to the listeners 
         * defined externally.
         */
        dispose(): void {
            this._listeners = [];
        }
    }

    export interface IBindablePropertyControl extends ITemplateControl {
        /**
         * Adds a listener to be called when the bindable property changes.
         * 
         * @param listener The function that acts as a listener.
         */
        observeProperty(listener: (newValue: any, oldValue?: any) => void): IRemoveListener;

        /**
         * A function that lets the BindablePropertyControl know when the context's value of the bindable 
         * property has changed.
         * 
         * @param newValue The new value of the bindable property.
         * @param oldValue The old value of the bindable property.
         * @param firstTime A boolean signifying whether this is the first set of the property.
         */
        setProperty(newValue: any, oldValue?: any, firstTime?: boolean): void;

        /**
         * A function that signifies when BindablePropertyControl's bindable property has changed.
         * 
         * @param newValue The new value of the property after the change.
         * @param oldValue The old value of the property prior to the change.
         */
        propertyChanged(newValue: any, oldValue?: any): void;
    }
}
