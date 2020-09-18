const route = require("express").Router();

const recruiter = require('./routes/r_recruiter');
const user = require("./routes/r_worker");
const porotofolio = require("./routes/r_portofolio");
const experience = require("./routes/r_experience");

route.use('/recruiter', recruiter);
route.use("/user", user);
route.use("/portofolio", porotofolio);
route.use("/experience", experience);

module.exports = route;
