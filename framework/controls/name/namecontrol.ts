/// <reference path="../../references.d.ts" />

module plat.controls {
    'use strict';

    /**
     * @name Name
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.AttributeControl}
     * 
     * @description
     * Allows for assigning a name to an Element or {@link plat.ui.TemplateControl|TemplateControl} and referencing it 
     * from parent controls.
     * 
     * @remarks
     * This control is useful for avoiding query selectors since it will store itself on all of its ancestor controls using 
     * the associated name.
     */
    export class Name extends AttributeControl {
        /**
         * @name _label
         * @memberof plat.controls.Name
         * @kind property
         * @access protected
         * @static
         * 
         * @type {string}
         * 
         * @description
         * The property name on the ancestor controls to set as the {@link plat.controls.INamedElement|INamedElement}.
         */
        protected _label: string;

        /**
         * @name initialize
         * @memberof plat.controls.Name
         * @kind function
         * @access public
         * 
         * @description
         * Defines the property specified by the attribute value as the {@link plat.controls.INamedElement|INamedElement} 
         * on all the ancestor controls, ignoring those that already have the property defined.
         * 
         * @returns {void}
         */
        initialize(): void {
            var attr = camelCase(this.type),
                name = this.attributes[attr];

            if (isEmpty(name) || this._isPrecompiled()) {
                return;
            }

            this._label = name;
            this._define(name);
        }

        /**
         * @name dispose
         * @memberof plat.controls.Name
         * @kind function
         * @access public
         * 
         * @description
         * Removes the {@link plat.controls.INamedElement|INamedElement} from the ancestor controls.
         * 
         * @returns {void}
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
         * @name _define
         * @memberof plat.controls.Name
         * @kind function
         * @access protected
         * 
         * @description
         * Defines the property specified by the attribute value as the {@link plat.controls.INamedElement|INamedElement} 
         * on all the ancestor controls, ignoring those that already have the property defined.
         * 
         * @param {string} name The name to define on all the ancestor controls.
         * 
         * @returns {void}
         */
        protected _define(name: string): void {
            var templateControl = this.templateControl;

            if (!isNull(templateControl)) {
                templateControl.name = name;
            }

            var control: any = this.parent,
                namedElement = {
                    element: this.element,
                    control: templateControl
                };

            while (isObject(control)) {
                var obj = control[name];

                if (!isObject(obj)) {
                    control[name] = namedElement;
                }

                control = control.parent;
            }
        }

        /**
         * @name _isPrecompiled
         * @memberof plat.controls.Name
         * @kind function
         * @access protected
         * 
         * @description
         * Determines whether or not this control is part of a pre-compiled control tree. In the event 
         * that it is, it shouldn't set itself on the ancestor controls.
         * 
         * @param {string} name The name to define on all the ancestor controls.
         * 
         * @returns {void}
         */
        protected _isPrecompiled(): boolean {
            var control = this.parent;

            while (!isNull(control)) {
                if (control.type.indexOf(__COMPILED) !== -1) {
                    return true;
                }
                control = control.parent;
            }
            return false;
        }
    }

    register.control(__Name, Name);

    /**
     * @name INamedElement
     * @memberof plat.controls
     * @kind interface
     * 
     * @description
     * Defines the object added to a root control when an HTML element has 
     * a plat-name attribute. If the element corresponds to a registered 
     * control, the control will be included in the object.
     * 
     * @typeparam {Element} E The type of element that is named.
     * @typeparam {any} C The type of control that is named.
     */
    export interface INamedElement<E extends Element, C> {
        /**
         * @name element
         * @memberof plat.controls.INamedElement
         * @kind property
         * 
         * @type {E}
         * 
         * @description
         * The element on which the plat-name is specified.
         */
        element: E;

        /**
         * @name control
         * @memberof plat.controls.INamedElement
         * @kind property
         * 
         * @type {C}
         * 
         * @description
         * The template control on the associated element, if one 
         * exists.
         */
        control?: C;
    }
}
