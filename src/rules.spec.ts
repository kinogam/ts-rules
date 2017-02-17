import {rules, RuleFunction} from './rules';

describe('simple validate', () => {

    let json: any,
        r: RuleFunction;

    beforeEach(() => {
        json = {};
    });

    describe('single field', () => {

        it('require', () => {
            r = rules({
                p: 'required'
            });

            json = {
                p: 'hellox'
            };

            expect(r(json).valid).toBe(true);

            json = {
                p: ''
            };

            expect(r(json).valid).toBe(false);

            json = {
                p: '            '
            };

            expect(r(json).valid).toBe(false);
        });


        it('number', () => {
            r = rules({
                p: 'number'
            });

            json = {
                p: 123
            };

            expect(r(json).valid).toBe(true);

            json = {
                p: '123'
            };

            expect(r(json).valid).toBe(true);

            json = {
                p: 'abc'
            };

            expect(r(json).valid).toBe(false);
        });

        it('email', () => {
            r = rules({
                p: 'email'
            });

            json = {
                p: 'kinogam@gmail.com'
            };

            expect(r(json).valid).toBe(true);

            json = {
                p: '@kinogl.com!'
            };

            expect(r(json).valid).toBe(false);
        });

        it('max length', () => {
            r = rules({
                p: 'maxLen: 5'
            });

            json = {
                p: 'kino'
            };

            expect(r(json).valid);

            json = {
                p: 'kinogam'
            };

            expect(r(json).valid).toBe(false);

        });

        it('custom rule', () => {
            r = rules({
                p: 'myRule: "kinogam"'
            });


            r.register('myRule', (val, name) => {
                return val.indexOf(name) !== -1;
            });

            json = {
                p: 'hello, kinogam!'
            };

            expect(r(json).valid).toBe(true);
        });

        it('multiple rules', () => {
            r = rules({
                p: 'email | maxLen: 14'
            });

            json = {
                p: 'kino@gmail.com'
            };

            expect(r(json).valid);

            json = {
                p: 'kinogam@gmail.com'
            };

            expect(r(json).valid).toBe(false);
        });

    });


});

