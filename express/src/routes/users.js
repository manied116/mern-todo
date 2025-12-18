const express = require("express");
const { getUserById } = require("../utils/middleware");
const { users } = require("../utils/constant");
const { createUserValidationSchema } = require("../utils/validationSchema");
const { checkSchema, matchedData, validationResult } = require("express-validator");
const passport = require("passport");
const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send({ msg: "Root" });
});

UserRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({ error: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send({ msg: "Login successful", user });
    });
  })(req, res, next);
});

UserRouter.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  //res.cookie("user","Admin",{maxAge:60000*60,signed:true})
  //console.log(req.session)
  if (filter && value) {
    return res.send(users.filter((u) => String(u[filter]).includes(value)));
  }
  res.send(users);
});

UserRouter.post("/api/users", checkSchema(createUserValidationSchema), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ error: result.array() });
  }

  const body = matchedData(req);

  const new_user = {
    id: users[users.length - 1].id + 1,
    ...body,
  };

  users.push(new_user);

  return res.status(201).send(new_user);
});

UserRouter.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "Invalid Id" });
  }
  const user = users.find((u) => u.id === id);
  if (user) {
    return res.send(user);
  }
  return res.status(400).send({ msg: "User Not found" });
});

UserRouter.put("/api/users/:id", getUserById, (req, res) => {
  const id = parseInt(req.params.id);
  const { body, userIndex } = req;
  users[userIndex] = { id: id, ...body };
  return res.status(200).send({ msg: "User updated successfully.!" });
});

module.exports = UserRouter;
