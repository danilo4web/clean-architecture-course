import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import OrderCode from "../../../domain/entity/OrderCode";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];

    constructor() {
        this.orders = [];
    }

    save(order: Order): void {
        this.orders.push(order)
    }

    get(code: string): Order {
        const order = this.orders.find(order => order.code.value === code);
        if (!order) throw new Error("order not found");
        return order;
    }

    count(): number {
        return this.orders.length;
    }
}