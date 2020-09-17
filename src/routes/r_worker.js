const router = require("express").Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
  getWorkerById,
  patchDataWorker,
} = require("../controller/c_worker");
const upload = require("../middleware/multer_worker");

router.get("/:id", getWorkerById);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot", forgotPassword);
router.patch("/update-password", updatePassword);
router.patch("/:id", upload, patchDataWorker);

module.exports = router;
