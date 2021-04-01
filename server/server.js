// Boiler plate for require: Path, Express, Mongoose, BodyParser
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3010;

const apiRouter = require('./routes/api.js');
const userRouter = require('./routes/users.js')

// Connection info for mongoDB with recommended options after erroring out a bit
const mongoURI = 'mongodb+srv://madinventor:Foster367837@cluster0.a9sua.mongodb.net/chatLinez?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Automatically parse urlencoded body content
app.use(bodyParser.urlencoded({extended: true}))

// When running on node server and in production environment serve up our index.html
// if (process.env.NODE_ENV === 'production') {
  // Handle open ended path arguments by returning our basic index.html file
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
  });
// }

// Route handling for known routes
app.use('/api', apiRouter);
app.use('/api/users/', userRouter);
app.get('/dist', (req, res) => {
  return res.status(200).sendFile('/dist/build.js')
})

// Route handler for any requests to an unknown route
app.use('*', (req, res) => {
  console.log(process.env.NODE_ENV)
  res.status(404).send('The page your are looking for does not exist')
});

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
});

// start server instructions
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
}); // listens on port 3010 -> http://localhost:3010/

module.exports = app;