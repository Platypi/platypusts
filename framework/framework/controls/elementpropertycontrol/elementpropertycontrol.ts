module plat.controls {
    export class ElementPropertyControl extends SetAttributeControl {
        /**
         * The function for setting the corresponding 
         * attribute {property} value to the evaluated expression.
         */
        setter() {
            var element = this.element,
                elementProperty = this.property,
                expression = this.attributes[this.attribute];

            if (isEmpty(expression) || isNull(element)) {
                return;
            }

            if (!isUndefined(element[elementProperty])) {
                element[elementProperty] = expression;
            }
        }
    }

    export class Href extends ElementPropertyControl {
        /**
         * The corresponding attribute to set on the element.
         */
        property: string = 'href';
        $browserConfig: web.IBrowserConfig = acquire('$browser.config');
        $browser: web.IBrowser = acquire('$browser');
        element: HTMLAnchorElement;
        loaded() {
            var config = this.$browserConfig;

            if (config.routingType !== config.routeType.HASH) {
                return;
            }

            this.attribute = camelCase(this.type);

            var prefix = config.hashPrefix || '',
                attribute = this.attributes[this.attribute],
                href = this.$browser.urlUtils(attribute).toString(),
                regex = new RegExp('#' + prefix),
                path = attribute;

            if (this.$browser.isCrossDomain(href)) {
                this.attributes[this.attribute] = href;
                super.loaded();
                return;
            } else if (regex.test(href)) {
                super.loaded();
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

            this.attributes[this.attribute] = start + end;
            super.loaded();
        }
    }

    export class Src extends ElementPropertyControl {
        /**
         * The corresponding attribute to set on the element.
         */
        property: string = 'src';
    }

    register.control('plat-href', Href);
    register.control('plat-src', Src);
}
