/// <reference path="../../../references.d.ts" />

module plat.ui.controls {
    'use strict';

    /**
     * @name Ignore
     * @memberof plat.ui.controls
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * 
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} for inner HTML that contains controls  
     * and/or markup and not having it bind or evaluate.
     */
    export class Ignore extends TemplateControl {
        /**
         * @name setTemplate
         * @memberof plat.ui.controls.Ignore
         * @kind function
         * @access public
         * 
         * @description
         * Removes the innerHTML from the DOM and saves it.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            this.innerTemplate = <DocumentFragment>appendChildren(this.element.childNodes);
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.Ignore
         * @kind function
         * @access public
         * 
         * @description
         * Places the saved innerHTML back into the DOM.
         * 
         * @returns {void}
         */
        loaded(): void {
            this.element.appendChild(this.innerTemplate.cloneNode(true));
        }
    }

    register.control(__Ignore, Ignore);
}
