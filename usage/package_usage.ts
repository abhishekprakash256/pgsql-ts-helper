/*
The file to test the package 
*/


import { Helper_Fun } from 'pgsql-ts-helper';
import { client } from 'pgsql-ts-helper';

const TABLE_NAME :string = 'contact.contacts'; 


//make the dummy data 

const newEntry = {
    first_name: 'Abhi',
    last_name: 'Prakash',
    phone: '123456789',
    address: JSON.stringify({
      street: "400 hayden Rd",
      city: "Tally",
      country: "USA"
    })
  };


// insert the data 
const dbHelper = new Helper_Fun(client);


async function test_fun() {

    try 
    {
    //insert the one data
    await dbHelper.add_value(TABLE_NAME, newEntry);

    // Fetching all records
    await dbHelper.get_all_values(TABLE_NAME);

    // the function to delete all the values
    await dbHelper.truncate_table(TABLE_NAME);
    }
    catch (error) {

        console.error("Error:", error);
    } 
    
    finally {
        await dbHelper.closeConnection();
    }

}


//start the test function
test_fun() ; 