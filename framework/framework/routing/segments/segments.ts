module plat.routing {
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
         * @name $Regex
         * @memberof plat.routing.BaseSegment
         * @kind property
         * @access public
         * 
         * @type {plat.expressions.IRegex}
         * 
         * @description
         * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
         */
        static $Regex: expressions.IRegex;

        /**
         * @name parse
         * @memberof plat.routing.BaseSegment
         * @kind function
         * @access public
         * 
         * @description
         * Parses a route into segments, populating an array of names (for dynamic and splat segments) as well as 
         * an {@link plat.routing.ISegmentTypeCount|ISegmentTypeCount} object.
         * 
         * @param {string} route The route to parse.
         * @param {Array<string>} names An array to populate with dynamic/splat segment names
         * @param {plat.routing.ISegmentTypeCount} types An object to use for counting segment types in the route.
         * 
         * @returns {Array<plat.routing.BaseSegment>} The prsed segments.
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
                $Regex = BaseSegment.$Regex;

            for (var i = 0; i < length; ++i) {
                segment = segments[i];

                if (segment === '') {
                    if (!isObject(baseSegment)) {
                        baseSegment = acquire(__BaseSegmentInstance);
                    }

                    results.push(baseSegment);
                } else if (match = segment.match($Regex.dynamicSegmentsRegex)) {
                    name = match[1];

                    results.push(__findSegment(name, __DynamicSegmentInstance, dynamicSegments));
                    names.push(name);
                    types.dynamics++;
                } else if (match = segment.match($Regex.splatSegmentRegex)) {
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

        private static __findSegment(name: string, token: string, cache: IObject<BaseSegment>) {
            var segment = cache[name];

            if (!isObject(segment)) {
                segment = cache[name] = <BaseSegment>acquire(token);
                segment.initialize(name);
            }

            return segment;
        }

        type: string = __BASE_SEGMENT_TYPE;
        name: string = '';
        regex: string = '';

        protected _specification: ICharacterSpecification;

        initialize(name?: string) {
            this.name = name;
        }

        reduceCharacters<T>(callback: (previousValue: T, spec: ICharacterSpecification) => T, initialValue?: T): T {
            if (isObject(this._specification)) {
                initialValue = callback(initialValue, this._specification);
            }

            return initialValue;
        }

        generate(parameters?: IObject<string>) {
            return this.name;
        }
    }

    export function IBaseSegmentFactory($Regex: expressions.IRegex): typeof BaseSegment {
        BaseSegment.$Regex = $Regex;
        return BaseSegment;
    }

    plat.register.injectable(__BaseSegmentFactory, IBaseSegmentFactory, [__Regex], __FACTORY);

    export function IBaseSegmentInstance(): BaseSegment {
        return new BaseSegment();
    }

    plat.register.injectable(__BaseSegmentInstance, IBaseSegmentInstance, null, __INSTANCE);

    export class StaticSegment extends BaseSegment {
        type: string = __STATIC_SEGMENT_TYPE;
        regex: string;

        initialize(name?: string) {
            super.initialize(name);

            this.regex = this.name.replace(escapeRegex, '\\$1');
        }

        reduceCharacters<T>(callback: (previousValue: T, spec: ICharacterSpecification) => T, initialValue?: T): T {
            var name: string = this.name,
                length = name.length,
                value = initialValue;

            for (var i = 0; i < length; ++i) {
                value = callback(value, { validCharacters: name[i] });
            }

            return value;
        }
    }

    export function IStaticSegmentInstance(): StaticSegment {
        return new StaticSegment();
    }

    plat.register.injectable(__StaticSegmentInstance, IStaticSegmentInstance, null, __INSTANCE);

    export class VariableSegment extends BaseSegment {
        type: string = __VARIABLE_SEGMENT_TYPE;
        generate(parameters?: IObject<string>) {
            if (isObject(parameters)) {
                return parameters[this.name];
            }
        }
    }

    export function IVariableSegmentInstance(): VariableSegment {
        return new VariableSegment();
    }

    plat.register.injectable(__VariableSegmentInstance, IVariableSegmentInstance, null, __INSTANCE);

    export class SplatSegment extends VariableSegment {
        type: string = __SPLAT_SEGMENT_TYPE;
        regex: string = '(.+)';
        protected _specification: ICharacterSpecification = {
            invalidCharacters: '',
            repeat: true
        };
    }

    export function ISplatSegmentInstance(): SplatSegment {
        return new SplatSegment();
    }

    plat.register.injectable(__SplatSegmentInstance, ISplatSegmentInstance, null, __INSTANCE);

    export class DynamicSegment extends VariableSegment {
        type: string = __DYNAMIC_SEGMENT_TYPE;
        regex: string = '([^/]+)';
        protected _specification: ICharacterSpecification = {
            invalidCharacters: '/',
            repeat: true
        };
    }

    /**
     * The Type for referencing the '$DynamicSegmentInstance' injectable as a dependency.
     */
    export function IDynamicSegmentInstance(): DynamicSegment {
        return new DynamicSegment();
    }

    plat.register.injectable(__DynamicSegmentInstance, IDynamicSegmentInstance, null, __INSTANCE);

    export interface ICharacterSpecification {
        invalidCharacters?: string;
        validCharacters?: string;
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
