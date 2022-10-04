module.exports = (app) => {
  let router = require("express").Router();
  let userControllers = require("../controller/controller.js");

  router.post("/register", userControllers.userRegistration);

  router.post("/login", userControllers.userLogin);

  app.use("/", router);
};
