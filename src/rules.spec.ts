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

        it('eq', () => {

            r = rules({
                p: `eq: 'kino'`
            });

            json = {
                p: 'kino'
            };

            expect(r(json).valid).toBe(true);

            json = {
                p: 'onik'
            };

            expect(r(json).valid).toBe(false);
        });

        it('gt', () => {

            r = rules({
                age: `gt: 18`
            });

            json = {
                age: 20
            };

            expect(r(json).valid).toBe(true);

            json = {
                age: 17
            };

            expect(r(json).valid).toBe(false);
        });

        it('gte', () => {

            r = rules({
                age: `gte: 18`
            });

            json = {
                age: 18
            };

            expect(r(json).valid).toBe(true);

            json = {
                age: 17
            };

            expect(r(json).valid).toBe(false);
        });

        it('lt', () => {

            r = rules({
                age: `lt: 18`
            });

            json = {
                age: 17
            };

            expect(r(json).valid).toBe(true);

            json = {
                age: 20
            };

            expect(r(json).valid).toBe(false);
        });

        it('lte', () => {

            r = rules({
                age: `lte: 18`
            });

            json = {
                age: 18
            };

            expect(r(json).valid).toBe(true);

            json = {
                age: 20
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

    describe('multiple fields', () => {

        it('variable', () => {
            r = rules({
                pwd1: 'required',
                pwd2: `eq: {{pwd1}}`
            });

            json = {
                pwd1: 'hello123',
                pwd2: 'hello123'
            };

            expect(r(json).valid).toBe(true);

            json = {
                pwd1: 'hello123',
                pwd2: 'hello234'
            };

            expect(r(json).valid).toBe(false);
        });

        it('wildcard', () => {
           r = rules({
               '*': 'required'
           });

            json = {
                p1: 'hello',
                p2: 'world'
            };

            expect(r(json).valid).toBe(true);

            json = {
                p1: 'hello',
                p2: ''
            };

            expect(r(json).valid).toBe(false);
        });

        it('mix rules test', () => {
            r = rules({
                name: 'required | maxLen: 15',
                age: 'required | number',
                desc: 'maxLen: 20'
            });

            json = {
                name: 'Tom',
                age: 28,
                desc: ''
            };

            expect(r(json).valid).toBe(true);

            json = {
                name: '',
                age: 21,
                desc: 'Hello'
            };

            expect(r(json).valid).toBe(false);
        });

    });

    describe('field info', () => {

        it('field validation', () => {
           r = rules({
               p1: 'required',
               p2: 'required'
           });

           json = {
               p1: 'kino',
               p2: ''
           };

           let result = r(json);

            expect(result.fields.p1.invalid).toBe(false);
            expect(result.fields.p2.invalid).toBe(true);
        });


    });
});

