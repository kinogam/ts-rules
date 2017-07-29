# ts-rules

[![Build Status](https://travis-ci.org/kinogam/ts-rules.svg?branch=master)](https://travis-ci.org/kinogam/ts-rules)

A powerful JSON validator that design to validate complex JSON object.

# How to install

```sh 
npm install ts-rules --save
```

# How to use

es6 import
```javascript
import {rules} from 'ts-rules';
```


# Simple

```javascript
let r = rules({
  p1: 'required | maxLen: 5',
  p2: 'eq: {{p1}}'
});

let result = r({
  p1: '123456',
  p2: ''
});

result.valid; //false

result = r({
  p1: '12345',
  p2: '12345'
});

result.valid; //true
``` 



# Rules

required
```javascript
{
    'propName': 'required'
}
```

number
```javascript
{
    'propName': 'number'
}
```

email
```javascript
{
    'propName': 'email'
}
```
max length
```javascript
{
    'propName': 'maxLen: 8'
}
```

eq
```javascript
// equal
{
    'propName': `eq: 'kino'`
}
```
gt 
```javascript
// greater than
{
    'propName': `gt: 23`
}
```

gte
```javascript
// greater than or equal to
{
    'propName': `gte: 23`
}
```
lt
```javascript
// less than
{
    'propName': `lt: 23`
}
```
lte
```javascript
// less than or equal to
{
    'propName': `lte: 23`
}
```

# custom rule

```javascript
r = rules({
    p: 'myRule: "kinogam"'
});


r.register('myRule', (val, name) => {
    return val.indexOf(name) !== -1;
});

json = {
    p: 'hello, kinogam!'
};

r(json).valid; // true
```

# multiple rules
use | to separate rules
```javascript
r = rules({
    p: 'email | maxLen: 14'
});

json = {
    p: 'kino@gmail.com'
};

r(json).valid; // true

json = {
    p: 'kinogam@gmail.com'
};

r(json).valid; // false
```

# wildcard *
you can use * as a wildcard to match all fields
```javascript
r = rules({
    '*': 'required'
});

json = {
    p1: 'hello',
    p2: 'world'
};

r(json).valid; // true

json = {
    p1: 'hello',
    p2: ''
};

r(json).valid; // false
```

# validation info

when you use rFn(json) then will return a validation result

```javascript
result.valid;
```

you also can see each field's validation info
```javascript
r = rules({
    p1: 'required',
    p2: 'required'
});

json = {
    p1: 'kino',
    p2: ''
};

let result = r(json);

result.fields.p1.invalid; // false
result.fields.p2.invalid; // true;
```

and you can set error message, the 'labels' property is optional
```javascript
let info = {
    labels: {
        p1: 'my field',
        p2: 'your field'
    },
    message: {
        p1: {
            'required': '{{p1}} is required',
            'maxLen': '{{p1}} can not longer than 5 characters'
        },
        p2: {
            'eq': '{{p2}} must equal to {{p1}}'
        }
    }
};

r = rules({
    p1: 'required | maxLen: 5',
    p2: 'eq: {{p1}}'
}, info);

json = {
    p1: '',
    p2: ''
};

let result = r(json);

result.fields.p1.message; // 'my field is required'

json = {
    p1: '123456',
    p2: ''
};

result = r(json);

result.fields.p1.message; // 'my field can not longer than 5 characters'

json = {
    p1: '123',
    p2: '234'
};

result = r(json);

result.fields.p2.message; // 'your field must equal to my field';
```