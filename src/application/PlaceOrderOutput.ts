import OrderCode from "../domain/entity/OrderCode";

export default class PlaceOrderOutput {
    code: OrderCode;
    total: number;
    freight: number;

    constructor ({code, total, freight}: {code: OrderCode, total: number, freight: number}) {
        this.code = code;
        this.total = total;
        this.freight = freight;
    }
}