module plat.controls {
    /**
     * An AttributeControl that deals with binding to a specified property on its element.
     */
    export class SetAttributeControl extends AttributeControl implements ISetAttributeControl {
        property: string;
        attribute: string;

        /**
         * The function for removing the attribute changed listener.
         */
        private __removeListener: IRemoveListener;

        /**
         * Sets the corresponding attribute {property} value and 
         * observes the attribute for changes.
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
         * Resets the corresponding attribute {property} value upon 
         * a change of context.
         */
        contextChanged(): void {
            if (isNull(this.element)) {
                return;
            }

            this.setter();
        }

        /**
         * Stops listening to attribute changes.
         */
        dispose(): void {
            if (isFunction(this.__removeListener)) {
                this.__removeListener();
                this.__removeListener = null;
            }
        }

        /**
         * The function for setting the corresponding 
         * attribute {property} value.
         */
        setter(): void {
            var expression = (<any>this.attributes)[this.attribute];

            postpone(() => {
                if (!isNode(this.element)) {
                    return;
                }

                switch (expression) {
                    case 'false':
                    case '0':
                    case 'null':
                    case '':
                        this.element.setAttribute(this.property, '');
                        (<any>this.element)[this.property] = false;
                        this.element.removeAttribute(this.property);
                        break;
                    default:
                        this.element.setAttribute(this.property, this.property);
                        (<any>this.element)[this.property] = true;
                }
            });
        }
    }

    /**
     * Describes an attribute object that deals with binding to a specified property.
     */
    export interface ISetAttributeControl extends IAttributeControl {
        /**
         * The corresponding attribute to set on the element.
         */
        property: string;

        /**
         * The camel-cased name of the control as it appears as an attribute.
         */
        attribute: string;

        /**
         * The function for setting the corresponding 
         * attribute {property} value.
         */
        setter(): void;
    }

    export class Checked extends SetAttributeControl {
        property: string = 'checked';
    }


    export class Disabled extends SetAttributeControl {
        property: string = 'disabled';
    }

    export class Selected extends SetAttributeControl {
        property: string = 'selected';
    }

    export class ReadOnly extends SetAttributeControl {
        property: string = 'readonly';
    }

    export class Visible extends SetAttributeControl {
        property: string = __Hide;

        initialize() {
            this.__hide();
        }

        setter() {
            var expression = (<any>this.attributes)[this.attribute];

            postpone(() => {
                if (!isNode(this.element)) {
                    return;
                }

                switch (expression) {
                    case 'false':
                    case '0':
                    case 'null':
                    case '':
                        this.__hide();
                        break;
                    default:
                        this.__show();
                }
            });
        }

        private __hide() {
            if (!this.element.hasAttribute(this.property)) {
                this.element.setAttribute(this.property, '');
            }
        }

        private __show() {
            if (this.element.hasAttribute(this.property)) {
                this.element.removeAttribute(this.property);
            }
        }
    }

    export class Style extends SetAttributeControl {
        /**
         * Sets the evaluated styles on the element.
         */
        setter(): void {
            var expression: string = (<any>this.attributes)[this.attribute];

            if (isEmpty(expression)) {
                return;
            }

            var attributes = expression.split(';'),
                elementStyle = this.element.style,
                length = attributes.length,
                splitStyles: Array<string>,
                styleType: string,
                styleValue: string;

            for (var i = 0; i < length; ++i) {
                splitStyles = attributes[i].split(':');
                if (splitStyles.length === 2) {
                    styleType = camelCase(splitStyles[0].trim());
                    styleValue = splitStyles[1].trim();

                    if (!isUndefined((<any>elementStyle)[styleType])) {
                        (<any>elementStyle)[styleType] = styleValue;
                    }
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
