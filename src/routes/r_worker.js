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

router.get("/search", authorizationRecruiter, getWorkerByName);
router.get("/:id", authorization, getWorkerById);
router.get("/", authorizationRecruiter, getAllWorker);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot-password", forgotPassword);
router.patch("/update-password", updatePassword);
router.patch("/:id", upload, patchDataWorker);

module.exports = router;
