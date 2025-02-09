declare class Helper_Fun {
    client: any;
    constructor(client: any);
    add_value(table_name: string, entry: object): Promise<void>;
    get_all_values(table_name: string): Promise<any>;
    update_value(table_name: string, entry: object, condition: string): Promise<void>;
    delete_value(table_name: string, condition: string): Promise<void>;
    search_value(table_name: string, search_condition: string): Promise<any>;
    bulk_insert(table_name: string, entries: object[]): Promise<any>;
    fetch_paginated(table_name: string, limit: number, offset: number): Promise<any>;
    count_rows(table_name: string): Promise<any>;
    record_exists(table_name: string, condition: string): Promise<any>;
    upsert(table_name: string, entry: object, unique_column: string): Promise<any>;
    truncate_table(table_name: string): Promise<void>;
    closeConnection(): Promise<void>;
}
export { Helper_Fun };
