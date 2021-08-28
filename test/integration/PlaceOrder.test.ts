import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import ZipCodeCalculatorAPIMemory from '../../src/infra/gateway/memory/ZipCodeCalculatorAPIMemory';
import PlaceOrder from '../../src/application/PlaceOrder'
import PlaceOrderInput from '../../src/application/PlaceOrderInput';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import PgPromisseDatabase from '../../src/infra/database/PgPromisseDatabase';
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

test("Should make an Order", async function () {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111-111",
        items: [
            {id: "1", quantity: 2},
            {id: "2", quantity: 1},
            {id: "3", quantity: 3}
        ],
        coupon: "VALE20"
    })


    const itemRepository = new ItemRepositoryDatabase(PgPromisseDatabase.getInstance());
    const couponRepository = new CouponRepositoryDatabase(PgPromisseDatabase.getInstance());
    const orderRepository = new OrderRepositoryDatabase(PgPromisseDatabase.getInstance());
    await orderRepository.clean();
    const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(zipCodeCalculator, itemRepository, couponRepository, orderRepository);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5982);
})

test("Should make an Order with expired coupon", async function () {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111-111",
        items: [
            {id: "1", quantity: 2},
            {id: "2", quantity: 1},
            {id: "3", quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    })

    const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
    const itemRepository = new ItemRepositoryDatabase(PgPromisseDatabase.getInstance());
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryDatabase(PgPromisseDatabase.getInstance());
    await orderRepository.clean();
    const placeOrder = new PlaceOrder(zipCodeCalculator, itemRepository, couponRepository, orderRepository);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(7400);
})

test("Should make an Order with freight calculate", async function () {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111.111",
        items: [
            {id: "1", quantity: 2},
            {id: "2", quantity: 1},
            {id: "3", quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    })

    const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
    const itemRepository = new ItemRepositoryDatabase(PgPromisseDatabase.getInstance());
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryDatabase(PgPromisseDatabase.getInstance());
    await orderRepository.clean();
    const placeOrder = new PlaceOrder(zipCodeCalculator, itemRepository, couponRepository, orderRepository);
    const output = await placeOrder.execute(input);
    expect(output.freight).toBe(310);
})

test("Should make an Order with code calculate", async function () {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111.111",
        items: [
            {id: "1", quantity: 2},
            {id: "2", quantity: 1},
            {id: "3", quantity: 3}
        ],
        issueDate: new Date("2020-10-10"),
        coupon: "VALE20_EXPIRED"
    })

    const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
    const itemRepository = new ItemRepositoryDatabase(PgPromisseDatabase.getInstance());
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryDatabase(PgPromisseDatabase.getInstance());
    await orderRepository.clean();
    const placeOrder = new PlaceOrder(zipCodeCalculator, itemRepository, couponRepository, orderRepository);
    const output = await placeOrder.execute(input);
    expect(output.code.value).toBe("202000000001");
})