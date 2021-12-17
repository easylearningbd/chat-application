const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports 
const User = require("../models/People");


// Get login page 
function getLogin(req,res,next){
     res.render("index");
}


// DO User Login 
async function login(req, res, next){
     try{
          // find a user who has this email / mobile 
          const user = await User.findOne({
               $or: [{ email: req.body.username } , {mobile: req.body.username}],
          });
          if(user && user._id){
               const isValidPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
               );

               if(isValidPassword)
               // prepare the user object to generate token 
               const userObject = {
                    username: user.name,
                    mobile : user.mobile,
                    email: user.email,
                    role: "user",
               };

               // Generate Token
          }

     }

}




module.exports = {
     getLogin,
     login,
} 