import {rules} from './index';

describe('simple validate', () => {

    describe('required', () => {
        it('should be valid if property is not empty', () => {
            let obj = {
                    p: 'hello'
                },
                r = rules({
                    'p': 'required'
                });

            expect(r(obj).invalid).toBe(false);
        });
    });

});

