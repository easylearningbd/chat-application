// External Imports 
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
// Internal Imports 
const {notFoundHandler,errorHandler} = require("./middlewares/commons/errorHandler");
const loginRouter = require("./router/loginRouter");


const app = express();
dotenv.config();

// Database Connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
})
.then(() => console.log("Database Connection Successful"))
.catch(err => console.log(err));


/// request parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// set View Engine 
app.set("view engine","ejs");

// set static folder 
app.use(express.static(path.join(__dirname, "public")));

/// parse Cookies 
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup 

app.use("/", loginRouter);
// app.use("/users", usersRouter);
// app.use("/inbox", inboxRouter);




// 404 not found handler 
app.use(notFoundHandler);

// common error handler 
app.use(errorHandler);



app.listen(process.env.PORT, () => {
     console.log(`App listening to port ${process.env.PORT}`);
});



