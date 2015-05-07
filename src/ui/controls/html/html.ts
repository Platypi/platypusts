/// <reference path="../../../references.d.ts" />

module plat.ui.controls {
    'use strict';

    /**
     * @name InnerHtml
     * @memberof plat.ui.controls
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * 
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} for adding HTML to the 
     * DOM through bound context strings.
     */
    export class InnerHtml extends TemplateControl {
        /**
         * @name contextChanged
         * @memberof plat.ui.controls.InnerHtml
         * @kind function
         * @access public
         * 
         * @description
         * Loads the DOM with the new HTML String.
         * 
         * @returns {void}
         */
        contextChanged(): void {
            this.loaded();
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.InnerHtml
         * @kind function
         * @access public
         * 
         * @description
         * Loads the context string as the innerHTML of the element.
         * 
         * @returns {void}
         */
        loaded(): void {
            var context = this.context;

            if (!isString(context)) {
                return;
            }

            setInnerHtml(this.element, context);
        }
    }

    register.control(__Html, InnerHtml);
}
