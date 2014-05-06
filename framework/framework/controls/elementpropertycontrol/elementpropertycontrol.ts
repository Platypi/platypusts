module plat.controls {
    export class ElementPropertyControl extends SetAttributeControl {
        /**
         * The function for setting the corresponding 
         * attribute {property} value to the evaluated expression.
         */
        setter() {
            var element = this.element,
                elementProperty = this.property,
                expression = this.attributes[this.attribute];

            if (isEmpty(expression) || isNull(element)) {
                return;
            }

            if (!isUndefined(element[elementProperty])) {
                element[elementProperty] = expression;
            }
        }
    }

    export class Href extends ElementPropertyControl {
        /**
         * The corresponding attribute to set on the element.
         */
        property: string = 'href';
    }

    export class Src extends ElementPropertyControl {
        /**
         * The corresponding attribute to set on the element.
         */
        property: string = 'src';
    }

    register.control('plat-href', Href);
    register.control('plat-src', Src);
}
