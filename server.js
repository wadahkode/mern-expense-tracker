const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
connectDB();
const transactions = require('./routes/transactions');
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path, resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.use('/api/v1/transactions', transactions);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`app running in ${process.env.NODE_ENV} on ${PORT}`.yellow.bold)
);