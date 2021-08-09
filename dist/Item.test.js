"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("./Item"));
test("Should calculate an item volume", function () {
    const item = new Item_1.default("1", "Amplificador", 5000, 50, 50, 50, 22);
    const volume = item.getVolume();
    expect(volume).toBe(0.125);
});
test("Should calculate an item density", function () {
    const item = new Item_1.default("1", "Amplificador", 5000, 50, 50, 50, 22);
    const volume = item.getDensity();
    expect(volume).toBe(176);
});
