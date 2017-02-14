import {originRulesAnalyse, RealRules} from "./origin-rules-analyse";
import {validators} from "./build-in-validators";

type RuleResult = {
  valid: boolean
};

type RuleFunction = (data: Object) => RuleResult;

interface OriginConfig{
    [propName: string]: string
}

export {RuleResult, RuleFunction};

export function rules(config: OriginConfig): RuleFunction {
    let realRules = originRulesAnalyse(config),
        ruleFn = getRuleFunction(realRules);

    return ruleFn;
}

function getRuleFunction(realRules: RealRules): RuleFunction{
    return  (data) => {
        for(let fieldName in realRules){
            let filedItem = realRules[fieldName],
                dataItem = data[fieldName];

            for(let ruleItem of filedItem){
                let valid = validators[ruleItem.method].apply(null, [dataItem].concat(ruleItem.params));


                if(!valid){
                    return {valid: false};
                }
            }
        }

        return {valid: true};
    }
}
