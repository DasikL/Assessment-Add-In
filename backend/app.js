const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
// Create a new database in memory
const db = new sqlite3.Database(':memory:');

const app = express();
const PORT = 8080;

app.use(cors());

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
// Does not work on Windows
process.on('SIGTERM', () => {
  db.close();
  server.close(() => {
    console.log('Process terminated');
  });
});

// Create table and insert data
db.serialize(() => {
  db.run('CREATE TABLE buttons (BtnName VARCHAR(255), Breite INT, Höhe INT)');
  const stmt = db.prepare('INSERT INTO buttons VALUES (?, ?, ?)');

  for (let i = 0; i < 20; i++) {
    stmt.run(`Button ${i}`, randomVals(), randomVals());
  }

  stmt.finalize();

});


// Get buttons based on query
// parameter: btnName
app.get('/buttons/', (req, res) => {
  const btnName = req.param('btnName');
  db.all('SELECT * FROM buttons WHERE BtnName LIKE ?', ['%' + btnName + '%'], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});


//Helper function to generate random values between 50 and 500
function randomVals() {
  return Math.floor(Math.random() * 450) + 50;
}

