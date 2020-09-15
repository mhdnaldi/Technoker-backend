const route = require("express").Router();

const reqruiter = require('./routes/r_reqruiter');
const user = require("./routes/r_worker");

route.use('/reqruiter', reqruiter);
route.use("/user", user);

module.exports = route;
