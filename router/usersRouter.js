const express = require("express");
const router = express.Router();

// internal imports 
const { getUsers, addUser,removeUser } = require("../controller/usersController");
const { checkLogin } = require("../middlewares/commons/checkLogin");
const decorateHtmlResponse = require("../middlewares/commons/decorateHtmlResponse");

const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/users/userValidators");

 
// Login Page 
router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);

/// Add User 
router.post("/", 
avatarUpload,
addUserValidators,
addUserValidationHandler,
addUser
);

router.delete("/:id", removeUser);


module.exports = router; 