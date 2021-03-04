require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

const args = process.argv.slice(2,4);
const qryStr = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;
const limit = args[1] || 5;
const values = [`%${args[0]}%`, limit];


pool.query(qryStr, values)
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  })
  .then(() => {
    pool.end().then(() => console.log('btw the pool party has ended'));
  })
  .catch(err => {
    return console.error('query error', err.stack);
  });
