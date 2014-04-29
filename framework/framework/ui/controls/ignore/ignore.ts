module plat.ui.controls {
    export class Ignore extends TemplateControl {
        /**
         * Removes the innerHTML from the DOM and saves it.
         */
        setTemplate() {
            this.innerTemplate = <DocumentFragment>this.dom.appendChildren(this.element.childNodes);
        }

        /**
         * Places the saved innerHTML back into the DOM.
         */
        loaded() {
            this.element.appendChild(this.innerTemplate.cloneNode(true));
        }
    }

    register.control('plat-ignore', Ignore);
}
