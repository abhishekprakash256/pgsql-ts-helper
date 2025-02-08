/*
file to create the db and db schema and tables
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
import { client } from './connector_sql'; // Import client
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to PostgreSQL (Assumes database & schema already exist)
            yield client.connect();
            console.log('Connected to PostgreSQL');
            // Ensure the table exists in the `contact` schema
            yield client.query(`
            CREATE TABLE IF NOT EXISTS contact.contacts (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                phone VARCHAR(15),
                address JSONB,  -- Store address as a JSONB object
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
            console.log('Table "contacts" ensured');
        }
        catch (error) {
            console.error('Error during database setup:', error);
        }
        finally {
            // Disconnect after setup
            yield client.end();
        }
    });
}
// export { setupDatabase };
setupDatabase();
