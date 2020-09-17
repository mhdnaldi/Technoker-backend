const router = require('express').Router()
const { registerrecruiter, loginrecruiter, recruiterForgotPassword, recruiterUpdatePassword, patchRecruiter  } = require('../controller/c_recruiter')
const uploadImage = require('../middleware/multer_recruiter')

router.post('/register', registerrecruiter)
router.post('/login', loginrecruiter)
router.post('/forgot-password', recruiterForgotPassword)
router.patch('/update-password', recruiterUpdatePassword)
router.patch('/:id', uploadImage, patchRecruiter)


module.exports = router