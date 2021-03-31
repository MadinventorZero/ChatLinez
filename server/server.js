const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const PORT = 3010;

// Connection info for mongoDB
const mongoURI = 'mongodb+srv://madinventor:Foster367837@cluster0.a9sua.mongodb.net/chatLinez?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Handle open ended path arguments by returning our basic index.html file
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
})



// Route handler for any requests to an unknown route
app.use('*', (req, res) => {
  res.status(404).send('The page your are looking for does not exist')
})

// Global error object to obfuscate error messages that shouldn't be sent to end users
const defaultErr = {
  log: 'Express error handler caught unknown middle error',
  status: 400,
  message: {err: 'An error occured, please check your route paths or request body'}
}

// Global error handler
app.use(function(err, req, res, next) {
  const errorObj = Object.assign(defaultErr);
  errorObj.message.err = err;
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
})

// start server instructions
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})

module.exports = app;