"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceOrder_1 = __importDefault(require("./PlaceOrder"));
const PlaceOrderInput_1 = __importDefault(require("./PlaceOrderInput"));
test("Should make an Order", function () {
    const input = new PlaceOrderInput_1.default({
        cpf: "778.278.412-36",
        items: [
            { description: "Guitarra", price: 1000, quantity: 2 },
            { description: "Amplificador", price: 5000, quantity: 1 },
            { description: "Cabo", price: 30, quantity: 3 }
        ],
        coupon: "VALE20"
    });
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5672);
});
test("Should make an Order with expired coupon", function () {
    const input = new PlaceOrderInput_1.default({
        cpf: "778.278.412-36",
        items: [
            { description: "Guitarra", price: 1000, quantity: 2 },
            { description: "Amplificador", price: 5000, quantity: 1 },
            { description: "Cabo", price: 30, quantity: 3 }
        ],
        coupon: "VALE20_EXPIRED"
    });
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7090);
});
