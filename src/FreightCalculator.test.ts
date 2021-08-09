import FreightCalculator from "./FreightCalculator";
import Item from "./Item";

test("Should calculate amplificador freight", function () {
    const item = new Item("1", "Amplificador", 5000, 50, 50, 50, 22);
    const distance = 1000;
    const price = FreightCalculator.calculate(distance, item);
    expect(price).toBe(220);
});