import {ParamType} from "./enum-type";

export interface RealRules {
    [propName: string]: RuleItem[]
}

export interface RuleParam{
    type: number,
    value: any
}

interface RuleItem {
    method: string,
    params: RuleParam[],
    reverse: boolean
}

export function originRulesAnalyse(originRules: Object): RealRules {
    let realRules: RealRules = {};

    for (let p in originRules) {
        let ruleStr = originRules[p];

        updateRule(realRules, p, ruleStr);
    }

    return realRules;
}

function updateRule(rules: RealRules, propName: string, propValue: string) {
    let ruleStringList = propValue.split(/\s*\|\s*/),
        selectorSplit = propName.split(/\s*:\s*/),
        field = selectorSplit[0];

    if (rules[field] === undefined) {
        rules[field] = [];
    }

    let ruleItem = rules[field];

    for (let i = 0, len = ruleStringList.length; i < len; i++) {
        let ruleStringItem = ruleStringList[i].split(/\s*:\s*/),
            ruleParams:RuleParam[],
            methodName = ruleStringItem.splice(0, 1)[0].replace(/^\s+|\s+$/g, ''),
            isReverse = false;


        if (ruleStringItem.length > 0) {
            ruleParams = ruleStringItem.map(function (item) {
                let type: number;

                if (/^\s*['"]|['"]\s*$/.test(item) || /^-?\d+(?:\.\d+)?$/.test(item)) {
                    type = ParamType.VALUE;
                }
                else {
                    type = ParamType.PROPERTY;
                }

                return {
                    type: type,
                    value: item.replace(/^\s+|\s+$/g, '').replace(/^['"]|['"]$/g, '')
                };
            });
        }

        if (methodName.indexOf('!') !== -1) {
            isReverse = true;
            methodName = methodName.substr(1);
        }

        ruleItem.push({
            method: methodName,
            params: ruleParams,
            reverse: isReverse
        });
    }
}

