module plat.ui.controls {
    class Anchor extends TemplateControl {
        replaceWith = 'a';
        element: HTMLAnchorElement;
        initialize(): void {
            if (isEmpty(this.element.href)) {
                this.addEventListener(this.element, 'click', (ev: Event) => {
                    if (isEmpty(this.element.href)) {
                        ev.preventDefault();
                    }
                });
            }
        }
    }

    register.control(__Anchor, Anchor);
}
