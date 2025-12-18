const express = require("express");
const router = require("./routes/router.js");
const session = require("express-session")
const { users } = require("./utils/constant.js");
const { Strategy } = require("passport-local");
const passport = require("passport");
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
  new Strategy((username, password, done) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect credentials." });
    }
  })
);

//after authentication, store user info in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//retrieve user info from session
passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  if (user) {
    done(null, user);
  } else {
    done(new Error("User not found"));
  }
});

app.use(router);

app.listen(port, () => {
  console.log("App running:", port);
});
