"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FreightCalculator_1 = __importDefault(require("./FreightCalculator"));
const Item_1 = __importDefault(require("./Item"));
test("Shoul calculate amplificador freight", function () {
    const item = new Item_1.default("1", "Amplificador", 5000, 50, 50, 50, 22);
    const distance = 1000;
    const price = FreightCalculator_1.default.calculate(distance, item);
    expect(price).toBe(220);
});
