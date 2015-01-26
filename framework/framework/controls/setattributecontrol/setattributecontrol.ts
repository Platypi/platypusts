module plat.controls {
    /**
     * @name SetAttributeControl
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.AttributeControl}
     * @implements {plat.controls.ISetAttributeControl}
     * 
     * @description
     * An {@link plat.AttributeControl|AttributeControl} that deals with binding to a specified property on its element.
     */
    export class SetAttributeControl extends AttributeControl implements ISetAttributeControl {
        /**
         * @name property
         * @memberof plat.controls.SetAttributeControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property to set on the associated element.
         */
        property: string = '';

        /**
         * @name attribute
         * @memberof plat.controls.SetAttributeControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The camel-cased name of the control as it appears as an attribute.
         */
        attribute: string;

        /**
         * @name __removeListener
         * @memberof plat.controls.SetAttributeControl
         * @kind property
         * @access private
         * 
         * @type {IRemoveListener}
         * 
         * @description
         * The function to stop listening for attribute changes.
         */
        private __removeListener: IRemoveListener;

        /**
         * @name loaded
         * @memberof plat.controls.SetAttributeControl
         * @kind function
         * @access public
         * 
         * @description
         * Sets the corresponding attribute {property} value and 
         * observes the attribute for changes.
         * 
         * @returns {void}
         */
        loaded(): void {
            if (isNull(this.element)) {
                return;
            }

            this.attribute = camelCase(this.type);
            this.setter();
            this.__removeListener = this.attributes.observe(this.attribute, this.setter);
        }

        /**
         * @name contextChanged
         * @memberof plat.controls.SetAttributeControl
         * @kind function
         * @access public
         * 
         * @description
         * Resets the corresponding attribute property value upon 
         * a change of context.
         * 
         * @returns {void}
         */
        contextChanged(): void {
            if (isNull(this.element)) {
                return;
            }

            this.setter();
        }

        /**
         * @name dispose
         * @memberof plat.controls.SetAttributeControl
         * @kind function
         * @access public
         * 
         * @description
         * Stops listening to attribute changes.
         * 
         * @returns {void}
         */
        dispose(): void {
            if (isFunction(this.__removeListener)) {
                this.__removeListener();
                this.__removeListener = null;
            }
        }

        /**
         * @name setter
         * @memberof plat.controls.SetAttributeControl
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * The function for setting the corresponding 
         * attribute property value.
         * 
         * @returns {void}
         */
        setter(): void {
            postpone(() => {
                var element = this.element,
                    property = this.property;

                if (!isNode(element)) {
                    return;
                }

                switch (this.attributes[this.attribute]) {
                    case 'false':
                    case '0':
                    case 'null':
                    case '':
                        element.setAttribute(property, '');
                        (<any>element)[property] = false;
                        element.removeAttribute(property);
                        break;
                    default:
                        element.setAttribute(property, property);
                        (<any>element)[property] = true;
                }
            });
        }
    }

    /**
     * @name ISetAttributeControl
     * @memberof plat.controls
     * @kind interface
     * 
     * @extends {plat.AttributeControl}
     * 
     * @description
     * An {@link plat.AttributeControl|AttributeControl} that deals with binding to a specified property on its element.
     */
    export interface ISetAttributeControl extends AttributeControl {
        /**
         * @name property
         * @memberof plat.controls.ISetAttributeControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property to set on the associated template control.
         */
        property: string;

        /**
         * @name attribute
         * @memberof plat.controls.ISetAttributeControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The camel-cased name of the control as it appears as an attribute.
         */
        attribute: string;

        /**
         * @name setter
         * @memberof plat.controls.ISetAttributeControl
         * @kind function
         * @access public
         * 
         * @description
         * The function for setting the corresponding 
         * attribute property value.
         * 
         * @returns {void}
         */
        setter(): void;
    }

    /**
     * @name Checked
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.SetAttributeControl}
     * 
     * @description
     * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'checked' attribute.
     */
    export class Checked extends SetAttributeControl {
        /**
         * @name property
         * @memberof plat.controls.Checked
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property to set on the associated template control.
         */
        property: string = 'checked';
    }

    /**
     * @name Disabled
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.SetAttributeControl}
     * 
     * @description
     * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'disabled' attribute.
     */
    export class Disabled extends SetAttributeControl {
        /**
         * @name property
         * @memberof plat.controls.Disabled
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property to set on the associated template control.
         */
        property: string = 'disabled';
    }

    /**
     * @name Selected
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.SetAttributeControl}
     * 
     * @description
     * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'selected' attribute.
     */
    export class Selected extends SetAttributeControl {
        /**
         * @name property
         * @memberof plat.controls.Selected
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property to set on the associated template control.
         */
        property: string = 'selected';
    }

    /**
     * @name ReadOnly
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.SetAttributeControl}
     * 
     * @description
     * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'readonly' attribute.
     */
    export class ReadOnly extends SetAttributeControl {
        /**
         * @name property
         * @memberof plat.controls.ReadOnly
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property to set on the associated template control.
         */
        property: string = 'readonly';
    }

    /**
     * @name Visible
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.SetAttributeControl}
     * 
     * @description
     * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'plat-hide' attribute.
     */
    export class Visible extends SetAttributeControl {
        /**
         * @name property
         * @memberof plat.controls.Visible
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property to set on the associated element.
         */
        property: string = 'display';

        /**
         * @name value
         * @memberof plat.controls.Visible
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The value to associate with the property.
         */
        value: string = 'none';

        /**
         * @name importance
         * @memberof plat.controls.Visible
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The importance to set on the property.
         */
        importance: string = 'important';

        /**
         * @name _initialValue
         * @memberof plat.controls.Visible
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The initial value of the property to be set.
         */
        protected _initialValue = '';

        /**
         * @name initialize
         * @memberof plat.controls.Visible
         * @kind function
         * @access public
         * 
         * @description
         * Hides the element.
         * 
         * @returns {void}
         */
        initialize(): void {
            var style: CSSStyleDeclaration = this.element.style || <any>{ getPropertyValue: noop },
                initialValue = style.getPropertyValue(this.property);

            this._setValue(this.value, this.importance);

            if (isEmpty(initialValue) || initialValue === 'none') {
                return;
            }

            this._initialValue = initialValue;
        }

        /**
         * @name setter
         * @memberof plat.controls.Visible
         * @kind function
         * @access public
         * 
         * @description
         * Hides or shows the element depending upon the attribute value
         * 
         * @returns {void}
         */
        setter(): void {
            postpone(() => {
                if (!isNode(this.element)) {
                    return;
                }

                switch (this.attributes[this.attribute]) {
                    case 'false':
                    case '0':
                    case 'null':
                    case '':
                        this._setValue(this.value, this.importance);
                        break;
                    default:
                        this._setValue(this._initialValue);
                        break;
                }
            });
        }

        /**
         * @name _setValue
         * @memberof plat.controls.Visible
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the value of the property element with the given importance. If the 
         * value is null or empty string, the property will be removed.
         * 
         * @param {string} value The value to set.
         * @param {string} importance? The priority or importance level to set.
         * 
         * @returns {void}
         */
        protected _setValue(value: string, importance?: string): void {
            var property = this.property,
                style: CSSStyleDeclaration = this.element.style || <any>{
                    setProperty: noop,
                    removeProperty: noop,
                    getPropertyValue: noop,
                    getPropertyPriority: noop
                },
                currentVal = style.getPropertyValue(property),
                currentPriority = style.getPropertyPriority(property);

            if (value === currentVal && importance === currentPriority) {
                return;
            } else if (isEmpty(value)) {
                style.removeProperty(property);
                return;
            }

            style.setProperty(property, value, importance);
        }
    }

    /**
     * @name Style
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.SetAttributeControl}
     * 
     * @description
     * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'style' attribute.
     */
    export class Style extends SetAttributeControl {
        /**
         * @name setter
         * @memberof plat.controls.Style
         * @kind function
         * @access public
         * 
         * @description
         * Sets the evaluated styles on the element.
         * 
         * @returns {void}
         */
        setter(): void {
            var expression: string = this.attributes[this.attribute];

            if (isEmpty(expression)) {
                return;
            }

            var attributes = expression.split(';'),
                elementStyle = this.element.style || {},
                length = attributes.length,
                splitStyles: Array<string>,
                styleType: string,
                styleValue: string;

            for (var i = 0; i < length; ++i) {
                splitStyles = attributes[i].split(':');

                if (splitStyles.length < 2) {
                    continue;
                } else if (splitStyles.length > 2) {
                    splitStyles = [splitStyles.shift(), splitStyles.join(':')];
                }

                styleType = camelCase(splitStyles[0].trim());
                styleValue = splitStyles[1].trim();

                if (!isUndefined((<any>elementStyle)[styleType])) {
                    (<any>elementStyle)[styleType] = styleValue;
                }
            }
        }
    }

    register.control(__Checked, Checked);
    register.control(__Disabled, Disabled);
    register.control(__Selected, Selected);
    register.control(__ReadOnly, ReadOnly);
    register.control(__Visible, Visible);
    register.control(__Style, Style);
}
