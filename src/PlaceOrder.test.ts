import PlaceOrder from './PlaceOrder'
import PlaceOrderInput from './PlaceOrderInput';

test("Should make an Order", function() {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        items: [
            { description: "Guitarra", price: 1000, quantity: 2 },
            { description: "Amplificador", price: 5000, quantity: 1 },
            { description: "Cabo", price: 30, quantity: 3 }
        ],
        coupon: "VALE20"
    })

    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5672);
})

test("Should make an Order with expired coupon", function() {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        items: [
            { description: "Guitarra", price: 1000, quantity: 2 },
            { description: "Amplificador", price: 5000, quantity: 1 },
            { description: "Cabo", price: 30, quantity: 3 }
        ],
        coupon: "VALE20_EXPIRED"
    })

    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7090);
})