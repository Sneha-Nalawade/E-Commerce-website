const path = require('path');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
// app.set('views', 'views');
app.set('views', path.join(__dirname, 'views'));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, 'public')));

//

const {authMiddleware} = require('./middlewares/authMiddleware');

const port = process.env.PORT || 8082;

mongoConnect(() => {
//    
// const User = require('./models/user');
// const getDb = require('./util/database').getDb;
// const db = getDb();
// const user = new User("Snehal", "xyz@email.com", {items:[]}, '65150866f287238bbdcc8905');
// db.collection('Users').insertOne(user);
//
// app.use((req, res, next) => {
//     User.findById('65150866f287238bbdcc8905')
//       .then(user => {
//         // console.log(user);
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         next();
//       })
//       .catch(err => console.log(err));
// })
////
    app.listen(port);
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

