module plat.routing {
    var specialCharacters = [
        '/', '.', '*', '+', '?', '|',
        '(', ')', '[', ']', '{', '}', '\\'
    ],
        escapeRegex = new RegExp('(\\' + specialCharacters.join('|\\') + ')', 'g'),
        dynamicSegmentRegexp = /^:([^\/]+)$/,
        splatSegmentRegexp = /^\*([^\/]+)$/;

    export class BaseSegment {
        static parse(route: string, names: Array<string>, types: ISegmentTypeCount) {
            if (!isString(route) || !isArray(names) || !isObject(types)) {
                return [];
            } else if (route[0] === '/') {
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
                } else if (match = segment.match(splatSegmentRegexp)) {
                    results.push(new SplatSegment(match[1]));
                    names.push(match[1]);
                    types.splats++;
                } else {
                    results.push(new StaticSegment(segment));
                    types.statics++;
                }
            }

            return results;
        }

        type: string = __BASE_SEGMENT_TYPE;
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
        type: string = __STATIC_SEGMENT_TYPE;
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
        type: string = __VARIABLE_SEGMENT_TYPE;
        generate(params?: any) {
            if (isObject(params)) {
                return params[this.name];
            }
        }
    }

    export class SplatSegment extends VariableSegment {
        type: string = __SPLAT_SEGMENT_TYPE;
        regex: string = '(.+)';
        protected _specification: IRouteSegmentSpecification = {
            invalidCharacters: '',
            repeat: true
        };
    }

    export class DynamicSegment extends VariableSegment {
        type: string = __DYNAMIC_SEGMENT_TYPE;
        regex: string = '([^/]+)';
        protected _specification: IRouteSegmentSpecification = {
            invalidCharacters: '/',
            repeat: true
        };
    }
}
