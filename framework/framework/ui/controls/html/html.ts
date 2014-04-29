module plat.ui.controls {
    export class Html extends TemplateControl {
        /**
         * Loads the new HTML String.
         */
        contextChanged() {
            this.loaded();
        }

        /**
         * Loads the context as the innerHTML of the element.
         */
        loaded() {
            var context = this.context;

            if (!isString(context)) {
                return;
            }

            this.dom.setInnerHtml(this.element, context);
        }
    }

    register.control('plat-html', Html);
}
