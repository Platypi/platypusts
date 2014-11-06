module plat.controls {
    /**
     * @name ElementPropertyControl
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.SetAttributeControl}
     * 
     * @description
     * Base class used for setting the property of an element (e.g. href for anchor elements).
     */
    export class ElementPropertyControl extends SetAttributeControl {
        /**
         * @name setter
         * @memberof plat.controls.ElementPropertyControl
         * @kind function
         * @access public
         * 
         * @description
         * The function for setting the corresponding 
         * attribute property value to the evaluated expression.
         * 
         * @returns {void}
         */
        setter(): void {
            var element = this.element,
                elementProperty = this.property,
                expression = this.attributes[this.attribute];

            if (isEmpty(expression) || isNull(element)) {
                return;
            }

            if (!isUndefined((<any>element)[elementProperty])) {
                (<any>element)[elementProperty] = expression;
            }
        }
    }

    /**
     * @name Href
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.ElementPropertyControl}
     * 
     * @description
     * A type of {@link plat.controls.ElementPropertyControl|ElementPropertyControl} used to set 'href' on an anchor tag.
     */
    export class Href extends ElementPropertyControl {
        /**
         * @name property
         * @memberof plat.controls.Href
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * Used to set the element's href property.
         */
        property: string = 'href';

        /**
         * @name templateControl
         * @memberof plat.controls.Href
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * The TemplateControl for a plat-href is an {@link plat.ui.controls.Anchor|Anchor} control.
         */
        templateControl: ui.controls.Anchor;

        /**
         * @name setter
         * @memberof plat.controls.Href
         * @kind function
         * @access public
         * 
         * @description
         * Sets the href property, then calls the {@link plat.ui.controls.Anchor|Anchor} control to 
         * normalize the href.
         * 
         * @returns {void}
         */
        setter() {
            super.setter();

            if (isFunction(this.templateControl.setHref)) {
                this.templateControl.setHref();
            }
        }
    }

    /**
     * @name Src
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.ElementPropertyControl}
     * 
     * @description
     * A type of {@link plat.controls.ElementPropertyControl|ElementPropertyControl} used to set 'src' on an anchor tag.
     */
    export class Src extends ElementPropertyControl {
        /**
         * @name property
         * @memberof plat.controls.Src
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * Used to set the element's src property.
         */
        property: string = 'src';

        /**
         * @name $Browser
         * @memberof plat.controls.Src
         * @kind property
         * @access public
         * 
         * @type {plat.web.IBrowser}
         * 
         * @description
         * The plat.web.IBrowser injectable instance
         */
        $Browser: web.IBrowser = acquire(__Browser);

        /**
         * @name setter
         * @memberof plat.controls.Src
         * @kind function
         * @access public
         * 
         * @description
         * The function for setting the corresponding 
         * attribute property value to the evaluated expression.
         * 
         * @returns {void}
         */
        setter() {
            var element = this.element,
                elementProperty = this.property,
                expression = this.attributes[this.attribute];

            if (isEmpty(expression) || isNull(element)) {
                return;
            }

            if (!isUndefined((<any>element)[elementProperty])) {
                (<any>element)[elementProperty] = this.$Browser.urlUtils(expression);
            }
        }
    }

    register.control(__Href, Href);
    register.control(__Src, Src);
}
