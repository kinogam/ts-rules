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
        });

    });



});

