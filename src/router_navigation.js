const route = require("express").Router();

const user = require("./routes/r_worker");

route.use("/user", user);

module.exports = route;
