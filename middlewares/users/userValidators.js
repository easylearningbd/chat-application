/// external imports 
const {check, validationResult } = require("express-validator");
const { unlink } = require("fs");
const createError = require("http-errors");
const path = require("path");

const User = require("../../models/People");
// Add Validation for user 

const addUserValidators = [
     check("name")
     .isLength({ min: 1})
     .withMessage("Name is required")
     .isAlpha("en-US", {ignore: " -"})
     .withMessage("Name must not contain anything other then alphabet")
     .trim(),
     check("email")
     .isEmail()
     .withMessage("Invalid Email Address")
     .trim()
     .custom(async (value) => {
          try {
               const user = await User.findOne({ email: value});
               if(user) {
                    throw createError("Email already is use!");
               }
          } catch(err) {
               throw createError(err.message);
          }
     }),
     check("mobile")
     .isMobilePhone("bn-BD" , {
          strictMode:true,
     })
     .withMessage("Mobile number mush be a valid Country mobile number")
     .custom(async (value) => {
          try {
               const user = await User.findOne({ mobile: value});
               if(user) {
                    throw createError("Mobile already is use!");
               }
          } catch(err) {
               throw createError(err.message);
          }
     }),
     check("password")
     .isStrongPassword()
     .withMessage("Password must be at least 8 characters long it should be contain a least 1 lowercase, 1 uppercase, 1 number and also 1 symbol"),

];


const addUserValidationHandler = function (req, res, next) {
     const errors = validationResult(req);
     const mappedErrors = errors.mapped();
     if(Object.keys(mappedErrors).length === 0){
          next();
     }else{
          // remove uploaded files
          if(req.files.length > 0) {
               const {filename} = req.files[0];
               unlink(
                    path.join(__dirname, `/../public/uploads/avatars/${filename}`),
                    (err) => {
                         if(err) console.log(err);
                    }
               );
           }

           // response the error 
           res.status(500).json({
                errors:mappedErrors,
           });
     }
};


module.exports = {
     addUserValidators,
     addUserValidationHandler,
};