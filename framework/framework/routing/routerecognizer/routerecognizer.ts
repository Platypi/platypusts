module plat.routing {
    /**
     * @name State
     * @memberof plat.routing
     * @kind class
     * 
     * @description
     * A State represents a route segment. It contains a specification for the 
     * acceptable characters in the segment. It also has reference to acceptable 
     * sub-states.
     */
    export class State {
        static addSegment(state: State, segment: BaseSegment) {
            segment.forEachCharacter((char) => {
                state = state.add(char);
            });

            return state;
        }

        static getResult(state: State, path: string) {
            var delegates: Array<IDelegateNames> = state.delegates,
                regex = state.regex,
                length = delegates.length,
                matches = path.match(regex),
                matchIndex = 1,
                result: IRecognizeResult = [],
                names: Array<string>,
                parameters: any,
                j: number,
                jLength: number,
                delegate: IDelegateNames;

            for (var i = 0; i < length; ++i) {
                delegate = delegates[i];
                names = delegate.names;
                parameters = {};

                for (j = 0, jLength = names.length; j < jLength; ++j) {
                    parameters[names[j]] = matches[matchIndex++];
                }

                result.push({
                    delegate: delegate.delegate,
                    parameters: parameters,
                    isDynamic: jLength > 0
                });
            }

            return result;
        }

        static recognize(states: Array<State>, char: string) {
            var nextStates: Array<State> = [],
                length = states.length,
                state: State;

            for (var i = 0; i < length; ++i) {
                state = states[i];

                nextStates = nextStates.concat(state._match(char));
            }

            return nextStates;
        }

        static sort(states: Array<State>) {
            if (!isArray(states)) {
                return states;
            }

            var aTypes: ISegmentTypeCount,
                aSplats: number,
                aStatics: number,
                aDynamics: number,
                bTypes: ISegmentTypeCount,
                bSplats: number,
                bStatics: number,
                bDynamics: number;

            return states.sort((a, b) => {
                aTypes = a.types;
                bTypes = b.types;
                aSplats = aTypes.splats;
                bSplats = bTypes.splats;

                if (aSplats !== bSplats) {
                    return aSplats - bSplats;
                }

                aStatics = aTypes.statics;
                aDynamics = aTypes.dynamics;
                bStatics = bTypes.statics;
                bDynamics = bTypes.dynamics;

                if (aSplats > 0) {
                    if (aStatics !== bStatics) {
                        return bStatics - aStatics;
                    }

                    if (aDynamics !== bDynamics) {
                        return bDynamics - aDynamics;
                    }
                }

                if (aDynamics !== bDynamics) {
                    return aDynamics - bDynamics;
                }

                if (aStatics !== bStatics) {
                    return bStatics = aStatics;
                }

                return 0;
            });
        }

        nextStates: Array<State>;
        specification: IRouteSegmentSpecification;
        delegates: Array<IDelegateNames>;
        regex: RegExp;
        types: ISegmentTypeCount;

        constructor() {
            this.initialize();
        }

        initialize(spec?: IRouteSegmentSpecification) {
            this.specification = spec;
            this.nextStates = [];
        }

        add(spec: IRouteSegmentSpecification): State {
            var state = this._find(spec);

            if (isObject(state)) {
                return state;
            }

            state = new State();
            state.initialize(spec);

            this.nextStates.push(state);

            if (spec.repeat) {
                state.nextStates.push(state);
            }

            return state;
        }

        protected _match(char: string) {
            var matches: Array<State> = [],
                spec: IRouteSegmentSpecification,
                chars: string;

            this._someChildren((child) => {
                spec = child.specification;
                if (isString(chars = spec.validCharacters) && chars.indexOf(char) > -1) {
                    matches.push(child);
                } else if (isString(chars = spec.invalidCharacters) && chars.indexOf(char) === -1) {
                    matches.push(child);
                }
            });

            return matches;
        }

        protected _find(spec: IRouteSegmentSpecification): State {
            var validChars = spec.validCharacters,
                invalidChars = spec.invalidCharacters,
                s: IRouteSegmentSpecification,
                found: State;

            this._someChildren((child) => {
                s = child.specification;

                if (s.validCharacters === validChars &&
                    s.invalidCharacters === invalidChars) {
                    found = child;
                    return true;
                }
            });

            return found;
        }

        protected _someChildren(callback: (child: State) => void) {
            var nextStates = this.nextStates,
                length = nextStates.length;

            for (var i = 0; i < length; ++i) {
                if (callback(nextStates[i])) {
                    return;
                }
            }
        }
    }

    export interface IRouteSegmentSpecification {
        invalidCharacters?: string;
        validCharacters?: string;
        repeat?: boolean;
    }

    export class RouteRecognizer {
        rootState = new State();

        constructor() { }

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
     * @name ISegmentTypes
     * @memberof plat.routing
     * @kind interface
     * 
     * @description
     * Contains the total number of each segment type for a registered route. 
     * Used to sort recognized route solutions for more accurate route 
     * matching.
     */
    export interface ISegmentTypeCount {
        /**
         * @name statics
         * @memberof plat.routing.ISegmentTypeCount
         * @kind property
         * 
         * @type {number}
         * 
         * @description
         * A count of how many static segments exist in the route.
         */
        statics: number;

        
        /**
         * @name dynamics
         * @memberof plat.routing.ISegmentTypeCount
         * @kind property
         * 
         * @type {number}
         * 
         * @description
         * A count of how many dynamic segments exist in the route.
         */
        dynamics: number;

        
        /**
         * @name splats
         * @memberof plat.routing.ISegmentTypeCount
         * @kind property
         * 
         * @type {number}
         * 
         * @description
         * A count of how many splat segments exist in the route.
         */
        splats: number;
    }

    /**
     * @name IDelegateNames
     * @memberof plat.routing
     * @kind interface
     * 
     * @description
     * Contains a delegate and its associated segment names. Used for populating 
     * the parameters in an {@link plat.routing.IDelegateInfo|IDelegateInfo} object.
     */
    export interface IDelegateNames {
        /**
         * @name delegate
         * @memberof plat.routing.IDelegateNames
         * @kind property
         * 
         * @type {any}
         * 
         * @description
         * The delegate for a registered route
         */
        delegate: any;

        /**
         * @name names
         * @memberof plat.routing.IDelegateNames
         * @kind property
         * 
         * @type {Array<string>}
         * 
         * @description
         * Contains the parameter names for a given delegate
         */
        names: Array<string>;
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
