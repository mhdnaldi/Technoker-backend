const route = require("express").Router();

const recruiter = require('./routes/r_recruiter');
const user = require("./routes/r_worker");

route.use('/recruiter', recruiter);
route.use("/user", user);

module.exports = route;
