import pgp from "pg-promise";
import Database from "./Database";

export default class PgPromisseDatabase implements Database {
    pgp: any;

    constructor() {
        const config = {
            user: 'postgres',
            password: '123456',
            host: '0.0.0.0',
            port: '5432',
            database: 'app'
        }
        this.pgp = pgp()(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
    }

    many(query: string, parameters: any): any {
        return this.pgp.query(query, parameters);
    }

    one(query: string, parameters: any): any {
        return this.pgp.oneOrNone(query, parameters);
    }
}