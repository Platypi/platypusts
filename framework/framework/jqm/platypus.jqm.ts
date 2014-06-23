module plat.jqm {
    declare var $: any;

    export class JqmListView extends plat.ui.controls.ForEach {
        loaded() {
            $(this.element).listview();
            super.loaded();
        }
        _addItem(item: DocumentFragment) {
            super._addItem(item);
            $(this.element).listview('refresh');
        }
    }

    plat.register.control('jqm-listview', JqmListView);

    function disableJqmHashChange(): void {
        $.mobile.pushStateEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.linkBindingEnabled = false;
    }

    function setLoaderOptions(): void {
        $.mobile.loader.prototype.options.text = 'loading';
        $.mobile.loader.prototype.options.textVisible = true;
        $.mobile.loader.prototype.options.theme = 'a';
        $.mobile.loader.prototype.options.html = '';
    }

    function removeBase(): void {
        // jqm adds a base tag for ajax navigation, we do not want this.
        var base = document.head.querySelector('base');
        if (base) {
            document.head.removeChild(base);
        }
    }

    $(document).on('mobileinit', () => {
        disableJqmHashChange();
        setLoaderOptions();
        removeBase();
    });

    function overwriteFunctions(...fns: Array<plat.IObject<any>>): void {
        if (fns.length > 1) {
            overwriteFunctions.apply(this, fns.slice(1));
        }

        var fnObj = fns[0],
            keys = Object.keys(fnObj);

        keys.forEach((key, index) => {
            ((base: plat.IObject<any>, key: string) => {
                var fn = base[key];
                base[key] = function () {
                    return (<any>window).MSApp.execUnsafeLocalFunction(
                        fn.bind.apply(fn, [this].concat(Array.prototype.slice.call(arguments))));
                };
            }).call(this, fnObj[key], key);
        });
    }

    var $compat: plat.ICompat = plat.acquire('$Compat');
    if ($compat.msApp) {
        overwriteFunctions({
            appendChild: Node.prototype,
            insertBefore: Node.prototype,
            append: $.prototype,
            html: $.prototype
        }, {
            append: $.fn,
            html: $.fn
        });
    }
}
