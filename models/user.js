const mongodb = require('mongodb');
const {mongoConnect, getDb} = require('../util/database');

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('Users').insertOne(this);
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if(cartProductIndex>=0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            });
        }
        const updatedCart = {
            items: updatedCartItems
        };
        const db = getDb();
        return db 
          .collection('Users')
          .updateOne({_id: new ObjectId(this._id)}, 
          {$set: { cart: updatedCart }}
          );
    }

    getCart() {
      const db = getDb();
      const productIds = this.cart.items.map(i => {
        return i.productId;
      });
      return db
        .collection('Products')
        .find({_id: { $in: productIds}})
        .toArray()
        .then(products => {
            return products.map(p => {
                return {
                    ...p,
                    quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                };
            });
        })
        .catch(err => console.log(err));
    }
     
    deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });
        const db = getDb();
        return db
          .collection('Users')
          .updateOne(
            { _id: new ObjectId(this._id)},
            { $set: { cart: {items: updatedCartItems}}}
          );
    }

    addOrder() {
        const db = getDb();
        return this.getCart()
          .then(products => {
            const order = {
                items: products,
                user: {
                    _id: new ObjectId(this._id),
                    name: this.name
                }
                //you can add more fields like total order price etc according to your need here
            };
            return db.collection('Orders').insertOne(order);
          })
          .then(result => {
            this.cart = {items: [] };
            return db
              .collection('Users')
              .updateOne(
                {_id: new ObjectId(this._id)},
                {$set: { cart: {items: []}}}
              );
          });
    }

    getOrders() {
        const db = getDb();
        return db
          .collection('Orders')
          .find({'user._id': new ObjectId(this._id)})  //jab nested way mein key bataana he ki exactly konsi he tab dot operator use karenge aur uss poore key ko single quotes mein likhenge
          .toArray();
    }

    static findUser(userId) {
        // const user = new User();
        // user.getDb();
        //************************* */
        // const db = getDb();
        // return db
        //   .collection('Users')
        //   .findOne({_id: new ObjectId(userId)})
        //   .then(user => {
        //     console.log(user);
        //     return user;
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
        //************************* */

        const user = this
        user.findUser(userId)
        .then((user)=>{
          console.log(user);
          return user;
        })
        .catch((err)=>{
          console.log(err);
        })
    }
}

module.exports = User;




//cart has a key named 'productId', while product and users have that key by the name '_id'