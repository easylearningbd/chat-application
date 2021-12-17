const express = require("express");
const router = express.Router();

// internal imports 
const { getLogin } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/commons/decorateHtmlResponse");


// Login Page 
router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;  