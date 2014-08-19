module plat.ui.controls {
    class Anchor extends TemplateControl {
        replaceWith = 'a';
        element: HTMLAnchorElement;
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
