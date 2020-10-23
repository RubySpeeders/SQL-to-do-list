const pg = require('pg');

// DB Config Options
const Pool = pg.Pool;
const config = {
  database: '_db', // name of our database
  host: 'localhost', // where is your database
  port: 5432,
  max: 10, // how many connections
  idleTimeoutMillis: 30000, // 30 second timeout
};

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('Pool Connected');
});

pool.on('error', (err) => {
  console.log('Pool Error:', err);
});

module.exports = pool;
