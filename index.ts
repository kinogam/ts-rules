function rules(config: Object, message?: Object): (origin: any) => {valid: boolean} {
    return (origin: any) => {
        return {valid: true};
    };
}

export {rules};
