import PlaceOrder from './PlaceOrder'
import PlaceOrderInput from './PlaceOrderInput';

test("Should make an Order", function() {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        coupon: "VALE20",
        zipcode: "11.111-111"
    })

    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5982);
})

test("Should make an Order with expired coupon", function() {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        coupon: "VALE20_EXPIRED",
        zipcode: "11.111-111"
    })

    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7400);
})

test("Should make an Order with freight calculate", function() {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        coupon: "VALE20_EXPIRED",
        zipcode: "11.111.111"
    })

    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.freight).toBe(310);
})