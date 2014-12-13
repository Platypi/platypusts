module plat.routing {
    /**
     * @name State
     * @memberof plat.routing
     * @kind class
     * 
     * @description
     * Route segment matching is done using a state machine. Each state contains 
     * a specification indicating valid and invalid characters. Each State has a 
     * list of potential next states. When matching a route segment you start with 
     * a root state and then iteratively match next states until you complete the 
     * segment or invalidate the segment.
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

                // Check for valid characters first
                chars = spec.validCharacters;
                if (isString(chars) && chars.indexOf(char) > -1) {
                    matches.push(child);
                    return;
                }

                // Check for no invalid characters
                chars = spec.invalidCharacters;
                if (isString(chars) && chars.indexOf(char) === -1) {
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

    export function IStateStatic(): typeof State {
        return State;
    }

    plat.register.injectable(__StateStatic, IStateStatic, null, __STATIC);

    export function IStateInstance(): State {
        return new State();
    }

    plat.register.injectable(__StateInstance, IStateInstance, null, __INSTANCE);

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
}
