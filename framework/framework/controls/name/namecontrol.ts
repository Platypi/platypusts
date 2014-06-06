module plat.controls {
    export class Name extends AttributeControl {
        $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);

        /**
         * The root control that will have the INamedElement set as a property.
         */
        _rootControl: ui.ITemplateControl;

        /**
         * The property name on the root control to set as the INamedElement.
         */
        _label: string;

        /**
         * Finds the root control and defines the property specified by the 
         * attribute value as the INamedElement.
         */
        initialize(): void {
            var attr = camelCase(this.type),
                name = (<any>this.attributes)[attr];

            if (isEmpty(name)) {
                return;
            }

            this._label = name;

            var templateControl = this.templateControl,
                rootControl = this._rootControl = Control.getRootControl(this.parent),
                define = this.$ContextManagerStatic.defineGetter;

            if (!isNull(templateControl)) {
                define(templateControl, 'name', name, true, true);
            }

            if (!isNull(rootControl)) {
                define(rootControl, name, {
                    element: this.element,
                    control: templateControl
                }, true, true);
            }
        }

        /**
         * Removes the INamedElement from the root control.
         */
        dispose(): void {
            var rootControl = this._rootControl,
                name = this._label;

            if (!isNull(rootControl)) {
                delete (<any>rootControl)[name];
            }
        }
    }

    register.control(__Name, Name);

    /**
     * Defines the object added to a root control when an HTML element has 
     * a plat-name attribute. If the element corresponds to a registered 
     * control, the control will be included in the object.
     */
    export interface INamedElement<E extends Element, C> {
        /**
         * The element on which the plat-name is specified.
         */
        element: E;

        /**
         * The template control on the associated element, if one 
         * exists.
         */
        control?: C;
    }
}
