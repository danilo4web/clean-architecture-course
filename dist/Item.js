"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(code, description, price, width, height, length, weight) {
        this.code = code;
        this.description = description;
        this.price = price;
        this.width = width;
        this.height = height;
        this.length = length;
        this.weight = weight;
    }
    getVolume() {
        return this.width / 100 * this.height / 100 * this.length / 100;
    }
    getDensity() {
        return this.weight / this.getVolume();
    }
}
exports.default = Item;
