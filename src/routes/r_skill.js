const router = require("express").Router();
const { postSkill, deleteSkill } = require("../controller/c_skill");
const { authorization } = require("../middleware/auth");

router.post("/", authorization, postSkill);
router.delete("/:id", authorization, deleteSkill);

module.exports = router;
