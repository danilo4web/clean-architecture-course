import Item from "./Item";

test("Should calculate an item volume", function () {
    const item = new Item("1", "Amplificador", 5000, 50, 50, 50, 22);
    const volume = item.getVolume();
    expect(volume).toBe(0.125);
});

test("Should calculate an item density", function () {
    const item = new Item("1", "Amplificador", 5000, 50, 50, 50, 22);
    const volume = item.getDensity();
    expect(volume).toBe(176);
});