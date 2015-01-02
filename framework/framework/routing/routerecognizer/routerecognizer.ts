module plat.routing {
    'use strict';

    /**
     * @name RouteRecognizer
     * @memberof plat.routing
     * @kind class
     * 
     * @description
     * Assists in compiling and linking route strings. You can register route strings using 
     * a defined scheme, and it will compile the routes. When you want to match a route, it will 
     * find the associated compiled route and link it to the data given with the passed-in route.
     */
    export class RouteRecognizer {
        /**
         * @name $BaseSegmentFactory
         * @memberof plat.routing.RouteRecognizer
         * @kind property
         * @access public
         * 
         * @type {plat.routing.BaseSegment}
         * 
         * @description
         * Reference to the {@link plat.routing.BaseSegment|BaseSegment} injectable.
         */
        $BaseSegmentFactory: typeof BaseSegment = acquire(__BaseSegmentFactory);

        /**
         * @name $StateStatic
         * @memberof plat.routing.RouteRecognizer
         * @kind property
         * @access public
         * 
         * @type {plat.routing.State}
         * 
         * @description
         * Reference to the {@link plat.routing.State|State} injectable.
         */
        $StateStatic: typeof State = acquire(__StateStatic);

        /**
         * @name _rootState
         * @memberof plat.routing.RouteRecognizer
         * @kind property
         * @access protected
         * 
         * @type {plat.routing.State}
         * 
         * @description
         * A root state for the recognizer used to add next states.
         */
        protected _rootState: State = acquire(__StateInstance);

        /**
         * @name _namedRoutes
         * @memberof plat.routing.RouteRecognizer
         * @kind property
         * @access protected
         * 
         * @type {plat.IObject<plat.routing.INamedRoute>}
         * 
         * @description
         * All the named routes for this recognizer.
         */
        protected _namedRoutes: IObject<INamedRoute> = {};

        /**
         * @name register
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access public
         * 
         * @description
         * A method for registering routes to be identified later. Internally the 
         * routes will be compiled into a series of {@link plat.routing.State|states} 
         * which will be used to recognize the route later.
         * 
         * @param {Array<plat.routing.IRouteDelegate>} routes The routes to register.
         * @param {plat.routing.IRegisterOptions} options? An object containing options for the 
         * registered route.
         * 
         * @returns {void}
         */
        register(routes: Array<IRouteDelegate>, options?: IRegisterOptions): void {
            if (!isArray(routes)) {
                return;
            }

            var finalState = this._rootState,
                length = routes.length,
                regex: Array<string> = ['^'],
                types: ISegmentTypeCount = {
                    statics: 0,
                    dynamics: 0,
                    splats: 0
                },
                delegates: Array<IDelegateParameterNames> = [],
                allSegments: Array<BaseSegment> = [],
                segments: Array<BaseSegment>;

            for (var i = 0; i < length; ++i) {
                segments = this._parse(routes[i], delegates, types);
                allSegments = allSegments.concat(segments);
                finalState = this._compile(segments, finalState, regex);
            }

            finalState = this._finalize(finalState, regex);
            finalState.delegates = delegates;
            finalState.regex = new RegExp(regex.join('') + '$');
            finalState.types = types;

            if (isObject(options) && isString(options.name)) {
                this._namedRoutes[options.name] = {
                    segments: allSegments,
                    delegates: delegates
                };
            }
        }

        /**
         * @name recognize
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access public
         * 
         * @description
         * Searches for a match to the provided path. If a match is found, the path is deconstructed 
         * to populate a parameters object (if the registered route was a dynamic/splat route).
         * 
         * @param {string} path The path to recognize.
         * 
         * @returns {plat.routing.IRecognizeResult} If the path is recognized, the linked delegates will be 
         * returned.
         */
        recognize(path: string) {
            var isTrailingSlashDropped: boolean = false,
                solutions: Array<State> = [];

            path = this._addLeadingSlash(path);
            isTrailingSlashDropped = this._hasTrailingSlash(path);

            if (isTrailingSlashDropped) {
                path = path.substr(0, path.length - 1);
            }

            solutions = this._filter(this._findStates(path));
            return this._link(solutions[0], path, isTrailingSlashDropped);
        }

        /**
         * @name generate
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access public
         * 
         * @description
         * Finds a {@link plat.routing.INamedRoute|INamedRoute} and generates a string 
         * if it exists. Uses the parameters object to generate dynamic routes.
         * 
         * @param {string} name The named route with which to generate the route string.
         * @param {plat.IObject<string>} parameters The route parameters, in the case that the 
         * named route is dynamic.
         * 
         * @returns {string} The generated route.
         */
        generate(name: string, parameters?: IObject<string>): string {
            var route = this._namedRoutes[name],
                output = '',
                segments: Array<BaseSegment>,
                length: number;

            if (!isObject(route)) {
                return;
            }

            segments = route.segments;
            length = segments.length;

            for (var i = 0; i < length; i++) {
                var segment = segments[i];

                if (segment.type === __BASE_SEGMENT_TYPE) {
                    continue;
                }

                output += '/';
                output += segment.generate(parameters);
            }

            output = this._addLeadingSlash(output);

            return output;
        }

        /**
         * @name delegatesFor
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access public
         * 
         * @description
         * Finds the delegates for an {@link plat.routing.INamedRoute|INamedRoute}
         * 
         * @param {string} name The named route from which to get the delegates.
         * 
         * @returns {Array<IDelegateParameterNames>} The delegates for the named route.
         */
        delegatesFor(name: string): Array<IDelegateParameterNames> {
            var namedRoute = this._namedRoutes[name],
                delegates: Array<IDelegateParameterNames>;

            if (!isObject(namedRoute)) {
                return [];
            }

            delegates = namedRoute.delegates;

            if (!isArray(delegates)) {
                return [];
            }

            return delegates.slice(0);
        }

        /**
         * @name exists
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access public
         * 
         * @description
         * Determines whether or not an {@link plat.routing.INamedRoute|INamedRoute} is registered.
         * 
         * @param {string} name The named route to search for.
         * 
         * @returns {boolean} Whether or not the named route exists.
         */
        exists(name: string): boolean {
            return isObject(this._namedRoutes[name]);
        }

        /**
         * @name _finalize
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access protected
         * 
         * @description
         * Finalizes a compiled route, adding a final state if necessary. If the state is equal to the 
         * root state for the recognizer, a new state will be created. This is because the root state does not 
         * represent any route.
         * 
         * @param {plat.routing.State} state The state to finalize.
         * @param {string} regex The regular expression string built for the compiled routes. Used to recognize 
         * routes and associate them with the compiled routes.
         * 
         * @returns {plat.routing.State} The final state.
         */
        protected _finalize(state: State, regex: Array<string>) {
            if (state === this._rootState) {
                state = state.add({
                    validCharacters: '/'
                });
                regex.push('/');
            }

            return state;
        }

        /**
         * @name _parse
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access protected
         * 
         * @description
         * Parses a route into different {@link plat.routing.BaseSegment|segments};
         * 
         * @param {plat.routing.IRouteDelegate} route The route options to be parsed.
         * @param {Array<plat.routing.IDelegateParameterNames>} delegates The delegates and associated names for mapping parameters.
         * @param {plat.routing.ISegmentTypeCount} types A count of all the segment types in the route.
         * 
         * @returns {Array<plat.routing.BaseSegment>} The segments created for the route.
         */
        protected _parse(route: IRouteDelegate, delegates: Array<IDelegateParameterNames>, types: ISegmentTypeCount): Array<BaseSegment> {
            var names: Array<string> = [];

            delegates.push({
                delegate: route.delegate,
                names: names
            });

            return this.$BaseSegmentFactory.parse(route.pattern, names, types);
        }

        /**
         * @name _compile
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access protected
         * 
         * @description
         * Compiles a list of segments into a series of {@link plat.routing.State|states}.
         * 
         * @param {Array<plat.routing.BaseSegment>} segments The segments to compile.
         * @param {plat.routing.State} state The initial state used to compile.
         * @param {Array<string>} regex A regular expression string to build in order to match the segments.
         * 
         * @returns {plat.routing.State} The final state obtained from compilation.
         */
        protected _compile(segments: Array<BaseSegment>, state: State, regex: Array<string>): State {
            var length = segments.length,
                compile = this.$StateStatic.compile,
                segment: BaseSegment;

            for (var i = 0; i < length; ++i) {
                segment = segments[i];

                if (segment.type === __BASE_SEGMENT_TYPE) {
                    continue;
                }

                state = state.add({ validCharacters: '/' });
                state = compile(segment, state);
                regex.push('/' + segment.regex);
            }

            return state;
        }

        /**
         * @name _trimLeadingSlash
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access protected
         * 
         * @description
         * Adds a leading slash to the passed-in string if necessary.
         * 
         * @param {string} path The path to which to add the slash.
         * 
         * @returns {string} The path, with leading slash added.
         */
        protected _addLeadingSlash(path: string): string {
            path = decodeURI(path);

            if (path[0] !== '/') {
                path = '/' + path;
            }

            return path;
        }

        /**
         * @name _hasTrailingSlash
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access protected
         * 
         * @description
         * Checks for a trailing slash on a given string.
         * 
         * @param {string} path The path on which to look for a trailing slash.
         * 
         * @returns {boolean} Whether or not the path has a trailing slash
         */
        protected _hasTrailingSlash(path: string): boolean {
            var length = path.length;

            return length > 1 && path[length - 1] === '/';
        }

        /**
         * @name _findStates
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access protected
         * 
         * @description
         * Finds the compiled states for a given path.
         * 
         * @param {string} path The path with which to look for compiled states.
         * 
         * @returns {Array<plat.routing.State>} The states associated with the given path.
         */
        protected _findStates(path: string): Array<State> {
            var states: Array<State> = [
                this._rootState
            ],
                recognize = this.$StateStatic.recognize,
                length = path.length;

            for (var i = 0; i < length; ++i) {
                states = recognize(path[i], states);

                if (states.length === 0) {
                    break;
                }
            }

            return states;
        }

        /**
         * @name _filter
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access protected
         * 
         * @description
         * Filters out states with no delegates, and sorts the states.
         * 
         * @param {Array<plat.routing.State>} states The states to filter.
         * 
         * @returns {Array<plat.routing.State>} The filtered and sorted states
         */
        protected _filter(states: Array<State>): Array<State> {
            var length = states.length,
                solutions: Array<State> = [],
                state: State;

            for (var i = 0; i < length; ++i) {
                state = states[i];
                if (isArray(state.delegates)) {
                    solutions.push(state);
                }
            }

            return this.$StateStatic.sort(solutions);
        }

        /**
         * @name _link
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access protected
         * 
         * @description
         * Links a state to a path, producing an {@link plat.routing.IRecognizeResult|IRecognizeResult}.
         * 
         * @param {plat.routing.State} states The state to link.
         * @param {string} path The path to link.
         * @param {boolean} isTrailingSlashDropped Whether or not the trailing slash is dropped from the path.
         * 
         * @returns {plat.routing.IRecognizeResult} The linked result.
         */
        protected _link(state: State, path: string, isTrailingSlashDropped: boolean): IRecognizeResult {
            if (isObject(state) && isArray(state.delegates)) {
                if (isTrailingSlashDropped && this._isDynamic(state)) {
                    path = path + '/';
                }

                return this.$StateStatic.link(state, path);
            }
        }

        /**
         * @name _isDynamic
         * @memberof plat.routing.RouteRecognizer
         * @kind function
         * @access protected
         * 
         * @description
         * Determines whether or not the state is dynamic.
         * 
         * @param {plat.routing.State} states The state used to determine if it is dynamic or not.
         * 
         * @returns {boolean} Whether or not the state is dynamic.
         */
        protected _isDynamic(state: State): boolean {
            return state.regex.source.slice(-5) === '(.+)$';
        }
    }

    /**
     * The Type for referencing the '$RouteRecognizerInstance' injectable as a dependency.
     */
    export function IRouteRecognizerInstance(): RouteRecognizer {
        return new RouteRecognizer();
    }

    plat.register.injectable(__RouteRecognizerInstance, IRouteRecognizerInstance, null, __INSTANCE);

    /**
     * @name IRecognizeResult
     * @memberof plat.routing
     * @kind interface
     * 
     * @extends {Array<plat.routing.IDelegateInfo>}
     * 
     * @description
     * An Array of delegate information for a recognized route.
     */
    export interface IRecognizeResult extends Array<IDelegateInfo> { };

    /**
     * @name IDelegateInfo
     * @memberof plat.routing
     * @kind interface
     * 
     * @description
     * Information for a recognized route segment. Contains the registered 
     * delegate, as well as a parameters object with key/value pairs for a 
     * dynamic route segment.
     */
    export interface IDelegateInfo {
        /**
         * @name delegate
         * @memberof plat.routing.IDelegateInfo
         * @kind property
         * 
         * @type {any}
         * 
         * @description
         * A delegate can be anything. It is an object that will provide functionality 
         * for a route segment.
         */
        delegate: any;

        /**
         * @name parameters
         * @memberof plat.routing.IDelegateInfo
         * @kind property
         * 
         * @type {any}
         * 
         * @description
         * The parameters for a route segment. If the segment is a dynamic or splat 
         * segment, then the parameters will be a key/value pair object with the associated 
         * variables.
         */
        parameters: any;

        /**
         * @name isDynamic
         * @memberof plat.routing.IDelegateInfo
         * @kind property
         * 
         * @type {boolean}
         * 
         * @description
         * States whether or not the register delegate is for a dynamic/splat route. If 
         * this value is true, then the parameters object will be filled with key/value pairs 
         * associated to the registered route parameters.
         */
        isDynamic: boolean;
    }

    /**
     * @name INamedRoute
     * @memberof plat.routing
     * @kind interface
     * 
     * @description
     * Contains information about a named route. Created when you register a route with an associated 
     * name.
     */
    export interface INamedRoute {
        /**
         * @name segments
         * @memberof plat.routing.INamedRoute
         * @kind property
         * 
         * @type {Array<plat.routing.BaseSegment>}
         * 
         * @description
         * All the segments for the named route.
         */
        segments: Array<BaseSegment>;

        /**
         * @name delegates
         * @memberof plat.routing.INamedRoute
         * @kind property
         * 
         * @type {Array<plat.routing.IDelegateParameterNames>}
         * 
         * @description
         * All the delegates for the named route.
         */
        delegates: Array<IDelegateParameterNames>;
    }

    /**
     * @name IRouteDelegate
     * @memberof plat.routing
     * @kind interface
     * 
     * @description
     * Used during route registeration to specify a delegate object to associate 
     * with a route.
     */
    export interface IRouteDelegate {
        /**
         * @name pattern
         * @memberof plat.routing.IRouteDelegate
         * @kind property
         * 
         * @type {string}
         * 
         * @description
         * The pattern to match for the route, accepts dynamic routes as well as splat routes.
         * 
         * @example
         * /posts/new
         * 
         * @example
         * /posts/:id
         * 
         * @example
         * /posts/*path
         */
        pattern: string;

        /**
         * @name delegate
         * @memberof plat.routing.IRouteDelegate
         * @kind property
         * 
         * @type {any}
         * 
         * @description
         * A delegate object which should provide functionality for the associated pattern. It can be anything, 
         * it is up to the owner of the registered route to know what to do with the delegate.
         */
        delegate: any;
    }

    /**
     * @name IRegisterOptions
     * @memberof plat.routing
     * @kind interface
     * 
     * @description
     * Options that you can pass in when registering routes.
     */
    export interface IRegisterOptions {
        /**
         * @name name
         * @memberof plat.routing.IRegisterOptions
         * @kind property
         * 
         * @type {string}
         * 
         * @description
         * Allows you to assign a name to a registered route.
         */
        name?: string;
    }
}
