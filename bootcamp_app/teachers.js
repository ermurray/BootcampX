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

pool.query(`
  SELECT DISTINCT teachers.name AS name, cohorts.name AS cohort
    FROM teachers
    JOIN assistance_requests ON teachers.id = teacher_id
    JOIN students ON students.id = student_id
    JOIN cohorts ON cohorts.id = cohort_id
    WHERE cohorts.name = '${args[0] || 'JUL02'}'
    ORDER BY teachers.name;
  `)
  .then((res) => {
    res.rows.forEach((teacher) => console.log(`${teacher.cohort}: ${teacher.name}`));
  })
  .then(() => {
    pool.end().then(() => console.log('btw the pool party has ended'));
  })
  .catch(err => {
    return console.error('query error', err.stack);
  });