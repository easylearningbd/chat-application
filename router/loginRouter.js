const express = require("express");
const router = express.Router();

// internal imports 
const { getLogin, login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/commons/decorateHtmlResponse");
const { doLoginValidators, doLoginValidationHandler } = require("../middlewares/login/loginValidators");

// set page title 
const page_title = "Login";


// Login Page 
router.get("/", decorateHtmlResponse(page_title), getLogin);

router.post("/",  decorateHtmlResponse(page_title), 
doLoginValidators,
doLoginValidationHandler,
login);




module.exports = router;  