import { createPool } from 'mysql2';

const pool = createPool({
  host: '127.0.0.1',
  user: 'root',
  database: 'baeduo',
  password: 'test123456!@',
});

export default pool.promise();
