module plat.web {
    /**
     * A class that deals with obtaining detailed information about an 
     * associated URL.
     */
    export class UrlUtils implements IUrlUtilsInstance {
        private static __urlUtilsElement: HTMLAnchorElement;
        private static __getQuery(search: string): IObject<string> {
            if (isEmpty(search)) {
                return <IObject<string>>{};
            }

            var split = search.split('&'),
                query: IObject<string> = {},
                length = split.length,
                item: Array<string>,
                define = (<observable.IContextManagerStatic>acquire(__ContextManagerStatic)).defineGetter;

            for (var i = 0; i < length; ++i) {
                item = split[i].split('=');

                define(query, item[0], item[1]);
            }

            return query;
        }

        /**
         * Obtains the base URL for doing STATE type routing
         * 
         * @param url The initial URL passed into the Browser.
         */
        private static __getBaseUrl(url: string): string {
            var colon = url.substring(url.indexOf(':')),
                next = colon.substring(colon.search(/\w+/));

            return url.substring(0, url.indexOf('/', url.indexOf(next))) + '/';
        }

        $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);
        $Document: Document = acquire(__Document);
        $Window: Window = acquire(__Window);
        $Compat: ICompat = acquire(__Compat);
        $Regex: expressions.IRegex = acquire(__Regex);
        $BrowserConfig: IBrowserConfig = acquire(__BrowserConfig);

        href: string;
        protocol: string;
        host: string;
        hostname: string;
        port: string;
        pathname: string;
        search: string;
        hash: string;
        username: string;
        password: string;
        origin: string;
        query: IObject<string>;

        /**
         * Handle the initial URL and get the base URL if necessary.
         */
        constructor() {
            var $config = this.$BrowserConfig;
            if (isEmpty($config.baseUrl)) {
                var url = this.$Window.location.href,
                    trimmedUrl = url.replace(this.$Regex.initialUrlRegex, '/');

                if ($config.routingType === $config.HASH) {
                    $config.baseUrl = trimmedUrl.replace(/#.*/, '');
                } else {
                    $config.baseUrl = UrlUtils.__getBaseUrl(trimmedUrl);
                }
            }
        }

        initialize(url: string): void {
            url = url || '';

            var element = UrlUtils.__urlUtilsElement ||
                (UrlUtils.__urlUtilsElement = this.$Document.createElement('a')),
                define = this.$ContextManagerStatic.defineGetter;

            // always make local urls relative to start page.
            if (url[0] === '/') {
                url = url.substr(1);
            }

            element.setAttribute('href', url);
            url = element.href;

            // We need to do this twice for cerain browsers (e.g. win8)
            element.setAttribute('href', url);
            url = element.href;

            var protocol = element.protocol ? element.protocol.replace(/:$/, '') : '';

            // Cordova adds //www for some urls, so we want to take those out.
            if (protocol.indexOf('http') === -1 && protocol.indexOf('ms-appx') === -1) {
                url = url.replace('//', '');
            }

            define(this, 'href', url, true, true);
            define(this, 'protocol', element.protocol ? element.protocol.replace(/:$/, '') : '', true, true);
            define(this, 'host', element.host, true, true);
            define(this, 'search', element.search ? element.search.replace(/^\?/, '') : '', true, true);
            define(this, 'hash', element.hash ? element.hash.replace(/^#/, '') : '', true, true);
            define(this, 'hostname', element.hostname, true, true);
            define(this, 'port', element.port, true, true);

            var path: string;

            if (!isEmpty(this.$BrowserConfig.baseUrl)) {
                path = url.replace(this.$BrowserConfig.baseUrl, '/');
            } else {
                path = (element.pathname.charAt(0) === '/')
                ? element.pathname
                : '/' + element.pathname;
            }

            define(this, 'pathname', path, true, true);
            define(this, 'query', UrlUtils.__getQuery(this.search), true, true);
        }

        toString(): string {
            return this.href;
        }
    }

    /**
     * The Type for referencing the '$UrlUtilsInstance' injectable as a dependency.
     */
    export function IUrlUtilsInstance(): IUrlUtilsInstance {
        return new UrlUtils();
    }

    register.injectable(__UrlUtilsInstance, IUrlUtilsInstance, null, __INSTANCE);

    /**
     * Defines an object that deals with obtaining detailed information about an 
     * associated URL.
     */
    export interface IUrlUtilsInstance {
        /**
         * The whole associated URL.
         */
        href: string;

        /**
         * The protocol scheme of the URL, including the final ':' of the associated URL.
         */
        protocol: string;

        /**
         * The hostname and port of the associated URL.
         */
        host: string;

        /**
         * The domain of the associated uRL.
         */
        hostname: string;

        /**
         * The port number of the associated URL.
         */
        port: string;

        /**
         * The additional path value in the associated URL preceded by a '/'.
         */
        pathname: string;

        /**
         * A '?' followed by the included parameters in the associated URL.
         */
        search: string;

        /**
         * A '#' followed by the included hash fragments in the associated URL.
         */
        hash: string;

        /**
         * The username specified before the domain name in the associated URL.
         */
        username?: string;

        /**
         * The password specified before the domain name in the associated URL.
         */
        password?: string;

        /**
         * The origin of the associated URL (its protocol, domain, and port).
         */
        origin?: string;

        /**
         * An object containing keyed query arguments from the associated URL.
         */
        query?: IObject<string>;

        /**
         * Initiializes this IUrlUtils and defines its properties using 
         * the input url.
         * 
         * @param url The input to associate with this IUrlUtils.
         */
        initialize(url: string): void;

        /**
         * toString function implementation.
         */
        toString(): string;
    }
}
