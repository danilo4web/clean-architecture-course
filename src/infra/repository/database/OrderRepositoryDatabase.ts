import Database from "../../database/Database";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Order from "../../../domain/entity/Order";
import Coupon from "../../../domain/entity/Coupon";

export default class OrderRepositoryDatabase implements OrderRepository
{
    database: Database;

    constructor (database: Database) {
        this.database = database;
    }

    async save(order: Order): Promise<void> {
        const orderData = await this.database.one(
            "INSERT INTO ccca.order (coupon_code, code, cpf, issue_date, freight, serial) returning * VALUES ($1, $2, $3, $4, $5, $6)",
            [order.coupon?.code, order.code.value, order.cpf, order.issueDate, order.freight, order.sequence]
        );
        for (const orderItem of order.items) {
            await this.database.one("INSERT INTO ccca.order_item (order_item, id_item, price,quantity) VALUES ($1, $2, $3, $4)", [order.code, orderItem.id, orderItem.price, orderItem.quantity]);
        }
    }

    async get(code: string): Promise<Order> {
        const orderData = await this.database.one("SELECT * FROM ccca.order WHERE code = $1", [code]);
        const orderItemsData = await this.database.many("SELECT * FROM ccca.order_item WHERE order_item = $1", [orderData.id]);

        const order = new Order(orderData.cpf, new Date(orderData.issueDate), orderData.serial);

        for (const orderItemData of orderItemsData) {
            order.addItem(orderItemData.id_item, parseFloat(orderItemData.price), orderItemData.quantity);
        }
        if (orderData.coupon_code) {
            const couponData = await this.database.one("SELECT * FROM ccca.coupon where code = $1", [orderData.coupon_code])
            const coupon = new Coupon(couponData.code, couponData.percentage, new Date(couponData.expireDate));
            order.addCoupon(coupon);
        }
        order.freight = parseFloat(orderData.freight);
        return new Order(
            orderData.cpf,
            orderData.items,
            orderData.freight
        );
    }

    async count(): Promise<number> {
        const countData = this.database.one("SELECT COUNT(*)::int as count FROM ccca.order", []);
        return countData.count;
    }

    async clean(): Promise<void> {
        await this.database.none("delete from ccca.order", []);
    }
}