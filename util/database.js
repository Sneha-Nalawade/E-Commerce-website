const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

require('dotenv').config();
// const MONGO_URI = process.env.MONGO_URI;

let _db;

// const mongoConnect = callback => {
//     MongoClient.connect(process.env.MONGO_URI)
//      .then(client => {
//         console.log('Connected!');
//         _db = client.db()  //where is db() declared???
//         callback();
//      })
//      .catch(err => {
//         console.log(err);
//         // throw err;
//      });
// };

// const getDB = () => {
//     if(_db) {
//         return _db;
//     }
//     throw 'No database found!';
// };

// exports.mongoConnect = mongoConnect;
// exports.getDB = getDB;
module.exports = {
    mongoConnect: function(callback) {MongoClient.connect(process.env.MONGO_URI)
        .then(client => {
           console.log('Connected!');
           _db = client.db()  //the .db() method is a standard and fundamental method provided by the MongoDB Node.js driver's MongoClient object for accessing a specific database. This method allows you to obtain a reference to a MongoDB database, which you can then use to perform various database operations (e.g., querying, inserting, updating, or deleting documents) within that database.
           callback();
        })
        .catch(err => {
           console.log(err);
           // throw err;
        });},

    getDb: function() {
        if(_db) {
        return _db;
        }
        // throw new Error('No database found!');
        console.log('No database found!');
    }
};