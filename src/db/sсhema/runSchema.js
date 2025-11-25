import fs from 'fs';
import path from 'path';
import { query } from '../db.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('Running schema...');
    await query(schema);

    console.log('✅ Schema executed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error executing schema:', err);
    process.exit(1);
  }
})();
