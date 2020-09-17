const router = require("express").Router();
const { postPortofolio } = require('../controller/c_portofolio')
const { authorization } = require('../middleware/auth')
const uploadImage = require('../middleware/multer_portofolio')

router.post("/", authorization, uploadImage, postPortofolio);

module.exports = router