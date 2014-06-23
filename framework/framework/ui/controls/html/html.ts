module plat.ui.controls {
    export class Html extends TemplateControl {
        /**
         * Loads the new HTML String.
         */
        contextChanged(): void {
            this.loaded();
        }

        /**
         * Loads the context as the innerHTML of the element.
         */
        loaded(): void {
            var context = this.context;

            if (!isString(context)) {
                return;
            }

            this.dom.setInnerHtml(this.element, context);
        }
    }

    register.control(__Html, Html);
}
