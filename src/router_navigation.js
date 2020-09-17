const route = require("express").Router();

const recruiter = require('./routes/r_recruiter');
const user = require("./routes/r_worker");
const porotofolio = require("./routes/r_portofolio");

route.use('/recruiter', recruiter);
route.use("/user", user);
route.use("/portofolio", porotofolio);

module.exports = route;
