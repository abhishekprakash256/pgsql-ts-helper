"use strict";
/*
the file to insert the data into the database
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { DBHelper } from './crud_operartions';
//import { client } from './connector_sql';  // Import client to close after execution
// THE CONSTS
const DATA_BASE_NAME = 'contact';
const TABLE_NAME = 'contact.contacts';
const crud_operartions_1 = require("./crud_operartions");
const connector_sql_1 = require("./connector_sql");
// Inserting a new record
const newEntry = {
    first_name: 'Alice',
    last_name: 'Johnson',
    phone: '987654321',
    address: JSON.stringify({
        street: "456 Elm St",
        city: "Los Angeles",
        country: "USA"
    })
};
const bulkEntries = [
    {
        first_name: 'Alice',
        last_name: 'Johnson',
        phone: '987654321',
        address: JSON.stringify({
            street: "456 Elm St",
            city: "Los Angeles",
            country: "USA"
        })
    },
    {
        first_name: 'Bob',
        last_name: 'Smith',
        phone: '123456789',
        address: JSON.stringify({
            street: "789 Oak St",
            city: "New York",
            country: "USA"
        })
    },
    {
        first_name: 'Charlie',
        last_name: 'Brown',
        phone: '555888999',
        address: JSON.stringify({
            street: "321 Maple Ave",
            city: "Chicago",
            country: "USA"
        })
    }
];
const upsertEntry = {
    first_name: 'Alice',
    last_name: 'Williams', // Changed last name to test update
    phone: '987654321',
    address: JSON.stringify({
        street: "456 Elm St",
        city: "Los Angeles",
        country: "USA"
    })
};
const searchCondition = "first_name = 'Charlie' AND phone = '555888999'";
// Create an instance of Helper_Fun
const dbHelper = new crud_operartions_1.Helper_Fun(connector_sql_1.client);
function test_fun() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //insert the one data
            yield dbHelper.add_value(TABLE_NAME, newEntry);
            //insert the data in bulk
            yield dbHelper.bulk_insert(TABLE_NAME, bulkEntries);
            // Updating a record
            const updatedEntry = { phone: '123456789' };
            //update one value 
            yield dbHelper.update_value(TABLE_NAME, updatedEntry, 'id = 1');
            //upsert the value
            yield dbHelper.upsert(TABLE_NAME, upsertEntry, "id");
            //paignation of users
            const paginatedUsers = yield dbHelper.fetch_paginated(TABLE_NAME, 5, 0);
            console.log("Paginated Users:", paginatedUsers);
            // Deleting a record
            yield dbHelper.delete_value(TABLE_NAME, 'id = 1');
            //get the total users
            const totalUsers = yield dbHelper.count_rows(TABLE_NAME);
            console.log(`Total Users: ${totalUsers}`);
            // Searching for a record
            yield dbHelper.search_value(TABLE_NAME, "first_name = 'Alice'");
            //get the user as per condition
            const userExists = yield dbHelper.record_exists(TABLE_NAME, searchCondition);
            console.log("User Exists:", userExists);
            // Fetching all records
            yield dbHelper.get_all_values(TABLE_NAME);
            // the function to delete all the values
            yield dbHelper.truncate_table(TABLE_NAME);
        }
        catch (error) {
            console.error("Error:", error);
        }
        finally {
            yield dbHelper.closeConnection();
        }
    });
}
// all the tests are working and passing
test_fun(); // Call the function
//# sourceMappingURL=test.js.map