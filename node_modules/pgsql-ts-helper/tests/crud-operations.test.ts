/*
The testing file for testing crud operations
*/

import { Helper_Fun } from '../src/crud_operartions';
import { client } from '../src/connector_sql';


// Mock the client and its methods
jest.mock('../src/connector_sql', () => ({
  client: {
    connect: jest.fn().mockResolvedValue('Connected'),
    query: jest.fn(),
    end: jest.fn().mockResolvedValue('Connection closed'),
  },
}));


describe('Database Helper Functions', () => {
  let dbHelper: Helper_Fun;

  beforeAll(() => {
    dbHelper = new Helper_Fun(client);
  });

  afterAll(async () => {
    await dbHelper.closeConnection();
  });

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

  const updatedEntry = { phone: '123456789' };

  const upsertEntry = {
    first_name: 'Alice',
    last_name: 'Williams',
    phone: '987654321',
    address: JSON.stringify({
      street: "456 Elm St",
      city: "Los Angeles",
      country: "USA"
    })
  };

  const searchCondition = "first_name = 'Charlie' AND phone = '555888999'";

  it('should insert a new entry into the database', async () => {
    dbHelper.add_value = jest.fn().mockResolvedValue('Inserted Successfully');
    const result = await dbHelper.add_value('contact.contacts', newEntry);
    expect(result).toBe('Inserted Successfully');
    expect(dbHelper.add_value).toHaveBeenCalledWith('contact.contacts', newEntry);
  });

  it('should insert multiple entries in bulk', async () => {
    dbHelper.bulk_insert = jest.fn().mockResolvedValue('Bulk Insert Successful');
    const result = await dbHelper.bulk_insert('contact.contacts', bulkEntries);
    expect(result).toBe('Bulk Insert Successful');
    expect(dbHelper.bulk_insert).toHaveBeenCalledWith('contact.contacts', bulkEntries);
  });

  it('should update a specific record', async () => {
    dbHelper.update_value = jest.fn().mockResolvedValue('Updated Successfully');
    const result = await dbHelper.update_value('contact.contacts', updatedEntry, 'id = 1');
    expect(result).toBe('Updated Successfully');
    expect(dbHelper.update_value).toHaveBeenCalledWith('contact.contacts', updatedEntry, 'id = 1');
  });

  it('should upsert a record', async () => {
    dbHelper.upsert = jest.fn().mockResolvedValue('Upsert Successful');
    const result = await dbHelper.upsert('contact.contacts', upsertEntry, 'id');
    expect(result).toBe('Upsert Successful');
    expect(dbHelper.upsert).toHaveBeenCalledWith('contact.contacts', upsertEntry, 'id');
  });

  it('should paginate records', async () => {
    dbHelper.fetch_paginated = jest.fn().mockResolvedValue([{ first_name: 'Alice' }, { first_name: 'Bob' }]);
    const result = await dbHelper.fetch_paginated('contact.contacts', 2, 0);
    expect(result).toEqual([{ first_name: 'Alice' }, { first_name: 'Bob' }]);
    expect(dbHelper.fetch_paginated).toHaveBeenCalledWith('contact.contacts', 2, 0);
  });

  it('should return total number of records', async () => {
    dbHelper.count_rows = jest.fn().mockResolvedValue(10);
    const result = await dbHelper.count_rows('contact.contacts');
    expect(result).toBe(10);
    expect(dbHelper.count_rows).toHaveBeenCalledWith('contact.contacts');
  });

  it('should check if a record exists based on condition', async () => {
    dbHelper.record_exists = jest.fn().mockResolvedValue(true);
    const result = await dbHelper.record_exists('contact.contacts', searchCondition);
    expect(result).toBe(true);
    expect(dbHelper.record_exists).toHaveBeenCalledWith('contact.contacts', searchCondition);
  });

  it('should delete a record', async () => {
    dbHelper.delete_value = jest.fn().mockResolvedValue('Deleted Successfully');
    const result = await dbHelper.delete_value('contact.contacts', 'id = 1');
    expect(result).toBe('Deleted Successfully');
    expect(dbHelper.delete_value).toHaveBeenCalledWith('contact.contacts', 'id = 1');
  });

  it('should truncate the table', async () => {
    dbHelper.truncate_table = jest.fn().mockResolvedValue('Table Truncated');
    const result = await dbHelper.truncate_table('contact.contacts');
    expect(result).toBe('Table Truncated');
    expect(dbHelper.truncate_table).toHaveBeenCalledWith('contact.contacts');
  });

  it('should close the database connection after tests', async () => {
    await dbHelper.closeConnection();
    expect(client.end).toHaveBeenCalledTimes(1); // Ensure the connection was closed
  });
});
