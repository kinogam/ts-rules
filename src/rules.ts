import {originRulesAnalyse, RealRules} from "./origin-rules-analyse";
import {ValidatorCollection, Validator} from "./build-in-validators";
import {ParamType} from "./enum-type";

interface RuleResult{
    valid: boolean
}

interface RuleFunction extends Function{
    (data: Object): RuleResult,
    register?: (methodName: string, fn: Function) => void
}

interface OriginConfig {
    [propName: string]: string
}

export {RuleResult, RuleFunction};

export function rules(config: OriginConfig): RuleFunction {
    let realRules = originRulesAnalyse(config),
        newValidators = ValidatorCollection.create(),
        ruleFn = getRuleFunction(realRules, newValidators);

    ruleFn.register = (methodName: string, fn: Function) => {
        newValidators[methodName] = fn;
    };

    return ruleFn;
}

function getRuleFunction(realRules: RealRules, newValidators: Validator): RuleFunction {
    return (data) => {
        for (let fieldName in realRules) {
            let filedItem = realRules[fieldName],
                dataItem = data[fieldName];

            for (let ruleItem of filedItem) {

                let params: any[];

                if(ruleItem.params){
                    params =  ruleItem.params.map((param) => {
                        if(param.type === ParamType.PROPERTY){
                            let field = param.value.replace(/^\s*\{\{|\}\}\s*$/g, '');
                            return data[field];
                        }
                        else {
                            return param.value;
                        }
                    });
                }

                let valid = newValidators[ruleItem.method].apply(null, [dataItem].concat(params));

                if (!valid) {
                    return {valid: false};
                }
            }
        }

        return {valid: true};
    }
}
