const router = require('express').Router()
const { registerReqruiter  } = require('../controller/c_reqruiter')

router.post('/register', registerReqruiter)

module.exports = router