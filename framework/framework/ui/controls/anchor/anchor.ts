module plat.ui.controls {
    class Anchor extends TemplateControl {
        replaceWith = 'a';
        element: HTMLAnchorElement;
        loaded() {
            var href = this.element.href;

            if (isEmpty(this.element.href)) {
                this.element.addEventListener('click', (ev: Event) => {
                    if (isEmpty(this.element.href)) {
                        ev.preventDefault();
                    }
                });
            }
        }
    }

    register.control('a', Anchor);
}
