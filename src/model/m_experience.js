const connection = require("../config/mysql");

module.exports = {
    postExperience: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO experience SET ?", data, (error, result) => {
                if (!error) {
                    const newResult = {
                        experience_id: result.insertId,
                        ...data,
                    }
                    resolve(newResult);
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    getExperienceByUserId: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM experience WHERE user_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error));
            });
        })
    },
    getExperienceById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM experience WHERE experience_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error));
            });
        })
    },
    deleteExperienceById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM experience WHERE experience_id = ?", id, (error, result) => {
                if (!error) {
                    const newResult = {
                        experience_id: id,
                    };
                    resolve(newResult);
                } else {
                    reject(new Error(error));
                }
            })
        })
    },
}