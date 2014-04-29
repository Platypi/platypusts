module plat.web {
    /**
     * Specifies configuration properties for the Browser 
     * injectable.
     */
    export class BrowserConfig implements IBrowserConfig {
        /**
         * Contains the constants for use with routingType.
         */
        routeType: IRouteType = {
            /**
             * Specifies that the application will not be doing 
             * url-based routing.
             */
            NONE: 'none',

            /**
             * Specifies that the application wants to use hash-based 
             * routing.
             */
            HASH: 'hash',

            /**
             * Specifies that the application wants to use the HTML5 
             * popstate method for managing routing. If the browser 
             * does not support HTML5 popstate events, hash routing 
             * will be used instead.
             * 
             * Note: In 'state' mode, the web server must be configured to 
             * route every url to the root url.
             */
            STATE: 'state'
        };

        /**
         * Allows you to define how your app will route. There are
         * three modes, 'none', 'hash', and 'state'. 
         * 
         * In 'none' mode, the application will not be responding to 
         * url changes.
         * 
         * In 'hash' mode, the application will use a hash prefix and 
         * all navigation will be managed with hash changes.
         * 
         * In 'state' mode, the application will use the 'popstate' 
         * event and will be able to manage routes. The web server 
         * must be configured to route every url to the root url if 
         * using 'state' mode.
         * 
         * The default mode is 'none'
         */
        routingType = this.routeType.NONE;

        /**
         * If routingType is set to 'hash', this value will be 
         * appended to the '#' at the beginning of every route. The 
         * default prefix is '', meaning each path will be '#/<path>'.
         */
        hashPrefix = '';

        /**
         * Specifies the base url used to normalize url routing.
         */
        baseUrl = '';
    }

    register.injectable('$browser.config', BrowserConfig);

    /**
     * Contains the constants for use with routingType.
     */
    export interface IRouteType {
        /**
         * Specifies that the application will not be doing 
         * url-based routing.
         */
        NONE: string;

        /**
         * Specifies that the application wants to use hash-based 
         * routing.
         */
        HASH: string;

        /**
         * Specifies that the application wants to use the HTML5 
         * popstate method for managing routing. If the browser 
         * does not support HTML5 popstate events, hash routing 
         * will be used instead.
         * 
         * Note: In 'state' mode, the web server must be configured to 
         * route every url to the root url.
         */
        STATE: string;
    }

    /**
     * Specifies configuration properties for the IBrowser 
     * injectable.
     */
    export interface IBrowserConfig {
        /**
         * Contains the constants for use with routingType.
         */
        routeType: IRouteType;

        /**
         * Allows you to define how your app will route. There are
         * three modes, 'none', 'hash', and 'state'. 
         * 
         * In 'none' mode, the application will not be responding to 
         * url changes.
         * 
         * In 'hash' mode, the application will use a hash prefix and 
         * all navigation will be managed with hash changes.
         * 
         * In 'state' mode, the application will use the 'popstate' 
         * event and will be able to manage routes. The web server 
         * must be configured to route every url to the root url if 
         * using 'state' mode.
         * 
         * The default mode is 'none'
         */
        routingType: string;

        /**
         * If routingType is set to 'hash', this value will be 
         * appended to the '#' at the beginning of every route. The 
         * default prefix is '!', meaning each path will be '#!/<path>'.
         */
        hashPrefix: string;

        /**
         * Specifies the base url used to normalize url routing.
         */
        baseUrl: string;
    }
}
