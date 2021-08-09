"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("./Coupon"));
test("Should validate expires date", function () {
    const coupon = new Coupon_1.default("VALE20_EXPIRED", 20, new Date("2020-10-10"));
    expect(coupon.isExpered()).toBe(true);
});
