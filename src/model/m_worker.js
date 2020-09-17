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
          if (!error) {
            console.log(result);
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
};
