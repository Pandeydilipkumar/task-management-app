// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRoutes = require('./src/api/routes');
const connectDB = require('./src/models/db');
require('dotenv').config()
const port = process.env.PORT || 3000;
const cors = require('cors');

connectDB();
app.use(bodyParser.json());
// Middleware to parse URL-encoded data (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors("*"));


// Basic helth-check route
app.get('/health-check', (req, res) => {
  res.send({"status": "ok"});
});

// Use the API routes
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});