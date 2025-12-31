const express = require("express");
const router = require("./routes/router.js");
const session = require("express-session")
// const { users } = require("../src/utils/constant");
const { Strategy } = require("passport-local");
const passport = require("passport");
const mongoose = require("mongoose");
const { User } = require("./schema");
const { verifyPassword } = require("./utils/helper.js");

mongoose.connect("mongodb://localhost:27017/todoapp").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});


const app = express();
const port = 3000;
app.use(express.json());
app.use(
  session({
    secret:"my secret",
    saveUninitialized:false,
    resave:false,
    cookie:{
      maxAge:60000*60
    }
  })
)
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy(async(username, password, done) => {
    try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if ( !verifyPassword(password, user.password)) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
    } catch (error) {
      return done(error,false);
    }
    
    // const user = users.find(
    //   (u) => u.username === username && u.password === password
    // );
    // if (user) {
    //   return done(null, user);
    // } else {
    //   return done(null, false, { message: "Incorrect credentials." });
    // }
  })
);

//after authentication, store user info in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//retrieve user info from session
passport.deserializeUser(async(id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      done(null, user);
    } else {
      done(new Error("User not found"));
    }
  } catch (error) {
    done(error,false);
  }
});

app.use(router);

app.listen(port, () => {
  console.log("App running:", port);
});
