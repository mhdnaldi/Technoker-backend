const router = require("express").Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
  getAllWorker,
  postPortofolio
} = require("../controller/c_worker");

const { authorizationRecruiter, authorization, } = require('../middleware/auth')
router.get("/", authorizationRecruiter, getAllWorker)
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot", forgotPassword);
router.patch("/update-password", updatePassword);

module.exports = router;
