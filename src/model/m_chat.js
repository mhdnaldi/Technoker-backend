const connection = require("../config/mysql");

module.exports = {
    postRoomChat: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO roomchat SET ?", data, (error, result) => {
                if (!error) {
                    const newResult = {
                        room_id: result.insertId,
                        ...data,
                    }
                    resolve(newResult);
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    checkRoom: (user_id, recruiter_id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM roomchat WHERE user_id = ? AND recruiter_id = ?", [user_id, recruiter_id], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    checkRoomById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM roomchat WHERE room_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getRoomByWorker: (id) => {
    	return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM roomchat WHERE user_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getRoomByRecruiter: (id) => {
    	return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM roomchat WHERE recruiter_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postMessage: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO message SET ?", data, (error, result) => {
                if (!error) {
                    const newResult = {
                        message_id: result.insertId,
                        ...data,
                    }
                    resolve(newResult);
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    getMessageByRoomId: (id) => {
    	return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM message WHERE room_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },

}