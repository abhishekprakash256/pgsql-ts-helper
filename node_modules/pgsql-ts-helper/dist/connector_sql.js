"use strict";
/*
The function to make the connection with postgresql

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: 'abhi',
    host: 'localhost',
    database: 'contact',
    password: 'mypassword',
    port: 5432,
});
exports.client = client;
client.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error(" Database Connection Error:", err));
//console.log(client) ; 
//# sourceMappingURL=connector_sql.js.map