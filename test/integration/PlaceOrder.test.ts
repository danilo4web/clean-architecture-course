import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import ZipCodeCalculatorAPIMemory from '../../src/infra/gateway/memory/ZipCodeCalculatorAPIMemory';
import PlaceOrder from '../../src/application/PlaceOrder'
import PlaceOrderInput from '../../src/application/PlaceOrderInput';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import PgPromisseDatabase from '../../src/infra/database/PgPromisseDatabase';

test("Should make an Order", async function () {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        items: [
            {id: "1", quantity: 2},
            {id: "2", quantity: 1},
            {id: "3", quantity: 3}
        ],
        coupon: "VALE20",
        zipcode: "11.111-111"
    })

    const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
    const itemRepository = new ItemRepositoryDatabase(new PgPromisseDatabase());
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const placeOrder = new PlaceOrder(zipCodeCalculator, itemRepository, couponRepository, orderRepository);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5982);
})

test("Should make an Order with expired coupon", async function () {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        items: [
            {id: "1", quantity: 2},
            {id: "2", quantity: 1},
            {id: "3", quantity: 3}
        ],
        coupon: "VALE20_EXPIRED",
        zipcode: "11.111-111"
    })

    const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
    const itemRepository = new ItemRepositoryDatabase(new PgPromisseDatabase());
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const placeOrder = new PlaceOrder(zipCodeCalculator, itemRepository, couponRepository, orderRepository);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(7400);
})

test("Should make an Order with freight calculate", async function () {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        items: [
            {id: "1", quantity: 2},
            {id: "2", quantity: 1},
            {id: "3", quantity: 3}
        ],
        coupon: "VALE20_EXPIRED",
        zipcode: "11.111.111"
    })

    const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
    const itemRepository = new ItemRepositoryDatabase(new PgPromisseDatabase());
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const placeOrder = new PlaceOrder(zipCodeCalculator, itemRepository, couponRepository, orderRepository);
    const output = await placeOrder.execute(input);
    expect(output.freight).toBe(310);
})