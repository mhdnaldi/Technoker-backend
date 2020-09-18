const router = require('express').Router()
const { registerrecruiter, loginrecruiter, recruiterForgotPassword, recruiterUpdatePassword, patchRecruiter, getRecruiterById  } = require('../controller/c_recruiter')
const { authorizationRecruiter, authorization } = require("../middleware/auth");
const uploadImage = require('../middleware/multer_recruiter')

router.get('/:id', authorization, getRecruiterById)
router.post('/register', registerrecruiter)
router.post('/login', loginrecruiter)
router.post('/forgot-password', recruiterForgotPassword)
router.patch('/update-password', recruiterUpdatePassword)
router.patch('/:id', authorizationRecruiter, uploadImage, patchRecruiter)


module.exports = router