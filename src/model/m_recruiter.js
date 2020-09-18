const connection = require('../config/mysql')

module.exports = {
    checkRecruiter: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM recruiter WHERE recruiter_email = ?', email, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    checkRecruiterById: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM recruiter WHERE recruiter_id = ?', email, (error, result) => {
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
    },
    updateRecruiterKey: (key, id) => {
        return new Promise((resolve, reject) => {
            connection.query('Update recruiter SET recruiter_key =  ? WHERE recruiter_id = ?', [key, id], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    checkKey: (key) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM recruiter WHERE recruiter_key = ?', key, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    patchRecruiter: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query('Update recruiter SET ? WHERE recruiter_id = ?', [data, id], (error, result) => {
                if (!error) {
                    const newResult = {
                        recruiter_id: id,
                        ...data
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
 }