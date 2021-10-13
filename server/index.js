const express = require('express');

const app = express();
// const queries = require('../database/schema.js');
const cors = require('cors');

// serve static files from dist dir
app.use(express.static(`${__dirname}/../client/dist`));

// middleware
// use express.json for parsing JSON
app.use(express.json());
// use cors middleware for enabling CORS with various options
app.use(cors());

// get entries
// app.get('/entries', (req, res) => {
//   queries.getEntry(req.query.name, (err, entry) => {
//     if (err) {
//       res.status(404).send(err);
//     } else {
//       res.status(200).send(entry);
//     }
//   })
// });

// set port where server will listen
let port = process.env.PORT;
if (port == null || port === '') {
  port = 3001;
}

// tell server to listen on predefined port
app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});
