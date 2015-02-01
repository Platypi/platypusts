module plat.routing {
    'use strict';

    var specialCharacters = [
        '/', '.', '*', '+', '?', '|',
        '(', ')', '[', ']', '{', '}', '\\'
    ],
        escapeRegex = new RegExp('(\\' + specialCharacters.join('|\\') + ')', 'g'),
        baseSegment: BaseSegment,
        dynamicSegments: IObject<DynamicSegment> = {},
        splatSegments: IObject<SplatSegment> = {},
        staticSegments: IObject<StaticSegment> = {};

    /**
     * @name BaseSegment
     * @memberof plat.routing
     * @kind class
     * 
     * @description
     * Stores information about a segment, publishes a regex for matching the segment as well as 
     * methods for generating the segment and iterating over the characters in the segment.
     */
    export class BaseSegment {
        /**
         * @name _regex
         * @memberof plat.routing.BaseSegment
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.expressions.Regex}
         * 
         * @description
         * Reference to the {@link plat.expressions.Regex|Regex} injectable.
         */
        protected static _regex: expressions.Regex;

        /**
         * @name type
         * @memberof plat.routing.BaseSegment
         * @kind property
         * @access public
         * @virtual
         * 
         * @type {string}
         * 
         * @description
         * Denotes the type of segment for this instance.
         */
        type: string = __BASE_SEGMENT_TYPE;

        /**
         * @name name
         * @memberof plat.routing.BaseSegment
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The name of the segment.
         */
        name: string = '';

        /**
         * @name regex
         * @memberof plat.routing.BaseSegment
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A regular expression string which can be used to match the segment.
         */
        regex: string = '';

        /**
         * @name regex
         * @memberof plat.routing.BaseSegment
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A regular expression string which can be used to match the segment.
         */
        protected _specification: ICharacterSpecification;

        /**
         * @name parse
         * @memberof plat.routing.BaseSegment
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Parses a route into segments, populating an array of names (for dynamic and splat segments) as well as 
         * an {@link plat.routing.ISegmentTypeCount|ISegmentTypeCount} object.
         * 
         * @param {string} route The route to parse.
         * @param {Array<string>} names An array to populate with dynamic/splat segment names
         * @param {plat.routing.ISegmentTypeCount} types An object to use for counting segment types in the route.
         * 
         * @returns {Array<plat.routing.BaseSegment>} The parsed segments.
         */
        static parse(route: string, names: Array<string>, types: ISegmentTypeCount): Array<BaseSegment> {
            if (!isString(route) || !isArray(names) || !isObject(types)) {
                return [];
            } else if (route[0] === '/') {
                route = route.slice(1);
            }

            var segments: Array<string> = route.split('/'),
                length = segments.length,
                __findSegment = BaseSegment.__findSegment,
                results: Array<BaseSegment> = [],
                result: BaseSegment,
                segment: string,
                name: string,
                match: RegExpMatchArray,
                _regex = BaseSegment._regex;

            for (var i = 0; i < length; ++i) {
                segment = segments[i];

                if (segment === '') {
                    if (!isObject(baseSegment)) {
                        baseSegment = acquire(__BaseSegmentInstance);
                    }

                    results.push(baseSegment);
                } else if (match = segment.match(_regex.dynamicSegmentsRegex)) {
                    name = match[1];

                    results.push(__findSegment(name, __DynamicSegmentInstance, dynamicSegments));
                    names.push(name);
                    types.dynamics++;
                } else if (match = segment.match(_regex.splatSegmentRegex)) {
                    name = match[1];

                    results.push(__findSegment(name, __SplatSegmentInstance, splatSegments));
                    names.push(name);
                    types.splats++;
                } else {
                    results.push(__findSegment(segment, __StaticSegmentInstance, staticSegments));
                    types.statics++;
                }
            }

            return results;
        }

        /**
         * @name __findSegment
         * @memberof plat.routing.BaseSegment
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Parses a route into segments, populating an array of names (for dynamic and splat segments) as well as 
         * an {@link plat.routing.ISegmentTypeCount|ISegmentTypeCount} object.
         * 
         * @param {string} name The name of the segment to look for.
         * @param {string} token The token used to {@link plat.acquire|acquire} a new segment if necessary.
         * @param {plat.IObject<plat.routing.BaseSegment>} cache The cache in which to look for/store the segment.
         * 
         * @returns {plat.routing.BaseSegment} The located segment.
         */
        private static __findSegment(name: string, token: string, cache: IObject<BaseSegment>): BaseSegment {
            var segment = cache[name];

            if (!isObject(segment)) {
                segment = cache[name] = <BaseSegment>acquire(token);
                segment.initialize(name);
            }

            return segment;
        }

        /**
         * @name initialize
         * @memberof plat.routing.BaseSegment
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the segment.
         * 
         * @param {string} name? The name for the new segment.
         * 
         * @returns {void}
         */
        initialize(name?: string): void {
            this.name = name;
        }

        /**
         * @name reduceCharacters
         * @memberof plat.routing.BaseSegment
         * @kind function
         * @access public
         * 
         * @description
         * Iterates over the characters in the segment, calling an iterator method and accumulating the result of each call in 
         * a defined object.
         * 
         * @typeparam {any} T The type of the accumulated object.
         * 
         * @param {(previousValue: T, spec: plat.routing.ICharacterSpecification) => T} iterator The iterator to call with each character.
         * @param {T} initialValue? An optional initial value with which to start the accumulation.
         * 
         * @returns {T} The accumulated object.
         */
        reduceCharacters<T>(iterator: (previousValue: T, spec: ICharacterSpecification) => T, initialValue?: T): T {
            if (isObject(this._specification)) {
                initialValue = iterator(initialValue, this._specification);
            }

            return initialValue;
        }

        /**
         * @name generate
         * @memberof plat.routing.BaseSegment
         * @kind function
         * @access public
         * 
         * @description
         * Generates a new segment, using the input parameters if necessary.
         * 
         * @param {plat.IObject<string>} parameters? The input parameters for the segment.
         * 
         * @returns {string} The generated segment.
         */
        generate(parameters?: IObject<string>): string {
            return this.name;
        }
    }

    /**
     * The Type for referencing the '_BaseSegmentFactory' injectable as a dependency.
     */
    export function IBaseSegmentFactory(_regex: expressions.Regex): typeof BaseSegment {
        (<any>BaseSegment)._regex = _regex;
        return BaseSegment;
    }

    plat.register.injectable(__BaseSegmentFactory, IBaseSegmentFactory, [__Regex], __FACTORY);

    plat.register.injectable(__BaseSegmentInstance, BaseSegment, null, __INSTANCE);

    /**
     * @name StaticSegment
     * @memberof plat.routing
     * @kind class
     * 
     * @description
     * Stores information about a static segment, publishes a regex for matching the segment as well as 
     * methods for generating the segment and iterating over the characters in the segment.
     */
    export class StaticSegment extends BaseSegment {
        /**
         * @name type
         * @memberof plat.routing.StaticSegment
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Denotes that this is a static segment.
         */
        type: string = __STATIC_SEGMENT_TYPE;

        /**
         * @name initialize
         * @memberof plat.routing.StaticSegment
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the segment.
         * 
         * @param {string} name? The name for the new segment.
         * 
         * @returns {void}
         */
        initialize(name?: string) {
            super.initialize(name);

            this.regex = this.name.replace(escapeRegex, '\\$1');
        }

        /**
         * @name reduceCharacters
         * @memberof plat.routing.StaticSegment
         * @kind function
         * @access public
         * 
         * @description
         * Iterates over the characters in the segment, calling an iterator method and accumulating the result of each call in 
         * a defined object.
         * 
         * @typeparam {any} T The type of the accumulated object.
         * 
         * @param {(previousValue: T, spec: plat.routing.ICharacterSpecification) => T} iterator The iterator to call with each character.
         * @param {T} initialValue? An optional initial value with which to start the accumulation.
         * 
         * @returns {T} The accumulated object.
         */
        reduceCharacters<T>(iterator: (previousValue: T, spec: ICharacterSpecification) => T, initialValue?: T): T {
            var name: string = this.name,
                length = name.length,
                value = initialValue;

            for (var i = 0; i < length; ++i) {
                value = iterator(value, { validCharacters: name[i] });
            }

            return value;
        }
    }

    plat.register.injectable(__StaticSegmentInstance, StaticSegment, null, __INSTANCE);

    /**
     * @name VariableSegment
     * @memberof plat.routing
     * @kind class
     * 
     * @description
     * Stores information about a variable segment (either dynamic or splat), publishes a regex for matching the segment as well as 
     * methods for generating the segment and iterating over the characters in the segment.
     */
    export class VariableSegment extends BaseSegment {
        /**
         * @name type
         * @memberof plat.routing.VariableSegment
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Denotes that this is a variable segment.
         */
        type: string = __VARIABLE_SEGMENT_TYPE;

        /**
         * @name generate
         * @memberof plat.routing.VariableSegment
         * @kind function
         * @access public
         * 
         * @description
         * Generates a new segment, using the input parameters.
         * 
         * @param {plat.IObject<string>} parameters? The input parameters for the segment.
         * 
         * @returns {string} The generated segment.
         */
        generate(parameters?: IObject<string>) {
            if (isObject(parameters)) {
                return parameters[this.name];
            }
        }
    }

    plat.register.injectable(__VariableSegmentInstance, VariableSegment, null, __INSTANCE);

    /**
     * @name SplatSegment
     * @memberof plat.routing
     * @kind class
     * 
     * @description
     * Stores information about a splat segment, publishes a regex for matching the segment as well as 
     * methods for generating the segment and iterating over the characters in the segment.
     */
    export class SplatSegment extends VariableSegment {
        /**
         * @name type
         * @memberof plat.routing.SplatSegment
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Denotes that this is a splat segment.
         */
        type: string = __SPLAT_SEGMENT_TYPE;

        /**
         * @name regex
         * @memberof plat.routing.SplatSegment
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A regular expression string which can be used to match the segment.
         */
        regex: string = '(.+)';

        /**
         * @name regex
         * @memberof plat.routing.SplatSegment
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A regular expression string which can be used to match the segment.
         */
        protected _specification: ICharacterSpecification = {
            invalidCharacters: '',
            repeat: true
        };
    }

    plat.register.injectable(__SplatSegmentInstance, SplatSegment, null, __INSTANCE);

    /**
     * @name DynamicSegment
     * @memberof plat.routing
     * @kind class
     * 
     * @description
     * Stores information about a dynamic segment, publishes a regex for matching the segment as well as 
     * methods for generating the segment and iterating over the characters in the segment.
     */
    export class DynamicSegment extends VariableSegment {
        /**
         * @name type
         * @memberof plat.routing.DynamicSegment
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Denotes that this is a dynamic segment.
         */
        type: string = __DYNAMIC_SEGMENT_TYPE;

        /**
         * @name regex
         * @memberof plat.routing.DynamicSegment
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A regular expression string which can be used to match the segment.
         */
        regex: string = '([^/]+)';

        /**
         * @name regex
         * @memberof plat.routing.DynamicSegment
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A regular expression string which can be used to match the segment.
         */
        protected _specification: ICharacterSpecification = {
            invalidCharacters: '/',
            repeat: true
        };
    }

    plat.register.injectable(__DynamicSegmentInstance, DynamicSegment, null, __INSTANCE);

    /**
     * @name ICharacterSpecification
     * @memberof plat.routing
     * @kind interface
     * 
     * @description
     * Contains information for validating characters.
     */
    export interface ICharacterSpecification {
        /**
         * @name invalidCharacters
         * @memberof plat.routing.ICharacterSpecification
         * @kind property
         * 
         * @type {number}
         * 
         * @description
         * Contains all the invalid characters
         */
        invalidCharacters?: string;

        /**
         * @name validCharacters
         * @memberof plat.routing.ICharacterSpecification
         * @kind property
         * 
         * @type {string}
         * 
         * @description
         * Contains all the valid characters
         */
        validCharacters?: string;

        /**
         * @name repeat
         * @memberof plat.routing.ICharacterSpecification
         * @kind property
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the character should repeat.
         */
        repeat?: boolean;
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
}
