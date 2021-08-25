import pgp from "pg-promise";
import Database from "./Database";

export default class PgPromisseDatabase implements Database {
    private pgp: any;
    static instance: PgPromisseDatabase;

    private constructor() {
        const config = {
            user: 'postgres',
            password: '123456',
            host: '0.0.0.0',
            port: '5432',
            database: 'app'
        }
        this.pgp = pgp()(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
    }

    static getInstance(): PgPromisseDatabase {
        if (!PgPromisseDatabase.instance) {
            PgPromisseDatabase.instance = new PgPromisseDatabase();
        }

        return PgPromisseDatabase.instance;
    }

    many(query: string, parameters: any): any {
        return this.pgp.query(query, parameters);
    }

    one(query: string, parameters: any): any {
        return this.pgp.oneOrNone(query, parameters);
    }
}