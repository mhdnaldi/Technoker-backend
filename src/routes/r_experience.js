const router = require("express").Router();
const { postExperience, deleteExperience } = require('../controller/c_experience')
const { authorization } = require('../middleware/auth')

router.post("/", authorization, postExperience);
router.delete("/:id", authorization, deleteExperience);

module.exports = router