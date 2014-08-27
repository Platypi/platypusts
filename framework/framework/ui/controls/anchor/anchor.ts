﻿/**
 * @name controls
 * @memberof plat.ui
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds classes and interfaces related to UI control components in platypus.
 */
module plat.ui.controls {
    /**
     * @name Anchor
     * @memberof plat.ui.controls
     * @kind class
     * @exported false
     * 
     * @extends {plat.ui.TemplateControl}
     * 
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} for adding additonal 
     * functionality to a native HTML anchor tag.
     */
    class Anchor extends TemplateControl {
        /**
         * @name replaceWith
         * @memberof plat.ui.controls.Anchor
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Replaces the {@link plat.ui.controls.Anchor|Anchor's} element with a native anchor tag.
         */
        replaceWith = 'a';
        /**
         * @name element
         * @memberof plat.ui.controls.Anchor
         * @kind property
         * @access public
         * 
         * @type {HTMLAnchorElement}
         * 
         * @description
         * The control's anchor element.
         */
        element: HTMLAnchorElement;
        /**
         * @name initialize
         * @memberof plat.ui.controls.Anchor
         * @kind function
         * @access public
         * 
         * @description
         * Prevents default on the anchor tag if the href attribute is left empty.
         * 
         * @returns {void}
         */
        initialize(): void {
            var element = this.element;
            if (isEmpty(element.href)) {
                this.addEventListener(element, 'click', (ev: Event) => {
                    if (isEmpty(element.href)) {
                        ev.preventDefault();
                    }
                }, false);
            }
        }
    }

    register.control(__Anchor, Anchor);
}
