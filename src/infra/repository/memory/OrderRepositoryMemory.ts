import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];

    constructor() {
        this.orders = [];
    }

    async save(order: Order): Promise<void> {
        this.orders.push(order)
    }

    async get(code: string): Promise<Order> {
        const order = this.orders.find(order => order.code.value === code);
        if (!order) throw new Error("order not found");
        return Promise.resolve(order);
    }

    async count(): Promise<number> {
        return Promise.resolve(this.orders.length);
    }

    async clean(): Promise<void> {
        this.orders = [];
    }
}