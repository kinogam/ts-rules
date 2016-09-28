import {originRulesAnalyse} from "./origin-rules-analyse";

type ruleFn = (data: Object) => {valid: boolean};

export function rules(config: Object, message?: Object): ruleFn {

    this.realRules = originRulesAnalyse(config)

    return (origin: any) => {
        return {valid: true};
    };
}

