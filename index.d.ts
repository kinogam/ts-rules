declare function rules(config: Object, message?: Object): (origin: any) => {
    invalid: boolean;
};
export { rules };
