import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";
import OrderCode from "./OrderCode";

export default class Order {
    cpf: Cpf;
    items: OrderItem[];
    coupon: Coupon | undefined;
    freight: number;
    issueDate: Date;
    sequence: number;
    code: OrderCode;

    constructor (cpf: string, issueDate: Date = new Date(), sequence: number = 1) {
        this.cpf = new Cpf(cpf);
        this.items = [];
        this.freight = 0;
        this.issueDate = issueDate;
        this.sequence = sequence;
        this.code = new OrderCode(issueDate, sequence)
    }

    addItem(id: string, price: number, quantity: number) {
        this.items.push(new OrderItem(id, price, quantity));
    }

    addCoupon(coupon: Coupon) {
        if (!coupon.isExpered()) {
            this.coupon = coupon;    
        }
    }

    getTotal(): number {
        let total = 0;
        for (const orderItem of this.items) {
            total += orderItem.price * orderItem.quantity;
        }

        if (this.coupon) {
            total = total - ((total * this.coupon.percentage) / 100);
        }
        total += this.freight;
        return total;
    }
}