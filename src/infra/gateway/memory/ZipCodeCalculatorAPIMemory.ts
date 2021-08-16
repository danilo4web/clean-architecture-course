import ZipcodeCalculatorAPI from "../../../domain/gateway/ZipcodeCalculadorApi";

export default class ZipCodeCalculatorAPIMemory implements ZipcodeCalculatorAPI {
    calculate(zipcodeA: string, zipcodeB: string): number {
        return 1000;
    }
}