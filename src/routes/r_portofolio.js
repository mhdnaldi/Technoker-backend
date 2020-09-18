const router = require("express").Router();
const { postPortofolio, patchPortofolio, deletePortofolio } = require('../controller/c_portofolio')
const { authorization } = require('../middleware/auth')
const uploadImage = require('../middleware/multer_portofolio')

router.post("/", authorization, uploadImage, postPortofolio);
router.patch("/:id", authorization, uploadImage, patchPortofolio);
router.delete("/:id", authorization, uploadImage, deletePortofolio);

module.exports = router