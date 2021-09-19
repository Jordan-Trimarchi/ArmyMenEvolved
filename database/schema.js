const mongoose = require('mongoose');
 
// connect to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/knowYourBias', { useNewUrlParser: true });
const db = mongoose.connection;
 
// verify connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
 console.log('successful connection to mongodb!');
});
 
// create a new schema
const Schema = mongoose.Schema;
 
let EntriesSchema = new Schema({
 user_name: String,
 user_email: String,
 user_password: String
});
 
// create a model
let Entry = mongoose.model('Entry', EntriesSchema);
 
// GET document based on name
const getEntry = (name, cb) => {
 Entry.findOne({ user_name: name }, (error, entry) => {
  if (error) {
    cb(error, null);
  } else {
    cb(null, entry);
  }
})
};
 
module.exports = {
 getEntry
}
