const connection = require('../config/mysql')

module.exports = {
    checkRecruiter: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM recruiter WHERE recruiter_email = ?', email, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postRecruiter: (data) => {
    	return new Promise((resolve, reject) => {
    		connection.query('INSERT INTO recruiter SET ?', data, (error, result) => {
                if (!error) {
                    const newResult = {
                        recruiter_id: result.insertId,
                        ...data
                    }
                    delete newResult.recruiter_password
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
    	})
    }
 }