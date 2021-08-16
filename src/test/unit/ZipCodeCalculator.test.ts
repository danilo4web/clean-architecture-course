import ZipcodeCalculatorAPI from "../../domain/gateway/ZipcodeCalculadorApi";

test("Should calculate distance from start to destination zipcode", function() {
    const zipcodeCalculator = new ZipcodeCalculatorAPI();
    const distance = zipcodeCalculator.calculate("11.111-111", "99.999-999");
    expect(distance).toBe(1000);
})