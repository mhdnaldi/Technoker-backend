const connection = require("../config/mysql");

module.exports = {
    getNotifByUser: (role, id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM notification WHERE role = ? AND user_id = ? ORDER BY notif_created_at DESC", [role, id], (error, result) => {
                !error ? resolve(result) : reject(new Error(error));
            })
        })
    },
    getCountNotifi: (role, id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT COUNT(*) AS total from notification WHERE role = ? AND user_id = ? AND notif_status = 2", [role, id], (error, result) => {
                !error ? resolve(result) : reject(new Error(error));
            })
        })
    },
    postNotification: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO notification SET ?", data, (error, result) => {
                !error ? resolve(result) : reject(new Error(error));
            })
        })
    },
    updateNotifStatus: (role, id) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE notification SET notif_status = 1 WHERE role = ? AND user_id = ?", [role, id], (error, result) => {
                !error ? resolve(result) : reject(new Error(error));
            })
        })
    },
}