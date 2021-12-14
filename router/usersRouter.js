const express = require("express");
const router = express.Router();

// internal imports 
const { getUsers } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/commons/decorateHtmlResponse");

const avatarUpload = require("../middlewares/users/avatarUpload");


// Login Page 
router.get("/", decorateHtmlResponse("Users"), getUsers);

/// Add User 
router.post("/", avatarUpload);


module.exports = router; 