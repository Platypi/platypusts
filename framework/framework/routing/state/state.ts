module plat.routing {
    'use strict';

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
        /**
         * @name nextStates
         * @memberof plat.routing.State
         * @kind property
         * @access public
         * 
         * @type {Array<plat.routing.State>}
         * 
         * @description
         * The possible next states for the current state.
         */
        nextStates: Array<State>;

        /**
         * @name specification
         * @memberof plat.routing.State
         * @kind property
         * @access public
         * 
         * @type {Array<plat.routing.ICharacterSpecification>}
         * 
         * @description
         * The {@link plat.routing.ICharacterSpecification|specification} for the 
         * assigned route segment for this state.
         */
        specification: ICharacterSpecification;

        /**
         * @name delegates
         * @memberof plat.routing.State
         * @kind property
         * @access public
         * 
         * @type {Array<plat.routing.IDelegateParameterNames>}
         * 
         * @description
         * The associated {@link plat.routing.IDelegateParameterNames|delegate} objects for this 
         * state, with their parameter names.
         */
        delegates: Array<IDelegateParameterNames>;

        /**
         * @name regex
         * @memberof plat.routing.State
         * @kind property
         * @access public
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression to match this state to a path.
         */
        regex: RegExp;

        /**
         * @name types
         * @memberof plat.routing.State
         * @kind property
         * @access public
         * 
         * @type {Array<plat.routing.ISegmentTypeCount>}
         * 
         * @description
         * The totals for the different segment {@link plat.routing.ISegmentTypeCount|types} 
         * for this state.
         */
        types: ISegmentTypeCount;

        /**
         * @name compile
         * @memberof plat.routing.State
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Compiles a {@link plat.routing.BaseSegment|segment} into a state tree.
         * 
         * @param {plat.routing.BaseSegment} segment The segment to compile.
         * @param {plat.routing.State} state The initial state with which to start compilation.
         * 
         * @returns {plat.routing.State} The final state reached for the compiled segment.
         */
        static compile(segment: BaseSegment, state: State): State {
            return segment.reduceCharacters((s, char) => {
                return s.add(char);
            }, state);
        }

        /**
         * @name link
         * @memberof plat.routing.State
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Links a path to a compiled state, and returns the {@link plat.routing.IRecognizeResult|result}.
         * 
         * @param {plat.routing.State} state The state with which to link the result.
         * @param {string} path The path to link to the given state.
         * 
         * @returns {plat.routing.IRecognizeResult} The result from the linking.
         */
        static link(state: State, path: string): IRecognizeResult {
            var delegates: Array<IDelegateParameterNames> = state.delegates,
                regex = state.regex,
                length = delegates.length,
                matches = path.match(regex),
                matchIndex = 1,
                result: IRecognizeResult = [],
                names: Array<string>,
                parameters: any,
                j: number,
                jLength: number,
                delegate: IDelegateParameterNames;

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

        /**
         * @name recognize
         * @memberof plat.routing.State
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Finds all the next states for a given character.
         * 
         * @param {string} char The character used to match next states.
         * @param {Array<plat.routing.State>} states The states with which to match the character.
         * 
         * @returns {Array<plat.routing.State>} The matched next states.
         */
        static recognize(char: string, states: Array<State>): Array<State> {
            var nextStates: Array<State> = [],
                length = states.length,
                state: State;

            for (var i = 0; i < length; ++i) {
                state = states[i];

                nextStates = nextStates.concat(state.match(char));
            }

            return nextStates;
        }

        /**
         * @name sort
         * @memberof plat.routing.State
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Sorts states by statics/dynamics/splats.
         * 
         * Favors less splat (*) segments 
         * Favors less dynamic (:) segments
         * Favors more static segments
         * 
         * 
         * @param {Array<plat.routing.State>} states The states to sort.
         * 
         * @returns {Array<plat.routing.State>} The sorted states.
         */
        static sort(states: Array<State>): Array<State> {
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

        /**
         * @name constructor
         * @memberof plat.routing.State
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a State.
         * 
         * @returns {plat.routing.State}
         */
        constructor() {
            this.initialize();
        }

        /**
         * @name initialize
         * @memberof plat.routing.State
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the state with the given {@link plat.routing.ICharacterSpecification|specification}.
         * 
         * @param {plat.routing.ICharacterSpecification} specification? The character specification for the state.
         * 
         * @returns {void}
         */
        initialize(specification?: ICharacterSpecification) {
            this.specification = specification;
            this.nextStates = [];
        }

        /**
         * @name add
         * @memberof plat.routing.State
         * @kind function
         * @access public
         * 
         * @description
         * Adds a new {@link plat.routing.ICharacterSpecification|specification} to the next states. If the specification 
         * already exists as a next state a new one won't be used.
         * 
         * @param {plat.routing.ICharacterSpecification} specification? The character specification used to create 
         * the next state if necessary.
         * 
         * @returns {plat.routing.State} A state with the given specification.
         */
        add(specification: ICharacterSpecification): State {
            var state = this._find(specification);

            if (isObject(state)) {
                return state;
            }

            state = acquire(State);
            state.initialize(specification);

            this.nextStates.push(state);

            if (specification.repeat) {
                state.nextStates.push(state);
            }

            return state;
        }

        /**
         * @name match
         * @memberof plat.routing.State
         * @kind function
         * @access public
         * 
         * @description
         * Finds next states that match the input character. If the character exists 
         * in the state's specification for valid characters, or if it does not 
         * exist in the specification for invalid characters, then the state is considered 
         * a match.
         * 
         * @param {string} char The character with which to match next states.
         * 
         * @returns {Array<plat.routing.State>} The matching states.
         */
        match(char: string) {
            var matches: Array<State> = [],
                spec: ICharacterSpecification,
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

        /**
         * @name _find
         * @memberof plat.routing.State
         * @kind function
         * @access protected
         * 
         * @description
         * Finds the next state that shares the same {@link plat.routing.ICharacterSpecification|specification} 
         * as the input spec.
         * 
         * @param {plat.routing.ICharacterSpecification} spec The character specification used to find 
         * the next state.
         * 
         * @returns {Array<plat.routing.State>} The matching states.
         */
        protected _find(spec: ICharacterSpecification): State {
            var validChars = spec.validCharacters,
                invalidChars = spec.invalidCharacters,
                s: ICharacterSpecification,
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

        /**
         * @name _someChildren
         * @memberof plat.routing.State
         * @kind function
         * @access protected
         * @variation 0
         * 
         * @description
         * Iterates through the next states and calls the input callback with each state. Acts like 
         * {@link plat.Utils.some|Utils.some}. If the callback returns true, it will break out of the loop.
         * 
         * @param {(child: plat.routing.State) => boolean} iterator The function with which to call for each 
         * State. Can return true to break out of the loop
         * 
         * @returns {boolean} Whether or not the loop was escaped.
         */
        protected _someChildren(iterator: (child: State) => boolean): boolean;
        /**
         * @name _someChildren
         * @memberof plat.routing.State
         * @kind function
         * @access protected
         * @variation 1
         * 
         * @description
         * Iterates through the next states and calls the input callback with each state.
         * 
         * @param {(child: plat.routing.State) => void} iterator The function with which to call for each 
         * State.
         * 
         * @returns {void}
         */
        protected _someChildren(iterator: (child: State) => void): void;
        protected _someChildren(iterator: (child: State) => any) {
            var nextStates = this.nextStates,
                length = nextStates.length;

            for (var i = 0; i < length; ++i) {
                if (iterator(nextStates[i]) === true) {
                    return true;
                }
            }
        }
    }

    /**
     * The Type for referencing the '_State' injectable as a dependency.
     */
    export function IStateStatic(): typeof State {
        return State;
    }

    plat.register.injectable(__StateStatic, IStateStatic, null, __STATIC);
    plat.register.injectable(__StateInstance, State, null, __INSTANCE);

    /**
     * @name IDelegateParameterNames
     * @memberof plat.routing
     * @kind interface
     * 
     * @description
     * Contains a delegate and its associated segment names. Used for populating 
     * the parameters in an {@link plat.routing.IDelegateInfo|IDelegateInfo} object.
     */
    export interface IDelegateParameterNames {
        /**
         * @name delegate
         * @memberof plat.routing.IDelegateParameterNames
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
         * @memberof plat.routing.IDelegateParameterNames
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
