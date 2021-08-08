"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("./Order"));
const Coupon_1 = __importDefault(require("./Coupon"));
test("Should not make order with an invalid CPF", function () {
    const cpf = "111.111.111-11";
    expect(() => new Order_1.default(cpf)).toThrow(new Error("Invalid CPF"));
});
test("Should make order with three items", function () {
    const cpf = "778.278.412-36";
    const order = new Order_1.default(cpf);
    order.addItem("Guitarra", 1000, 2);
    order.addItem("Amplificador", 5000, 1);
    order.addItem("Guitarra", 30, 3);
    const total = order.getTotal();
    expect(total).toBe(7090);
});
test("Should make order with discount coupon", function () {
    const cpf = "778.278.412-36";
    const order = new Order_1.default(cpf);
    order.addItem("Guitarra", 1000, 2);
    order.addItem("Amplificador", 5000, 1);
    order.addItem("Guitarra", 30, 3);
    order.addCoupon(new Coupon_1.default("VALE20", 20, new Date("2021-10-10")));
    const total = order.getTotal();
    expect(total).toBe(5672);
});
test("Should make order with expired coupon", function () {
    const cpf = "778.278.412-36";
    const order = new Order_1.default(cpf);
    order.addItem("Guitarra", 1000, 2);
    order.addItem("Amplificador", 5000, 1);
    order.addItem("Guitarra", 30, 3);
    order.addCoupon(new Coupon_1.default("VALE20_EXPIRED", 20, new Date("2020-10-10")));
    const total = order.getTotal();
    expect(total).toBe(7090);
});
