/// <reference path="../../../typings/tsd.d.ts" />

module tests.expressions.regex {

    var regex: plat.expressions.IRegex = plat.acquire(plat.expressions.Regex);

    var regexs: Array<IRegexregexTest> = [
        {
            name: 'newLine regex',
            regex: regex.newLineRegex,
            input: 'test \n newline \r',
            replace: 'test  newline ',
            expected: ['\n']
        },
        {
            name: 'markup regex',
            regex: regex.markupRegex,
            input: '{{test}} some {{markup}}',
            replace: '',
            expected: ['{{test}} some {{markup}}']
        },
        {
            name: 'argument regex',
            regex: regex.argumentRegex,
            input: 'myFunction("foo", "bar", "baz")',
            replace: 'myFunction',
            expected: ['("foo", "bar", "baz")', '"foo", "bar", "baz"']
        },
        {
            name: 'nested argument regex',
            regex: regex.argumentRegex,
            input: 'myFunction("foo", bar(quux()), "baz")',
            replace: 'myFunction',
            expected: ['("foo", bar(quux()), "baz")', '"foo", bar(quux()), "baz"']
        },
        {
            name: 'alias regex',
            regex: regex.aliasRegex,
            input: '@context.baz[bar](quux)',
            replace: '@.baz[bar](quux)',
            expected: ['context']
        },
        {
            name: 'alias regex with multiple',
            regex: regex.aliasRegex,
            input: '@context.baz["@bar"](quux)',
            replace: '@.baz["@bar"](quux)',
            expected: ['context']
        },
        {
            name: 'optional route regex',
            regex: regex.optionalRouteRegex,
            input: '(/foo)/bar(/quux)',
            replace: '/bar',
            expected: ['(/foo)', '/foo']
        },
        {
            name: 'named parameter Route regex',
            regex: regex.namedParameterRouteRegex,
            input: '(/:foo)/bar',
            replace: '(/)/bar',
            expected: [':foo', undefined]
        },
        {
            name: 'wild card Route regex',
            regex: regex.wildcardRouteRegex,
            input: '/foo/*bar12/*baz',
            replace: '/foo//',
            expected: ['*bar12']
        },
        {
            name: 'escape route regex',
            regex: regex.escapeRouteRegex,
            input: '/foo$bar/#baz?query=x',
            replace: '/foobar/bazquery=x',
            expected: ['$']
        },
        {
            name: 'camel case regex, spinal-case',
            regex: regex.camelCaseRegex,
            input: 'my-not-camel-cased-word',
            replace: 'myotamelasedord',
            expected: ['-n', '-', 'n']
        },
        {
            name: 'camel case regex, dot.case',
            regex: regex.camelCaseRegex,
            input: 'my.not.camel.cased.word',
            replace: 'myotamelasedord',
            expected: ['.n', '.', 'n']
        },
        {
            name: 'camel case regex, snake_case',
            regex: regex.camelCaseRegex,
            input: 'my_not_camel_cased_word',
            replace: 'myotamelasedord',
            expected: ['_n', '_', 'n']
        },
    ];

    describe('Regex Tests', () => {
        regexs.forEach((exp) => {
            it('should test ' + exp.name, () => {
                var exec = exp.regex.exec(exp.input);

                expect(exec.slice(0)).toEqual(exp.expected);

                if (!!exp.replace) {
                    var replace = exp.input.replace(exp.regex, '');

                    expect(replace.slice(0)).toEqual(exp.replace);
                }
            });
        });
    });

    interface IRegexregexTest {
        name: string;
        regex: RegExp;
        input: string;
        replace?: string;
        expected: any;
    }
}
