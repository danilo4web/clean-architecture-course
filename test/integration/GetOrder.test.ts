import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import ZipCodeCalculatorAPIMemory from '../../src/infra/gateway/memory/ZipCodeCalculatorAPIMemory';
import PlaceOrder from '../../src/application/PlaceOrder'
import PlaceOrderInput from '../../src/application/PlaceOrderInput';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import PgPromisseDatabase from '../../src/infra/database/PgPromisseDatabase';
import GetOrder from "../../src/application/GetOrder";

test("Should find an Order", async function () {
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
    const itemRepository = new ItemRepositoryDatabase(PgPromisseDatabase.getInstance());
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const placeOrder = new PlaceOrder(zipCodeCalculator, itemRepository, couponRepository, orderRepository);
    const output = await placeOrder.execute(input);
    const getOrder = new GetOrder(itemRepository, couponRepository, orderRepository);
    const getOrderOutput = await getOrder.execute(output.code.value);
    expect(getOrderOutput.total).toBe(5982);
})