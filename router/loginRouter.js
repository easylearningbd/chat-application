const express = require("express");
const router = express.Router();

// internal imports 
const { getLogin, login, logout } = require("../controller/loginController");
const { redirectLoggedIn } = require("../middlewares/commons/checkLogin");
const decorateHtmlResponse = require("../middlewares/commons/decorateHtmlResponse");
const { doLoginValidators, doLoginValidationHandler } = require("../middlewares/login/loginValidators");

// set page title 
const page_title = "Login";


// Login Page 
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn,  getLogin);

router.post("/",  decorateHtmlResponse(page_title), 
doLoginValidators,
doLoginValidationHandler,
login);

// Logout User 
router.delete("/" , logout);


module.exports = router;  