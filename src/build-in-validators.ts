export interface Validator{
    [propName: string]: Function
}

export const ValidatorCollection = {
    create(): Validator{
        return {
            'required': (value): boolean => {
                return !(value === undefined || value === null || /^\s*$/.test(value));
            },
            'number': (value): boolean => {
                return /^-?\d+(?:\.\d+)?$/.test(value);
            },
            'email': (value): boolean => {
                return /^(\w+|\.+)((-\w+|\.+)|(\.+\w+))*\@\w+((\.|-)\w+)*\.\w+/.test(value);
            },
            'maxLen': (value, len): boolean => {
                let str = String(value),
                    rps_value = str.replace(/^\s+|\s+$/g, '');
                return rps_value.length <= len;
            },
            'eq': (value: any, compareVal: any): boolean => {
                return value == compareVal;
            },
            'gt': (val1: any, val2: any) => {
                return val1 > val2;
            },
            'gte': (val1: any, val2: any) => {
                return val1 >= val2;
            },
            'lt': (val1: any, val2: any) => {
                return val1 < val2;
            },
            'lte': (val1: any, val2: any) => {
                return val1 <= val2;
            }
        };

    }
};
