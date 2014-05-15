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
            control.templateControl = null;
            delete control.templateControl;

            Control.dispose(control);
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
     * The Type for referencing the '$AttributeControlStatic' injectable as a dependency.
     */
    export function AttributeControlStatic(
            $ControlStatic: IControlStatic) {
        return AttributeControl;
    }

    register.injectable('$AttributeControlStatic', AttributeControlStatic,
        null, register.injectableType.STATIC);

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
        templateControl: ui.ITemplateControl;

        /**
         * Specifies the priority of the attribute. The purpose of 
         * this is so that controls like plat-bind can have a higher 
         * priority than plat-tap. The plat-bind will be initialized 
         * and loaded before plat-tap, meaning it has the first chance 
         * to respond to events.
         */
        priority: number;
    }

    /**
     * The external interface for the '$AttributeControlStatic' injectable.
     */
    export interface IAttributeControlStatic {
        /**
         * Method for disposing an attribute control. Removes any
         * necessary objects from the control.
         *
         * @static
         * @param control The AttributeControl to dispose.
         */
        dispose(control: IAttributeControl): void;

        /**
         * Create a new empty IAttributeControl
         */
        new (): IAttributeControl;
    }
}
