/// <reference path="../../../typings/tsd.d.ts" />

module tests.expressions.regex {

    var regex: plat.expressions.IRegex = plat.acquire(plat.expressions.Regex);

    var regexs: Array<IRegexExecTest> = [
        {
            name: 'NewLine Exec',
            regex: regex.newLineRegex,
            input: 'test \n newline \r',
            replace: 'test  newline ',
            expected: ['\n']
        },
        {
            name: 'Markup Exec',
            regex: regex.markupRegex,
            input: '{{test}} some {{markup}}',
            replace: '',
            expected: ['{{test}} some {{markup}}']
        },
        {
            name: 'Argument Exec',
            regex: regex.argumentRegex,
            input: 'myFunction("foo", "bar", "baz")',
            replace: 'myFunction',
            expected: ['("foo", "bar", "baz")', '"foo", "bar", "baz"']
        },
        {
            name: 'Nested Argument Exec',
            regex: regex.argumentRegex,
            input: 'myFunction("foo", bar(quux()), "baz")',
            replace: 'myFunction',
            expected: ['("foo", bar(quux()), "baz")', '"foo", bar(quux()), "baz"']
        },
        {
            name: 'Alias Exec',
            regex: regex.aliasRegex,
            input: '@context.baz[bar](quux)',
            replace: '@.baz[bar](quux)',
            expected: ['context']
        },
        {
            name: 'Alias Exec with multiple',
            regex: regex.aliasRegex,
            input: '@context.baz["@bar"](quux)',
            replace: '@.baz["@bar"](quux)',
            expected: ['context']
        },
        {
            name: 'Optional Route Exec',
            regex: regex.optionalRouteRegex,
            input: '(/foo)/bar(/quux)',
            replace: '/bar',
            expected: ['(/foo)', '/foo']
        },
        {
            name: 'Named Parameter Route Exec',
            regex: regex.namedParameterRouteRegex,
            input: '(/:foo)/bar',
            replace: '(/)/bar',
            expected: [':foo', undefined]
        },
        {
            name: 'Wild Card Route Exec',
            regex: regex.wildcardRouteRegex,
            input: '/foo/*bar12/*baz',
            replace: '/foo//',
            expected: ['*bar12']
        },
        {
            name: 'Escape Route Exec',
            regex: regex.escapeRouteRegex,
            input: '/foo$bar/#baz?query=x',
            replace: '/foobar/bazquery=x',
            expected: ['$']
        },
        {
            name: 'Camel Case Exec, spinal-case',
            regex: regex.camelCaseRegex,
            input: 'my-not-camel-cased-word',
            replace: 'myotamelasedord',
            expected: ['-n', '-', 'n']
        },
        {
            name: 'Camel Case Exec, dot.case',
            regex: regex.camelCaseRegex,
            input: 'my.not.camel.cased.word',
            replace: 'myotamelasedord',
            expected: ['.n', '.', 'n']
        },
        {
            name: 'Camel Case Exec, snake_case',
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

    interface IRegexExecTest {
        name: string;
        regex: RegExp;
        input: string;
        replace?: string;
        expected: any;
    }
}
