import Order from "./Order"
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import FreightCalculator from "./FreightCalculator";
import ItemRepository from "./ItemRepository";
import CouponRepository from "./CouponRepository";
import OrderRepository from "./OrderRepository";
import ZipcodeCalculatorAPIMemory from "./ZipCodeCalculatorAPIMemory";

export default class PlaceOrder {
    zipcodeCalculator: ZipcodeCalculatorAPIMemory;
    itemRepository: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;

    constructor (
        zipCodeCalculator: ZipcodeCalculatorAPIMemory,
        itemRepository: ItemRepository, 
        couponRepository: CouponRepository, 
        orderRepository: OrderRepository
    ) {
        this.itemRepository = itemRepository;
        this.couponRepository = couponRepository;
        this.orderRepository = orderRepository;
        this.zipcodeCalculator = zipCodeCalculator;
    }

    execute (input: PlaceOrderInput): PlaceOrderOutput {
        const order = new Order(input.cpf);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, "99.999-999");

        for (const orderItem of input.items) {
            const item = this.itemRepository.getById(orderItem.id);

            if (!item) throw new Error("Item not found");
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
        }
        if (input.coupon) {
            const coupon = this.couponRepository.getByCode(input.coupon);
            if (coupon) {
                order.addCoupon(coupon);
            }
        }
        const total = order.getTotal();
        this.orderRepository.save(order);
        return new PlaceOrderOutput({
            total,
            freight: order.freight
        });
    }
}