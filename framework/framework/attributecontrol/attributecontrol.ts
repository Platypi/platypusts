module plat {
    /**
     * @name AttributeControl
     * @memberof plat
     * @kind class
     * @access public
     * 
     * @extends {plat.Control}
     * 
     * @description
     * A type of control that can be used as an attribute but will 
     * not be used to add, remove, or modify DOM.
     */
    export class AttributeControl extends Control {
        /**
         * @name dispose
         * @memberof plat.AttributeControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Method for disposing an attribute control. Removes any 
         * necessary objects from the control.
         * 
         * @param {plat.AttributeControl} control The {@link plat.AttributeControl|AttributeControl} to dispose.
         * 
         * @returns {void}
         */
        static dispose(control: AttributeControl): void {
            deleteProperty(control, 'templateControl');

            Control.dispose(control);
        }

        /**
         * @name getInstance
         * @memberof plat.AttributeControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance of {@link plat.AttributeControl|AttributeControl}.
         * 
         * @returns {plat.AttributeControl}
         */
        static getInstance(): AttributeControl {
            return new AttributeControl();
        }

        /**
         * @name templateControl
         * @memberof plat.AttributeControl
         * @kind property
         * @access public
         * 
         * @type {plat.ui.TemplateControl}
         * 
         * @description
         * Specifies the {@link plat.ui.TemplateControl|TemplateControl} associated with this
         * control's element. Can be null if no {@link plat.ui.TemplateControl|TemplateControl}
         * exists.
         */
        templateControl: ui.TemplateControl = null;
    }

    /**
     * The Type for referencing the '_AttributeControlFactory' injectable as a dependency.
     */
    export function IAttributeControlFactory(): IAttributeControlFactory {
        return AttributeControl;
    }

    register.injectable(__AttributeControlFactory, IAttributeControlFactory, null, __FACTORY);

    /**
     * @name AttributeControlFactory
     * @memberof plat
     * @kind interface
     * 
     * @description
     * Creates and manages instances of {@link plat.AttributeControl|AttributeControl}.
     */
    export interface IAttributeControlFactory {
        /**
         * @name dispose
         * @memberof plat.IAttributeControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Method for disposing an attribute control. Removes any 
         * necessary objects from the control.
         * 
         * @param {plat.AttributeControl} control The {@link plat.AttributeControl|AttributeControl} to dispose.
         * 
         * @returns {void}
         */
        dispose(control: AttributeControl): void;

        /**
         * @name getInstance
         * @memberof plat.IAttributeControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance of {@link plat.AttributeControl|AttributeControl}.
         * 
         * @returns {plat.AttributeControl}
         */
        getInstance(): AttributeControl;
    }
}
