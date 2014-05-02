module plat.jqm {
    declare var $: any;

    export class JqmListView extends ui.controls.ForEach {
        loaded() {
            $(this.endNode.parentNode).listview();
            super.loaded();
        }
        _addItem(item: DocumentFragment) {
            super._addItem(item);
            $(this.endNode.parentNode).listview('refresh');
        }
    }

    register.control('jqm-listview', JqmListView);

    function disableJqmHashChange() {
        $.mobile.pushStateEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.linkBindingEnabled = false;
    }

    function setLoaderOptions() {
        $.mobile.loader.prototype.options.text = 'loading';
        $.mobile.loader.prototype.options.textVisible = true;
        $.mobile.loader.prototype.options.theme = 'a';
        $.mobile.loader.prototype.options.html = '';
    }

    function removeBase() {
        // JQM adds a base tag for ajax navigation, we do not want this.
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

    register.injectable('$document', ($window: Window) => $($window.document), ['$window']);

    function overwriteFunctions(fns) {
        if (arguments.length > 1) {
            overwriteFunctions.apply(this, Array.prototype.slice.call(arguments, 1));
        }
        for (var key in fns) {
            if (!fns.hasOwnProperty(key)) {
                continue;
            }
            ((base, key) => {
                var fn = base[key];
                base[key] = function () {
                    return (<any>window).MSApp.execUnsafeLocalFunction(
                        fn.bind.apply(fn, [this].concat(Array.prototype.slice.call(arguments))));
                };
            }).call(this, fns[key], key);
        }
    }
    var compat: ICompat = acquire('$compat');
    if (compat.msApp) {
        overwriteFunctions({
            appendChild: Node.prototype,
            insertBefore: Node.prototype,
            append: $.prototype,
            html: $.prototype
        });
        overwriteFunctions({
            append: $.fn,
            html: $.fn
        });
    }
}
