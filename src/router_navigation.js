const route = require('express').Router()

// import routes
const reqruiter = require('./routes/r_reqruiter')

// buat middle 
route.use('/reqruiter', reqruiter)

module.exports = route