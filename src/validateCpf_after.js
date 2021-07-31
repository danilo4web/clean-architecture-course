const FACTOR_DIGIT_1 = 10;
const FACTOR_DIGIT_2 = 11;

function clean(cpf) {
    return cpf.replace(/\D/g, "");
}

function isInvalidLength(cpf) {
    return cpf.length !== 11;
}

function allDigitsAreEqual(cpf) {
    const [firstDigit] = cpf;
    return cpf.split("").every(digit => digit === firstDigit);
}

function calculateDigit(cpf, factor, max) {
    let total = 0;
    for (const digit of cpf.split("").slice(0, max)) {
        total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    const digit = (rest < 2) ? 0 : (11 - rest);
    return digit;
}

function extractCheckerDigit(cpf) {
    return cpf.slice(9);
}

function validate(cpf) {
    if (!cpf) return false;
    cpf = clean(cpf);
    if (isInvalidLength(cpf)) return false;
    if (allDigitsAreEqual(cpf)) return false;
    const digit1 = calculateDigit(cpf, FACTOR_DIGIT_1, 9);
    const digit2 = calculateDigit(cpf, FACTOR_DIGIT_2, 10);
    let checkerDigit = extractCheckerDigit(cpf);
    let calculatedDigit = `${digit1}${digit2}`;
    return checkerDigit == calculatedDigit;
}

console.log(validate("00000000000")); // false
console.log(validate("86446422799")); // false
console.log(validate("86446422784")); // true
console.log(validate("864.464.227-84")); // true
console.log(validate("91720489726")); // true
console.log(validate("a1720489726")); // false