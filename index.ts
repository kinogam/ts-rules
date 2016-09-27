class ValidateInfo {
    invalid: boolean;
}

function rules(config: Object, message?: Object): (origin: any) => ValidateInfo {
    return (origin: any) => {
        let info: ValidateInfo = new ValidateInfo();
        info.invalid = false;
        return info;
    };
}

export {rules};
