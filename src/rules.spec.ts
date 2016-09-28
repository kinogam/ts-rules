import {rules} from './rules';

describe('simple validate', () => {

    describe('required', () => {
        it('should be valid if property is not empty', () => {
            let obj = {
                    p: 'hello'
                },
                r = rules({
                    p: 'required'
                });

            expect(r(obj).valid).toBe(true);
        });

        // it('should be invalid if property is empty string', () => {
        //     let obj = {
        //             p: ''
        //         },
        //         r = rules({
        //             p: 'required'
        //         });
        //
        //     expect(r(obj).valid).toBe(false);
        // });
    });

});

