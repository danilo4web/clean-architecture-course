import Coupon from "../../domain/entity/Coupon";

test("Should validate expires date", function() {
    const coupon = new Coupon("VALE20_EXPIRED", 20, new Date("2020-10-10"));
    expect (coupon.isExpered()).toBe(true);
});