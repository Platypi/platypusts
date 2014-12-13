module plat.routing {
    export class RouteRecognizer {
        $BaseSegmentFactory: typeof BaseSegment = acquire(__BaseSegmentFactory);
        $StateStatic: typeof State = acquire(__StateStatic);

        rootState: State = acquire(__StateInstance);

        register(routes: Array<IRegisteredRouteOptions>) {
            if (!isArray(routes)) {
                return;
            }

            var finalState = this.rootState,
                length = routes.length,
                regex: Array<string> = ['^'],
                types: ISegmentTypeCount = {
                    statics: 0,
                    dynamics: 0,
                    splats: 0
                },
                delegates: Array<IDelegateNames> = [],
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
        }

        recognize(path: string) {
            var isTrailingSlashDropped: boolean = false,
                solutions: Array<State> = [];

            path = this._normalizePath(path);
            isTrailingSlashDropped = this._hasTrailingSlash(path);

            if (isTrailingSlashDropped) {
                path = path.substr(0, path.length - 1);
            }

            solutions = this._filter(this._states(path));
            return this._findResult(solutions[0], path, isTrailingSlashDropped);
        }

        protected _finalize(state: State, regex: Array<string>) {
            if (state === this.rootState) {
                state = state.add({
                    validCharacters: '/'
                });
                regex.push('/');
            }

            return state;
        }

        protected _parse(route: IRegisteredRouteOptions, delegates: Array<IDelegateNames>, types: ISegmentTypeCount) {
            var names: Array<string> = [];

            delegates.push({
                delegate: route.delegate,
                names: names
            });

            return this.$BaseSegmentFactory.parse(route.pattern, names, types);
        }

        protected _compile(segments: Array<BaseSegment>, state: State, regex: Array<string>) {
            var length = segments.length,
                addSegment = this.$StateStatic.addSegment,
                segment: BaseSegment;

            for (var i = 0; i < length; ++i) {
                segment = segments[i];

                if (segment.type === __BASE_SEGMENT_TYPE) {
                    continue;
                }

                state = state.add({ validCharacters: '/' });
                state = addSegment(state, segment);
                regex.push('/' + segment.regex);
            }

            return state;
        }

        protected _normalizePath(path: string) {
            path = decodeURI(path);

            if (path[0] !== '/') {
                path = '/' + path;
            }

            return path;
        }

        protected _hasTrailingSlash(path: string) {
            var length = path.length;

            return length > 1 && path[length - 1] === '/';
        }

        protected _states(path: string) {
            var states: Array<State> = [
                this.rootState
            ],
                recognize = this.$StateStatic.recognize,
                length = path.length;

            for (var i = 0; i < length; ++i) {
                states = recognize(states, path[i]);

                if (states.length === 0) {
                    break;
                }
            }

            return states;
        }

        protected _filter(states: Array<State>) {
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

        protected _findResult(state: State, path: string, isTrailingSlashDropped: boolean) {
            if (isObject(state) && isArray(state.delegates)) {
                if (isTrailingSlashDropped && this._isDynamic(state)) {
                    path = path + '/';
                }

                return this.$StateStatic.getResult(state, path);
            }
        }

        protected _isDynamic(state: State) {
            return state.regex.source.slice(-5) === '(.+)$';
        }
    }

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
     * @name IRegisteredRouteOptions
     * @memberof plat.routing
     * @kind interface
     * 
     * @description
     * Used during route registeration to specify a delegate object to associate 
     * with a route.
     */
    export interface IRegisteredRouteOptions {
        /**
         * @name pattern
         * @memberof plat.routing.IRegisteredRouteOptions
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
         * @memberof plat.routing.IRegisteredRouteOptions
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
}
