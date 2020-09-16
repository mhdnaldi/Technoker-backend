const router = require('express').Router()
const { registerrecruiter, loginrecruiter  } = require('../controller/c_recruiter')

router.post('/register', registerrecruiter)
router.post('/login', loginrecruiter)

module.exports = router