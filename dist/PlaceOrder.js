"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("./Order"));
const Coupon_1 = __importDefault(require("./Coupon"));
const PlaceOrderOutput_1 = __importDefault(require("./PlaceOrderOutput"));
class PlaceOrder {
    constructor() {
        this.coupons = [
            new Coupon_1.default("VALE20", 20, new Date("2021-10-10")),
            new Coupon_1.default("VALE20_EXPIRED", 20, new Date("2020-10-10")),
        ];
        this.orders = [];
    }
    execute(input) {
        const order = new Order_1.default(input.cpf);
        for (const item of input.items) {
            order.addItem(item.description, item.price, item.quantity);
        }
        if (input.coupon) {
            const coupon = this.coupons.find(coupon => coupon.code === input.coupon);
            if (coupon) {
                order.addCoupon(coupon);
            }
        }
        const total = order.getTotal();
        this.orders.push(order);
        return new PlaceOrderOutput_1.default({
            total
        });
    }
}
exports.default = PlaceOrder;