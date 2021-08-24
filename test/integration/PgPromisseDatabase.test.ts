import PgPromisseDatabase from "../../src/infra/database/PgPromisseDatabase";

test("Should connect to the database and list 3 items", async function() {
    const pgPromiseDatabase = new PgPromisseDatabase();
    const items = await pgPromiseDatabase.many("SELECT * FROM ccca.item LIMIT 3", []);
    expect(items).toHaveLength(3);
});

test("Should connect to the database and list a item", async function() {
    const pgPromiseDatabase = new PgPromisseDatabase();
    const item = await pgPromiseDatabase.one("SELECT * FROM ccca.item WHERE id = $1", [1]);
    expect(item.description).toBe("Guitarra");
});