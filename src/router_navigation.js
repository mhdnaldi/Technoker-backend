const route = require("express").Router();

const recruiter = require("./routes/r_recruiter");
const user = require("./routes/r_worker");
const porotofolio = require("./routes/r_portofolio");
const experience = require("./routes/r_experience");
const skill = require("./routes/r_skill");
const chat = require("./routes/r_chat");
const notification = require("./routes/r_notification");

route.use("/recruiter", recruiter);
route.use("/user", user);
route.use("/portofolio", porotofolio);
route.use("/experience", experience);
route.use("/skill", skill);
route.use("/chat", chat);
route.use("/notification", notification);

module.exports = route;
