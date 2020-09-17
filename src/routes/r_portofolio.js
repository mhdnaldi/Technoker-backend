const router = require("express").Router();
const { postPortofolio, patchPortofolio } = require('../controller/c_portofolio')
const { authorization } = require('../middleware/auth')
const uploadImage = require('../middleware/multer_portofolio')

router.post("/", authorization, uploadImage, postPortofolio);
router.patch("/:id", authorization, uploadImage, patchPortofolio);

module.exports = router