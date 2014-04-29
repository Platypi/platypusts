module plat.controls {
    export class Name extends AttributeControl {
        $ContextManagerStatic: observable.IContextManagerStatic = acquire('$ContextManagerStatic');
        $ExceptionStatic: IExceptionStatic = acquire('$ExceptionStatic');
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
        initialize() {
            var attr = camelCase(this.type),
                name = this.attributes[attr];

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
                if (!isNull(rootControl[name])) {
                    this.$ExceptionStatic.warn('Multiple instances of plat-name = ' +
                        name + ' found, or root control already has property defined.', this.$ExceptionStatic.NAME);
                    return;
                }

                define(rootControl, name, {
                    element: this.element,
                    control: templateControl
                }, true, true);
            }
        }

        /**
         * Removes the INamedElement from the root control.
         */
        dispose() {
            var rootControl = this._rootControl,
                name = this._label;

            if (!isNull(rootControl)) {
                this.$ContextManagerStatic.defineProperty(rootControl, name, null, true, true);
                delete rootControl[name];
            }
        }
    }

    register.control('plat-name', Name);

    /**
     * Defines the object added to a root control when an HTML element has 
     * a plat-name attribute. If the element corresponds to a registered 
     * control, the control will be included in the object.
     */
    export interface INamedElement<T extends HTMLElement, U> {
        /**
         * The element on which the plat-name is specified.
         */
        element: T;

        /**
         * The template control on the associated element, if one 
         * exists.
         */
        control?: U;
    }
}
