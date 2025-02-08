// the file to get make the crud operations in postgresql 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import { client } from './connector_sql';  // import the clinedt
//import { setupDatabase } from './create_db_schema' ; 
// Make sure 'client' is passed to the constructor
class Helper_Fun {
    constructor(client) {
        this.client = client;
    }
    // Method to insert data into a table
    add_value(table_name, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Inserting into table: ${table_name}`);
                // Extract columns and values
                const columns = Object.keys(entry).join(", ");
                const values = Object.values(entry);
                const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
                const query = `INSERT INTO ${table_name} (${columns}) VALUES (${placeholders})`;
                yield this.client.query(query, values);
                console.log("Value inserted successfully");
            }
            catch (error) {
                console.error(" Error inserting value:", error);
            }
        });
    }
    // Fetch Data and Close Connection
    get_all_values(table_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Fetching all values from table: ${table_name}`);
                const query = `SELECT * FROM ${table_name}`;
                const result = yield this.client.query(query);
                console.log("Retrieved Data:", result.rows);
                return result.rows;
            }
            catch (error) {
                console.error("Error retrieving data:", error);
                return [];
            }
        });
    }
    // Method to update an existing value in a table
    update_value(table_name, entry, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Updating value in table: ${table_name}`);
                // Extract columns, values, and build SET statement
                const columns = Object.keys(entry);
                const values = Object.values(entry);
                const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(", ");
                // The condition is assumed to be like 'id = 1'
                const query = `UPDATE ${table_name} SET ${setClause} WHERE ${condition}`;
                yield this.client.query(query, values);
                console.log("Value updated successfully");
            }
            catch (error) {
                console.error("Error updating value:", error);
            }
        });
    }
    // Method to delete a value from a table
    delete_value(table_name, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Deleting value from table: ${table_name}`);
                // The condition is assumed to be like 'id = 1'
                const query = `DELETE FROM ${table_name} WHERE ${condition}`;
                yield this.client.query(query);
                console.log("Value deleted successfully");
            }
            catch (error) {
                console.error("Error deleting value:", error);
            }
        });
    }
    // Method to search for a specific value in a table based on a condition
    search_value(table_name, search_condition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Searching value in table: ${table_name}`);
                // The search condition is assumed to be like 'name = 'Alice''
                const query = `SELECT * FROM ${table_name} WHERE ${search_condition}`;
                const result = yield this.client.query(query);
                console.log("Search results:", result.rows);
                return result.rows;
            }
            catch (error) {
                console.error("Error searching value:", error);
                return [];
            }
        });
    }
    bulk_insert(table_name, entries) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Bulk inserting into ${table_name}`);
                const keys = Object.keys(entries[0]);
                const columns = keys.join(", ");
                const values = entries
                    .map((entry, i) => `(${keys.map((_, j) => `$${i * keys.length + j + 1}`).join(", ")})`)
                    .join(", ");
                const flattenedValues = entries.flatMap(Object.values);
                const query = `INSERT INTO ${table_name} (${columns}) VALUES ${values} RETURNING *`;
                const result = yield this.client.query(query, flattenedValues);
                console.log("Bulk insert successful:", result.rows);
                return result.rows;
            }
            catch (error) {
                console.error("Error in bulk insert:", error);
                throw error;
            }
        });
    }
    fetch_paginated(table_name, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Fetching paginated data from ${table_name}`);
                const query = `SELECT * FROM ${table_name} LIMIT $1 OFFSET $2`;
                const result = yield this.client.query(query, [limit, offset]);
                console.log("Paginated Data:", result.rows);
                return result.rows;
            }
            catch (error) {
                console.error("Error fetching paginated data:", error);
                throw error;
            }
        });
    }
    count_rows(table_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT COUNT(*) FROM ${table_name}`;
                const result = yield this.client.query(query);
                console.log(`Total Rows in ${table_name}:`, result.rows[0].count);
                return result.rows[0].count;
            }
            catch (error) {
                console.error("Error counting rows:", error);
                throw error;
            }
        });
    }
    record_exists(table_name, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT EXISTS (SELECT 1 FROM ${table_name} WHERE ${condition})`;
                const result = yield this.client.query(query);
                console.log(`Record Exists?`, result.rows[0].exists);
                return result.rows[0].exists;
            }
            catch (error) {
                console.error(" Error checking record existence:", error);
                throw error;
            }
        });
    }
    upsert(table_name, entry, unique_column) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Upserting into ${table_name}`);
                const columns = Object.keys(entry);
                const values = Object.values(entry);
                const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
                const updates = columns.map((col) => `${col} = EXCLUDED.${col}`).join(", ");
                // Ensure the unique_column has a unique constraint in the database
                const query = `
          INSERT INTO ${table_name} (${columns.join(", ")}) 
          VALUES (${placeholders}) 
          ON CONFLICT (${unique_column}) 
          DO UPDATE SET ${updates} RETURNING *`;
                const result = yield this.client.query(query, values);
                console.log("Upsert successful:", result.rows[0]);
                return result.rows[0];
            }
            catch (error) {
                console.error("Error in upsert:", error);
                throw error;
            }
        });
    }
    truncate_table(table_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Construct the query to truncate the table
                const query = `TRUNCATE TABLE ${table_name} RESTART IDENTITY CASCADE`;
                // Execute the query
                yield this.client.query(query);
                console.log(`Table truncated and all records deleted from: ${table_name}`);
            }
            catch (error) {
                console.error("Error truncating the table:", error);
                throw error;
            }
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            close the connection if needed
            */
            try {
                yield this.client.end();
                console.log("Database connection closed");
            }
            catch (error) {
                console.error("Error closing connection:", error);
            }
        });
    }
}
//test the database addtion of the data 
//const DBHelper = new Helper_Fun(client);
export { Helper_Fun };
