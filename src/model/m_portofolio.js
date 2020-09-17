const connection = require("../config/mysql");

module.exports = {
    postPortofolio: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO portofolio SET ?", data, (error, result) => {
                if (!error) {
                    const newResult = {
                        portofolio_id: result.insertId,
                        ...data,
                    }
                    resolve(newResult);
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
}
