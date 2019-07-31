export const checkNumber = (value) => {
    var regex = /\d+/;
    return regex.test(parseInt(value));
}

export const validator = (value, funcValidator) => {
    return !!funcValidator(value);
}