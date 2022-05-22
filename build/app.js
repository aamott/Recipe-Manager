'use strict';
/************************
 * Entry point for the app
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;
app.use(cors()).use(bodyParser.json()).use('/', require('./routes/index'));
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
