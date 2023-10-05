// // authMiddleware.js

const User = require('../models/user');

module.exports.authMiddleware = (req, res, next) => {
    User.findById('65150866f287238bbdcc8905')
      .then(user => {
        console.log("hiii2")
        console.log(user);
        // req.user = new User(user.name, user.email, user.cart, user._id);
        req.user = {
            name: user.name,
            email: user.email,
            cart: user.cart,
            _id: user._id
        };
        next();
      })
      .catch( (err) =>
        console.log(err),
        console.log("hii"),
        res.status(403).send("Error getting user")
        );
}


// const User = require('../models/user'); // Import your User model

// module.exports = (req, res, next) => {
//   // You can retrieve the user information based on your authentication mechanism.
//   // For example, if you have a user ID in the session or a token in the request headers,
//   // you can use that information to fetch the user from the database.
//   const userId = '65150866f287238bbdcc8905'; // Replace with your actual authentication logic

//   User.findById(userId)
//       .then(user => {
//       console.log(user);
//       // req.user = {user}; // Assuming user is already a User model instance
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       console.log(req.user);
//       next();
//     })
//     .catch(err => {
//       console.error(err);
//       // next(err); // Pass the error to the next middleware (error handling middleware)
//     });
// };

