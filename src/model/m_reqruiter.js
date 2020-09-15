const connection = require('../config/mysql')

module.exports = {
    checkReqruiter: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM reqruiter WHERE reqruiter_email = ?', email, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postReqruiter: (data) => {
    	return new Promise((resolve, reject) => {
    		connection.query('INSERT INTO reqruiter SET ?', data, (error, result) => {
                if (!error) {
                    const newResult = {
                        reqruiter_id: result.insertId,
                        ...data
                    }
                    delete newResult.reqruiter_password
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
    	})
    }
 }