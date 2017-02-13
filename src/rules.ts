import {originRulesAnalyse, RealRules} from "./origin-rules-analyse";

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
    return  () => {
        return {valid: true};
    }
}
