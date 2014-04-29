module plat.ui.controls {
    class Anchor extends TemplateControl {
        element: HTMLAnchorElement;
        $browserConfig: web.IBrowserConfig = acquire('$browser.config');
        $browser: web.IBrowser = acquire('$browser');
        initialize() {
            var config = this.$browserConfig;

            if (config.routingType !== config.routeType.HASH) {
                return;
            }

            var prefix = config.hashPrefix || '',
                element = this.element,
                href = element.href,
                regex = new RegExp('#' + prefix),
                path = element.pathname;

            if (this.$browser.isCrossDomain(href) || regex.test(href)) {
                return;
            }

            if (isEmpty(path)) {
                path = '/';
            }

            var utils = this.$browser.urlUtils(href || path);
            path = utils.pathname;

            var index = href.indexOf(path);

            if (index === -1) {
                if (!isEmpty(href)) {
                    return;
                }
                index = 0;
            }

            var start = href.substr(0, index), end = '#' + prefix + (path || '/');

            if (!isEmpty(start) && start[start.length - 1] !== '/') {
                end = '/' + end;
            }

            element.href = start + end;
        }
    }

    register.control('a', Anchor);
}
