module plat.controls {
    export class Name extends AttributeControl {
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

            if (isEmpty(name) || this._isPrecompiled()) {
                return;
            }

            this._label = name;
            this._define(name);
        }

        /**
         * Removes the INamedElement from the root control.
         */
        dispose(): void {
            var name = this._label,
                control: any = this.parent;

            while (!isUndefined(name) && isObject(control)) {
                if (isObject(control[name]) &&
                    isNode(control[name].element) &&
                    control[name].element === this.element) {
                    deleteProperty(control, name);
                }

                control = control.parent;
            }
        }

        /**
         * Defines an INamedElement on every control up the control tree.
         */
        _define(name: string) {
            var templateControl = this.templateControl;

            if (!isNull(templateControl)) {
                templateControl.name = name;
            }

            var control: any = this.parent,
                namedElement = {
                    element: this.element,
                    control: templateControl
                },
                isPrecompiled = false;

            while (isObject(control)) {
                var obj = control[name];

                if (!isObject(obj)) {
                    control[name] = namedElement;
                }

                control = control.parent;
            }
        }

        _isPrecompiled() {
            var control = this.parent;

            while (!isNull(control)) {
                if (control.type.indexOf('-compiled') !== -1) {
                    return true;
                }
                control = control.parent;
            }
            return false;
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
