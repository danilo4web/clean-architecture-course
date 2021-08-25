export default class PlaceOrderInput {
    cpf: string;
    items: any;
    coupon: string;
    zipcode: string;
    issueDate: Date;

    constructor ({cpf, items, coupon, zipcode, issueDate = new Date() }: {cpf: string, items: any, coupon: string, zipcode: string, issueDate?: Date}) {
        this.cpf = cpf;
        this.items = items;
        this.coupon = coupon;
        this.zipcode = zipcode;
        this.issueDate = issueDate;
    }
}