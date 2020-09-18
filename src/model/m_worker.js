const connection = require("../config/mysql");

module.exports = { 
    postUser: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO user SET ?", setData, (error, result) => {
                if (!error) {
                    const newResult = {
                        id: result.insertId,
                        ...setData,
                    };
                    delete newResult.user_password;
                    resolve(newResult);
                } else {
                    reject(new Error(error));
                }
            });
        });
    },
    checkUser: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user WHERE user_email = ?",
                email,
                (error, result) => {
                    !error ? resolve(result) : reject(new Error(error));
                }
            );
        });
    },
    updateKeys: (keys, id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE user SET user_key = ? WHERE user_id = ?",
                [keys, id],
                (error, result) => {
                    !error ? resolve(result) : reject(new Error());
                }
            );
        });
    },
    checkKey: (keys) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user WHERE user_key = ?",
                keys,
                (error, result) => {
                    !error ? resolve(result) : reject(new Error(error));
                }
            );
        });
    },
    patchUser: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE user SET ? WHERE user_id = ?",
                [data, id],
                (error, result) => {
                    !error ? resolve(result) : reject(new Error());
                }
            );
        });
    },
    getWorkerById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user WHERE user_id = ?",
                id,
                (error, result) => {
                    !error ? resolve(result) : reject(new Error(error))
                }
            );
        });
    },
    getWorkerByIdV2: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user WHERE user_id = ?",
                id,
                (error, result) => {
                    if (!error) {
                        delete result[0].user_password;
                        resolve(result);
                    } else {
                        reject(new Error(error));
                    }
                }
            );
        });
    },
    patchDataWorker: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `UPDATE user SET ? WHERE user_id = ?`,
                [data, id],
                (error, result) => {
                    if (!error) {
                        const newResult = {
                            ...data,
                        };
                        resolve(newResult);
                    } else {
                        reject(new Error(error));
                    }
                }
            );
        });
    },
    getWorkerCount: () => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT COUNT(*) AS total FROM user",
                (error, result) => {
                    !error ? resolve(result[0].total) : reject(new Error(error));
                }
            );
        });
    },
    getAllWorker: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM user", (error, result) => {
                !error ? resolve(result) : reject(new Error(error));
            });
        });
    },
    getWorker: (order, limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM user ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`,
                (error, result) => {
                    !error ? resolve(result) : reject(new Error(error));
                }
            );
        });
    },
    getWorkerByJobType: (data, limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM user WHERE user_job_type = '${data}' LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    countJobType: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT COUNT(*) AS total FROM user WHERE user_job_type = ?', data, (error, result) => {
                !error ? resolve(result[0].total) : reject(new Error(error))
            })
        })
    },
    searchWorkerByName: (search) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM user WHERE user_name ${search}`,
                (error, result) => {
                    !error ? resolve(result) : reject(new Error(error));
                }
            );
        });
    },
};