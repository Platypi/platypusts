module plat.routing {

    var specialCharacters = [
            '/', '.', '*', '+', '?', '|',
            '(', ')', '[', ']', '{', '}', '\\'
        ],
        escapeRegex = new RegExp('(\\' + specialCharacters.join('|\\') + ')', 'g');

    export class BaseSegment {
        type: string = 'base';
        name: string = '';
        regex: string = '';

        protected _specification: IRouteSegmentSpecification;

        constructor(name?: string) {
            this.name = name;
        }

        forEachCharacter(callback: (spec: IRouteSegmentSpecification) => void) {
            if (isObject(this._specification)) {
                callback(this._specification);
            }
        }

        generate(params?: any) {
            return this.name;
        }
    }

    export class StaticSegment extends BaseSegment {
        type: string = 'static';
        regex: string = this.name.replace(escapeRegex, '\\$1');

        forEachCharacter(callback: (spec: IRouteSegmentSpecification) => void) {
            var name: string = this.name,
                length = name.length;

            for (var i = 0; i < length; ++i) {
                callback({ validCharacters: name[i] });
            }
        }
    }

    export class VariableSegment extends BaseSegment {
        type: string = 'variable';
        generate(params?: any) {
            if (isObject(params)) {
                return params[this.name];
            }
        }
    }

    export class WildcardSegment extends VariableSegment {
        type: string = 'wildcard';
        regex: string = '(.+)';
        protected _specification: IRouteSegmentSpecification = {
            invalidCharacters: '',
            repeat: true
        };
    }

    export class DynamicSegment extends VariableSegment {
        type: string = 'dynamic';
        regex: string = '([^/]+)';
        protected _specification: IRouteSegmentSpecification = {
            invalidCharacters: '/',
            repeat: true
        };
    }

    var dynamicSegmentRegexp = /^:([^\/]+)$/,
        wildcardSegmentRegexp = /^\*([^\/]+)$/;

    function parse(route: string, names: Array<string>, types: ISegmentTypes) {
        if (route[0] === '/') {
            route = route.slice(1);
        }

        var segments: Array<string> = route.split('/'),
            length = segments.length,
            results: Array<BaseSegment> = [],
            segment: string,
            match: RegExpMatchArray;

        for (var i = 0; i < length; ++i) {
            segment = segments[i];

            if (segment === '') {
                results.push(new BaseSegment());
            } else if (match = segment.match(dynamicSegmentRegexp)) {
                results.push(new DynamicSegment(match[1]));
                names.push(match[1]);
                types.dynamics++;
            } else if (match = segment.match(wildcardSegmentRegexp)) {
                results.push(new WildcardSegment(match[1]));
                names.push(match[1]);
                types.wildcards++;
            } else {
                results.push(new StaticSegment(segment));
                types.statics++;
            }
        }

        return results;
    }

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
        nextStates: Array<State>;
        specification: IRouteSegmentSpecification;
        delegates: Array<IDelegateInfo>;
        regex: RegExp;
        types: ISegmentTypes;

        constructor() {
            this.initialize();
        }

        initialize(spec?: IRouteSegmentSpecification) {
            this.specification = spec;
            this.nextStates = [];
        }

        getNextState(spec: IRouteSegmentSpecification): State {
            var nextStates = this.nextStates,
                length = nextStates.length,
                validChars = spec.validCharacters,
                invalidChars = spec.invalidCharacters,
                child: State,
                specification: IRouteSegmentSpecification;

            for (var i = 0; i < length; ++i) {
                child = nextStates[i];
                specification = child.specification;

                if (specification.validCharacters === validChars &&
                    specification.invalidCharacters === invalidChars) {
                    return child;
                }
            }
        }

        addNextState(spec: IRouteSegmentSpecification): State {
            var state = this.getNextState(spec);

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

        match(char: string) {
            var nextStates = this.nextStates,
                length = nextStates.length,
                child: State,
                spec: IRouteSegmentSpecification,
                chars: string,
                matches: Array<State> = [];

            for (var i = 0; i < length; ++i) {
                child = nextStates[i];
                spec = child.specification;

                if (isString(chars = spec.validCharacters) && chars.indexOf(char) > -1) {
                    matches.push(child);
                } else if (isString(chars = spec.invalidCharacters) && chars.indexOf(char) === -1) {
                    matches.push(child);
                }
            }

            return matches;
        }
    }

    export interface IRouteSegmentSpecification {
        invalidCharacters?: string;
        validCharacters?: string;
        repeat?: boolean;
    }

    function sortStates(states: Array<State>) {
        if (!isArray(states)) {
            return states;
        }

        var aTypes: ISegmentTypes,
            aWildcards: number,
            aStatics: number,
            aDynamics: number,
            bTypes: ISegmentTypes,
            bWildcards: number,
            bStatics: number,
            bDynamics: number;


        return states.sort((a, b) => {
            aTypes = a.types;
            bTypes = b.types;
            aWildcards = aTypes.wildcards;
            bWildcards = bTypes.wildcards;

            if (aWildcards !== bWildcards) {
                return aWildcards - bWildcards;
            }

            aStatics = aTypes.statics;
            aDynamics = aTypes.dynamics;
            bStatics = bTypes.statics;
            bDynamics = bTypes.dynamics;

            if (aWildcards > 0) {
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

    function recognizeCharacter(states: Array<State>, char: string) {
        var nextStates: Array<State> = [],
            length = states.length,
            state: State;

        for (var i = 0; i < length; ++i) {
            state = states[i];

            nextStates = nextStates.concat(state.match(char));
        }

        return nextStates;
    }

    function findDelegate(state: State, path: string) {
        var delegates: Array<IDelegateInfo> = state.delegates,
            regex = state.regex,
            length = delegates.length,
            matches = path.match(regex),
            matchIndex = 1,
            results: IRecognizeResult = [],
            names: Array<string>,
            params: any,
            j: number,
            jLength: number,
            delegate: IDelegateInfo;

        for (var i = 0; i < length; ++i) {
            delegate = delegates[i];
            names = delegate.names;
            params = {};

            for (j = 0, jLength = names.length; j < jLength; ++j) {
                params[names[j]] = matches[matchIndex++];
            }

            results.push({
                delegate: delegate.delegate,
                params: params,
                isDynamic: jLength > 0
            });
        }

        return results;
    }

    function addSegment(currentState: State, segment: BaseSegment) {
        segment.forEachCharacter((char) => {
            currentState = currentState.addNextState(char);
        });

        return currentState;
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
                types: ISegmentTypes = {
                    statics: 0,
                    dynamics: 0,
                    wildcards: 0
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
                segments = parse(route.pattern, names, types);

                allSegments = allSegments.concat(segments);

                for (var j = 0, jLength = segments.length; j < jLength; ++j) {
                    segment = segments[j];

                    if (segment.type === 'base') {
                        continue;
                    }

                    isEmpty = false;

                    currentState = currentState.addNextState({ validCharacters: '/' });
                    regex += '/';

                    currentState = addSegment(currentState, segment);
                    regex += segment.regex;
                }

                delegates.push({
                    delegate: route.delegate,
                    names: names
                });
            }

            if (isEmpty) {
                currentState = currentState.addNextState({
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
                states = recognizeCharacter(states, path[i]);

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

            states = sortStates(solutions);

            state = solutions[0];
            if (isObject(state) && isArray(state.delegates)) {
                if (isTrailingSlashDropped && state.regex.source.slice(-5) === '(.+)$') {
                    path = path + '/';
                }

                return findDelegate(state, path);
            }
        }
    }

    export interface ISegmentTypes {
        statics: number;
        dynamics: number;
        wildcards: number;
    }

    export interface IDelegateInfo {
        delegate: any;
        names: Array<string>;
    }

    export interface IRecognizeResult extends Array<{
        delegate: any;
        params: any;
        isDynamic: boolean;
    }> { };

    /**
     * @name RegisteredRouteOptions
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
         * @memberof plat.routing
         * @kind property
         * 
         * @type {string}
         * 
         * @description
         * The pattern to match for the route, accepts dynamic routes as well as splat/wildcard routes.
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
         * @memberof plat.routing
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
