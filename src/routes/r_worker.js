const router = require("express").Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
} = require("../controller/c_worker");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot", forgotPassword);
router.patch("/update-password", updatePassword);

module.exports = router;
