const express = require('express');
const { randomUUID } = require('crypto');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodejs'
};

const mysql = require('mysql2');
const connection = mysql.createPool(config).promise();

const escapeHtml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

app.get('/', async (req, res) => {
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);
    const name = `NAME-${randomUUID()}`;
    await connection.execute('INSERT INTO people (name) VALUES (?)', [name]);
    const [people] = await connection.query('SELECT name FROM people ORDER BY id');
    const names = people.map(({ name }) => `<li>${escapeHtml(name)}</li>`).join('');

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>${names}</ul>
    `);
  } catch (error) {
    console.error('Failed to process request:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

