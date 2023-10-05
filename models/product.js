const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOp;
        if(this._id) {
          //Update the product
          dbOp = db
            .collection('Products')
            .updateOne({_id: this._id}, {$set: this});
        } else {
           dbOp = db.collection('Products').insertOne(this); 
        }
        return dbOp
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
    }

    static fetchAll() {
        const db = getDb();
        return db  
           .collection("Products")
           .find()
           .toArray()
           .then(products => {
              console.log(products);
              return products;
           })
           .catch(err => {
            console.log(err);
           });
    }

    static findById(prodId) {
      const db = getDb();
      return db
        .collection('Products')
        .find({_id: new mongodb.ObjectId(prodId)})
        .next() //since find() returns an object but not a promise, hence we've to use next() before using then and catch blocks
        .then(product => {
            console.log(product);
            return product;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db  
          .collection('Products')
          .deleteOne({_id: new mongodb.ObjectId(prodId)}) //then why didn't we use next() after this here?
          .then(result => {
            console.log('Deleted');
          })
          .catch(err => {
            console.log(err);
          });
    }
}

module.exports = Product;