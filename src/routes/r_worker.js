const router = require("express").Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
  getWorkerById,
  patchDataWorker,
  getAllWorker,
  getWorkerByName,
} = require("../controller/c_worker");
const upload = require("../middleware/multer_worker");
const { authorizationRecruiter, authorization } = require("../middleware/auth");

router.get("/:id", getWorkerById);
router.get("/", authorizationRecruiter, getAllWorker);
router.get("/search", getWorkerByName);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot", forgotPassword);
router.patch("/update-password", updatePassword);
router.patch("/:id", upload, patchDataWorker);

module.exports = router;
