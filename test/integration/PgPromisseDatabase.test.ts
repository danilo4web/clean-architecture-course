import PgPromisseDatabase from "../../src/infra/database/PgPromisseDatabase";

test("Should connect to database and list items", async function() {
    const pgPromiseDatabase = new PgPromisseDatabase();
    const itens = await pgPromiseDatabase.many("select * from ccca.item", []);
    expect(itens).toHaveLength(3);
});

test("Should connect to database and list a item", async function() {
    const pgPromiseDatabase = new PgPromisseDatabase();
    const item = await pgPromiseDatabase.one("select * from ccca.item where id = $1", [1]);
    expect(item.description).toBe("Guitarra");
});