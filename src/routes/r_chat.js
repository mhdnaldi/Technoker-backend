const router = require("express").Router();
const { postMessage, getWorkerRoom, getRecruiterRoom, getRoomById } = require('../controller/c_chat')
const { authorization } = require('../middleware/auth')

router.post("/", authorization, postMessage);
router.get("/user/:id", authorization, getWorkerRoom);
router.get("/recruiter/:id", authorization, getRecruiterRoom);
router.get("/:id", authorization, getRoomById);

module.exports = router