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
    getPortofolioByUserId: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM portofolio WHERE user_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error));
            })
        })
    },
    getPortofolioById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM portofolio WHERE portofolio_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error));
            })
        })
    },
    deletePortofolioById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM portofolio WHERE portofolio_id = ?", id, (error, result) => {
                if (!error) {
                    const newResult = {
                        portofolio_id: id,
                    };
                    resolve(newResult);
                } else {
                    reject(new Error(error));
                }
            })
        })
    }
}