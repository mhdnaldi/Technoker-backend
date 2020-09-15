const router = require("express").Router();
const { registerUser } = require("../controller/c_worker");

router.post("/register", registerUser);

module.exports = router;
