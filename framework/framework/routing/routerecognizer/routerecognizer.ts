module plat.routing {
    export class RouteRecognizer {
        rootState = new State();

        register(routes: Array<IRegisteredRouteOptions>) {
            if (!isArray(routes)) {
                return;
            }

            var currentState = this.rootState,
                length = routes.length,
                regex = '^',
                types: ISegmentTypeCount = {
                    statics: 0,
                    dynamics: 0,
                    splats: 0
                },
                delegates: Array<any> = [],
                allSegments: Array<BaseSegment> = [],
                isEmpty = true,
                route: IRegisteredRouteOptions,
                segments: Array<BaseSegment>,
                segment: BaseSegment,
                names: Array<string>;

            for (var i = 0; i < length; ++i) {
                route = routes[i];
                names = [];
                segments = BaseSegment.parse(route.pattern, names, types);

                allSegments = allSegments.concat(segments);

                for (var j = 0, jLength = segments.length; j < jLength; ++j) {
                    segment = segments[j];

                    if (segment.type === __BASE_SEGMENT_TYPE) {
                        continue;
                    }

                    isEmpty = false;

                    currentState = currentState.add({ validCharacters: '/' });
                    regex += '/';

                    currentState = State.addSegment(currentState, segment);
                    regex += segment.regex;
                }

                delegates.push({
                    delegate: route.delegate,
                    names: names
                });
            }

            if (isEmpty) {
                currentState = currentState.add({
                    validCharacters: '/'
                });
                regex += '/';
            }

            currentState.delegates = delegates;
            currentState.regex = new RegExp(regex + '$');
            currentState.types = types;
        }

        recognize(path: string) {
            var states: Array<State> = [
                this.rootState
            ],
                isTrailingSlashDropped: boolean = false,
                i: number,
                length: number,
                state: State,
                solutions: Array<State> = [];

            path = decodeURI(path);

            if (path[0] !== '/') {
                path = '/' + path;
            }

            length = path.length;

            if (length > 1 && path[length - 1] === '/') {
                path = path.substr(0, length - 1);
                isTrailingSlashDropped = true;
            }

            length = path.length;

            for (i = 0; i < length; ++i) {
                states = State.recognize(states, path[i]);

                if (states.length === 0) {
                    break;
                }
            }

            length = states.length;

            for (i = 0; i < length; ++i) {
                state = states[i];
                if (isArray(state.delegates)) {
                    solutions.push(state);
                }
            }

            states = State.sort(solutions);

            state = solutions[0];
            if (isObject(state) && isArray(state.delegates)) {
                if (isTrailingSlashDropped && state.regex.source.slice(-5) === '(.+)$') {
                    path = path + '/';
                }

                return State.getResult(state, path);
            }
        }
    }

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
