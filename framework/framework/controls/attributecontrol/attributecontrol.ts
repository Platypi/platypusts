module plat.controls {
    /**
     * A type of control that can be used as an attribute but will 
     * not be used to add, remove, or modify DOM.
     */
    export class AttributeControl extends Control implements IAttributeControl {
        /**
         * Method for disposing an attribute control. Removes any 
         * necessary objects from the control.
         * 
         * @static
         * @param control The AttributeControl to dispose.
         */
        static dispose(control: IAttributeControl): void {
            delete control.templateControl;

            Control.dispose(control);
        }

        /**
         * Returns a new instance of AttributeControl.
         * 
         * @static
         */
        static getInstance(): IAttributeControl {
            return new AttributeControl();
        }

        /**
         * Specifies the ITemplateControl associated with this
         * control's element. Can be null if no ITemplateControl
         * exists.
         */
        templateControl: ui.ITemplateControl = null;

        /**
         * Specifies the priority of the attribute. The purpose of 
         * this is so that controls like plat-bind can have a higher 
         * priority than plat-tap. The plat-bind will be initialized 
         * and loaded before plat-tap, meaning it has the first chance 
         * to respond to events.
         */
        priority = 0;
    }

    /**
     * The Type for referencing the '$AttributeControlFactory' injectable as a dependency.
     */
    export function IAttributeControlFactory(): IAttributeControlFactory {
        return AttributeControl;
    }

    register.injectable(__AttributeControlFactory, IAttributeControlFactory, null, __FACTORY);

    /**
     * Creates and manages instances of IAttributeControl.
     */
    export interface IAttributeControlFactory {
        /**
         * Method for disposing an attribute control. Removes any
         * necessary objects from the control.
         *
         * @static
         * @param control The AttributeControl to dispose.
         */
        dispose(control: IAttributeControl): void;

        /**
         * Returns a new instance of an IAttributeControl.
         *
         * @static
         */
        getInstance(): IAttributeControl;
    }

    /**
     * An object describing a type of control that can be used as an attribute but will 
     * not be used to add, remove, or modify DOM.
     */
    export interface IAttributeControl extends IControl {
        /**
         * Specifies the ITemplateControl associated with this
         * control's element. Can be null if no ITemplateControl
         * exists.
         */
        templateControl?: ui.ITemplateControl;

        /**
         * Specifies the priority of the attribute. The purpose of 
         * this is so that controls like plat-bind can have a higher 
         * priority than plat-tap. The plat-bind will be initialized 
         * and loaded before plat-tap, meaning it has the first chance 
         * to respond to events.
         */
        priority?: number;
    }
}
