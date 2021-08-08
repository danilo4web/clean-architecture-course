export default class Cpf {
    FACTOR_DIGIT_1 = 10;
    FACTOR_DIGIT_2 = 11;

    constructor (cpf: string) {
        if (!this.validate(cpf)) {
            throw new Error("Invalid CPF");
        }
    }

    validate (cpf: string) {
        cpf = this.extractDigits(cpf);
        if (this.isInvalidLength(cpf)) return false;
        if (this.allDigitsAreEqual(cpf)) return false;
        const digit1 = this.calculateDigit(cpf, this.FACTOR_DIGIT_1, 9);
        const digit2 = this.calculateDigit(cpf, this.FACTOR_DIGIT_2, 10);
        let calculatedCheckDigit = `${digit1}${digit2}`;
        return this.getCheckerDigit(cpf) == calculatedCheckDigit;
    }

    extractDigits(cpf: string) {
        return cpf.replace(/\D/g, "");
    }

    isInvalidLength(cpf: string) {
        return cpf.length !== 11;
    }

    allDigitsAreEqual(cpf: string) {
        const [firstDigit] = cpf;
        return cpf.split("").every(digit => digit === firstDigit);
    }

    calculateDigit(cpf: string, factor: number, max: number) {
        let total = 0;
        for (const digit of cpf.split("").slice(0, max)) {
            total += parseInt(digit) * factor--;
        }
        const rest = total % 11;
        const digit = (rest < 2) ? 0 : (11 - rest);
        return digit;
    }

    getCheckerDigit(cpf: string) {
        return cpf.slice(9);
    }
}