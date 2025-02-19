# **pg-ts-helper**

`pgsql-ts-helper` is a TypeScript package designed to simplify interactions with PostgreSQL databases. It provides easy-to-use methods for performing CRUD operations, as well as advanced features like upsert, pagination, record existence checks, and more. Whether you're building a small application or a large-scale system, this package helps you work with PostgreSQL seamlessly and efficiently.

## **Features**

- **CRUD Operations**: Easily insert, update, fetch, and delete data.
- **Bulk Insert**: Insert multiple records at once for better performance.
- **Pagination**: Retrieve data with pagination support for large datasets.
- **Count Rows**: Quickly get the number of rows in a table.
- **Record Existence Check**: Check if a record exists in a table.
- **Upsert**: Insert new records or update existing ones based on a unique column.
- **Flexible Querying**: Support for working with JSON and JSONB columns.
- **Connection Management**: Manage PostgreSQL client connection efficiently.

## **Installation**

To install `pgsql-ts-helper`, use npm or yarn:

```bash
npm install git@github.com:abhishekprakash256/pgsql-ts-helper.git
# or
yarn add npm install git@github.com:abhishekprakash256/pgsql-ts-helper.git
```

Ensure that you have PostgreSQL running and accessible before using this package.

## **Usage**

## Docker notes

Make sure docker pgresql conatiner is running follow the commmands 
Run the docker command with init.sql file can be found in github

## Docker Commands 

```bash

docker pull postgres

docker run -d --name postgres-container \
  -e POSTGRES_USER=abhi \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=contact \
  -v $(pwd)/init.sql:/docker-entrypoint-initdb.d/init.sql \
  -p 5432:5432 \
  postgres

docker rm $(docker ps -aq)

```



### **1. Import the Helper**

First, import the helper class into your TypeScript file:

```typescript
import { Helper_Fun } from 'pgsql-ts-helper';
```

### **2. Create an Instance of `Helper_Fun`**

You can now instantiate the `Helper_Fun` class and start performing operations:

```typescript
const dbHelper = new Helper_Fun(client);
```

### **3. Example Operations**

#### **Insert a Record**

```typescript
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

await dbHelper.add_value('contact.contacts', newEntry);
```

#### **Fetch All Records**

```typescript
const records = await dbHelper.get_all_values('contact.contacts');
console.log(records);
```

#### **Update a Record**

```typescript
const updatedEntry = { phone: '123456789' };
await dbHelper.update_value('contact.contacts', updatedEntry, 'id = 1');
```

#### **Delete a Record**

```typescript
await dbHelper.delete_value('contact.contacts', 'id = 1');
```

#### **Check if a Record Exists**

```typescript
const exists = await dbHelper.record_exists('contact.contacts', "first_name = 'Alice'");
console.log('Record exists:', exists);
```

#### **Upsert a Record**

```typescript
const entry = {
  first_name: 'Charlie',
  last_name: 'Brown',
  phone: '555888999',
  address: JSON.stringify({
    street: "321 Maple Ave",
    city: "Chicago",
    country: "USA"
  })
};

await dbHelper.upsert('contact.contacts', entry, 'phone');
```

#### **Bulk Insert**

```typescript
const bulkData = [
  { first_name: 'John', last_name: 'Doe', phone: '555000111', address: JSON.stringify({ street: '123 Main St', city: 'New York', country: 'USA' }) },
  { first_name: 'Jane', last_name: 'Smith', phone: '555000222', address: JSON.stringify({ street: '456 Oak St', city: 'Los Angeles', country: 'USA' }) }
];

await dbHelper.bulk_insert('contact.contacts', bulkData);
```

#### **Fetch With Pagination**

```typescript
const page = 1;
const pageSize = 10;
const paginatedData = await dbHelper.get_paginated_values('contact.contacts', page, pageSize);
console.log(paginatedData);
```

#### **Count Rows**

```typescript
const rowCount = await dbHelper.count_rows('contact.contacts');
console.log('Row count:', rowCount);
```

#### **Delete All Records**

```typescript
await dbHelper.delete_all('contact.contacts');
```

## **Methods Overview**

| Method                          | Description                                                      |
|----------------------------------|------------------------------------------------------------------|
| `add_value(table_name, entry)`   | Insert a new record into the specified table.                   |
| `get_all_values(table_name)`     | Fetch all records from the specified table.                     |
| `update_value(table_name, entry, condition)` | Update records in the table matching the condition.         |
| `delete_value(table_name, condition)` | Delete records in the table matching the condition.           |
| `record_exists(table_name, condition)` | Check if a record exists in the table based on a condition.  |
| `upsert(table_name, entry, unique_column)` | Insert or update a record in the table.                      |
| `bulk_insert(table_name, data)`  | Insert multiple records at once.                                |
| `get_paginated_values(table_name, page, pageSize)` | Fetch records with pagination support.           |
| `count_rows(table_name)`         | Get the number of rows in the specified table.                  |
| `delete_all(table_name)`         | Delete all records in the specified table.                      |

## **Contributing**

If you'd like to contribute to the project, feel free to fork the repository, make changes, and submit a pull request. Please ensure that any changes are well-tested and documented.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
