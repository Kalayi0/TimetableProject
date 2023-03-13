const express = require('express');
const db = require('./utils/database');
const path = require('path');
const mysql = require('mysql2')

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Set the views directory
app.set('views', './views');
// Set the view engine to EJS
app.set('view engine', 'ejs');

//Routes for Viewing the Login and timetable page on the server
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/timetable', (req, res) => {
  res.render('timetable');
});

// Route to retrieve all data needed for the scheduling from the database
app.get('/data', (req, res) => {
  db.query('SELECT * FROM timetable.items', (error, results, fields) => {
    if (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Error retrieving data');
    } else {
      console.log('Retrieved data:', results);
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/login`);
});
