import {originRulesAnalyse, RealRules, updateRule} from "./origin-rules-analyse";
import {ValidatorCollection, Validator} from "./build-in-validators";
import {ParamType} from "./enum-type";


interface RuleResult {
    fields: {
        [propName: string]: {
            message: string,
            invalid: boolean
        }
    },
    valid: boolean
}

interface RuleFunction extends Function {
    (data: Object): RuleResult,
    register?: (methodName: string, fn: Function) => void
}

interface OriginConfig {
    [propName: string]: string
}

interface ValidationInfo {
    labels: {
        [propName: string]: string
    },
    message: {
        [propName: string]: string
    }
}

export {RuleResult, RuleFunction};

export function rules(config: OriginConfig, info?: ValidationInfo): RuleFunction {
    let realRules = originRulesAnalyse(config),
        newValidators = ValidatorCollection.create(),
        ruleFn = getRuleFunction(realRules, newValidators);

    ruleFn.register = (methodName: string, fn: Function) => {
        newValidators[methodName] = fn;
    };

    return ruleFn;
}

function addWildCardRule(realRules: RealRules, data: Object) {
    let wildCardRules = realRules['*'];
    delete realRules['*'];

    for(let fieldName in data){
        if(realRules[fieldName] === undefined){
            realRules[fieldName] = wildCardRules;
        }
        else{
            realRules[fieldName] = realRules[fieldName].concat(wildCardRules);
        }
    }
}

function getRuleFunction(realRules: RealRules, newValidators: Validator): RuleFunction {
    return (data: Object) => {

        let ruleResult: RuleResult = {
            fields: {},
            valid: true
        };

        if ('*' in realRules) {
            addWildCardRule(realRules, data);
        }

        for (let fieldName in realRules) {
            let filedItem = realRules[fieldName],
                dataItem = data[fieldName];

            let resultItem = ruleResult.fields[fieldName] = {
                message: '',
                invalid: false
            };

            for (let ruleItem of filedItem) {

                let params: any[];

                if (ruleItem.params) {
                    params = ruleItem.params.map((param) => {
                        if (param.type === ParamType.PROPERTY) {
                            let field = param.value.replace(/^\s*\{\{|\}\}\s*$/g, '');
                            return data[field];
                        }
                        else {
                            return param.value;
                        }
                    });
                }

                resultItem.invalid = !newValidators[ruleItem.method](...[dataItem].concat(params));

                if (resultItem.invalid) {
                    ruleResult.valid = false;
                }
            }
        }

        return ruleResult;
    }
}
