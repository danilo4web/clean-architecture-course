import Order from "./Order"
import Coupon from "./Coupon"
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import FreightCalculator from "./FreightCalculator";
import ZipCodeCalculatorAPIMemory from "./ZipCodeCalculatorAPIMemory";
import ItemRepository from "./ItemRepository";
import CouponRepository from "./CouponRepository";
import OrderRepository from "./OrderRepository";

export default class PlaceOrder {
    zipcodeCalculator: ZipCodeCalculatorAPIMemory;
    itemRepository: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;

    constructor (itemRepository: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository) {
        this.itemRepository = itemRepository;
        this.couponRepository = couponRepository;
        this.orderRepository = orderRepository;
        this.zipcodeCalculator = new ZipCodeCalculatorAPIMemory();
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