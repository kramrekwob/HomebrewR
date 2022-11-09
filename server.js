const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport configs
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Use EJS for views
app.set("view engine", "ejs");

//Static assets folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));


//Authentication stuff-
// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors
app.use(flash());

//Allow use of public folder
app.use(express.static("public"));

// Server Is Listening to main route, post route, comments
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes)

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}, you better go catch it!`);
});
