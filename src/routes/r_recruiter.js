const router = require('express').Router()
const { registerrecruiter, loginrecruiter, recruiterForgotPassword, recruiterUpdatePassword  } = require('../controller/c_recruiter')

router.post('/register', registerrecruiter)
router.post('/login', loginrecruiter)
router.post('/forgot-password', recruiterForgotPassword)
router.patch('/update-password', recruiterUpdatePassword)


module.exports = router