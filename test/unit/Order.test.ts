
import Order from '../../src/domain/entity/Order';
import Coupon from '../../src/domain/entity/Coupon';

test("Should not make order with an invalid CPF", function () {
    const cpf = "111.111.111-11";
    expect(() => new Order(cpf)).toThrow(new Error("Invalid CPF"));
});

test("Should make order with three items", function() {
    const cpf = "778.278.412-36";
    
    const order = new Order(cpf);
    order.addItem("1", 1000, 2);
    order.addItem("2", 5000, 1);
    order.addItem("3", 30, 3);

    const total = order.getTotal();
    expect(total).toBe(7090);
});

test("Should make order with discount coupon", function() {
    const cpf = "778.278.412-36";
    
    const order = new Order(cpf);
    order.addItem("1", 1000, 2);
    order.addItem("2", 5000, 1);
    order.addItem("3", 30, 3);

    order.addCoupon(new Coupon("VALE20", 20, new Date("2021-10-10")));
    const total = order.getTotal();
    expect(total).toBe(5672);
});

test("Should make order with expired coupon", function() {
    const cpf = "778.278.412-36";
    
    const order = new Order(cpf);
    order.addItem("1", 1000, 2);
    order.addItem("2", 5000, 1);
    order.addItem("3", 30, 3);

    order.addCoupon(new Coupon("VALE20_EXPIRED", 20, new Date("2020-10-10")));
    const total = order.getTotal();
    expect(total).toBe(7090);
});

