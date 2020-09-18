const connection = require("../config/mysql");

module.exports = {
  getWorkerSkills: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM skill WHERE user_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postSkill: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO skill SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            skill_id: result.insertId,
            ...setData,
          };
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  deleteSkill: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM skill WHERE skill_id = ?",
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              skill_id: id,
            };
            resolve(newResult);
          } else {
            console.log(error);
          }
        }
      );
    });
  },
};
