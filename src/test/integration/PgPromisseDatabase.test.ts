import PgPromisseDatabase from "../../infra/database/PgPromisseDatabase";

test("Should connect to database a return items", async function() {
    const pgPromiseDatabase = new PgPromisseDatabase();
    const itens = await pgPromiseDatabase.many("select * from ccca.item", []);
    expect(itens).toHaveLength(3);
});

test("Should connect to database a return a item", async function() {
    const pgPromiseDatabase = new PgPromisseDatabase();
    const item = await pgPromiseDatabase.one("select * from ccca.item where id = $i", [1]);
    expect(item.description).toBe("Guitarra");
});