module plat.routing {
    var specialCharacters = [
        '/', '.', '*', '+', '?', '|',
        '(', ')', '[', ']', '{', '}', '\\'
    ],
        escapeRegex = new RegExp('(\\' + specialCharacters.join('|\\') + ')', 'g'),
        dynamicSegmentRegexp = /^:([^\/]+)$/,
        splatSegmentRegexp = /^\*([^\/]+)$/,
        baseSegment: BaseSegment,
        dynamicSegments: IObject<DynamicSegment> = {},
        splatSegments: IObject<SplatSegment> = {},
        staticSegments: IObject<StaticSegment> = {};

    export class BaseSegment {
        static parse(route: string, names: Array<string>, types: ISegmentTypeCount) {
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
                match: RegExpMatchArray;

            for (var i = 0; i < length; ++i) {
                segment = segments[i];

                if (segment === '') {
                    if (!isObject(baseSegment)) {
                        baseSegment = new BaseSegment();
                    }

                    results.push(baseSegment);
                } else if (match = segment.match(dynamicSegmentRegexp)) {
                    name = match[1];

                    results.push(__findSegment(name, __DynamicSegmentInstance, dynamicSegments));
                    names.push(name);
                    types.dynamics++;
                } else if (match = segment.match(splatSegmentRegexp)) {
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

        protected _specification: IRouteSegmentSpecification;

        initialize(name?: string) {
            this.name = name;
        }

        forEachCharacter(callback: (spec: IRouteSegmentSpecification) => void) {
            if (isObject(this._specification)) {
                callback(this._specification);
            }
        }

        generate(parameters?: IObject<string>) {
            return this.name;
        }
    }

    export function IBaseSegmentFactory(): typeof BaseSegment {
        return BaseSegment;
    }

    plat.register.injectable(__BaseSegmentFactory, IBaseSegmentFactory, null, register.injectable.FACTORY);

    export class StaticSegment extends BaseSegment {
        type: string = __STATIC_SEGMENT_TYPE;
        regex: string;

        initialize(name?: string) {
            super.initialize(name);

            this.regex = this.name.replace(escapeRegex, '\\$1');
        }

        forEachCharacter(callback: (spec: IRouteSegmentSpecification) => void) {
            var name: string = this.name,
                length = name.length;

            for (var i = 0; i < length; ++i) {
                callback({ validCharacters: name[i] });
            }
        }
    }

    export function IStaticSegmentInstance(): StaticSegment {
        return new StaticSegment();
    }

    plat.register.injectable(__StaticSegmentInstance, IStaticSegmentInstance, null, register.injectable.INSTANCE);

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

    plat.register.injectable(__VariableSegmentInstance, IVariableSegmentInstance, null, register.injectable.INSTANCE);

    export class SplatSegment extends VariableSegment {
        type: string = __SPLAT_SEGMENT_TYPE;
        regex: string = '(.+)';
        protected _specification: IRouteSegmentSpecification = {
            invalidCharacters: '',
            repeat: true
        };
    }

    export function ISplatSegmentInstance(): SplatSegment {
        return new SplatSegment();
    }

    plat.register.injectable(__SplatSegmentInstance, ISplatSegmentInstance, null, register.injectable.INSTANCE);

    export class DynamicSegment extends VariableSegment {
        type: string = __DYNAMIC_SEGMENT_TYPE;
        regex: string = '([^/]+)';
        protected _specification: IRouteSegmentSpecification = {
            invalidCharacters: '/',
            repeat: true
        };
    }

    export function IDynamicSegmentInstance(): DynamicSegment {
        return new DynamicSegment();
    }

    plat.register.injectable(__DynamicSegmentInstance, IDynamicSegmentInstance, null, register.injectable.INSTANCE);

    export interface IRouteSegmentSpecification {
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
