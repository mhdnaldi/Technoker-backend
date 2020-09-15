const bcrypt = require("bcrypt");
const helper = require("../helper/helper");
const { checkUser, postUser } = require("../model/m_worker");

module.exports = {
  registerUser: async (request, response) => {
    const { user_email, user_password, user_name } = request.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    const setData = {
      user_email,
      user_password: encryptPassword,
      user_name,
      user_role: 2,
      user_created_at: new Date(),
    };
    try {
      const checkEmailUser = await checkUser(user_email);
      if (checkEmailUser.length >= 1) {
        return helper.response(response, 400, "Email has been registered");
      } else if (request.body.user_email === "") {
        return helper.response(response, 400, "Email can't be empty");
      } else if (request.body.user_email.search("@") < 1) {
        return helper.response(response, 400, "Email not valid");
      } else if (request.body.user_password === "") {
        return helper.response(response, 400, "Password can't be empty");
      } else if (
        request.body.user_password.length < 8 ||
        request.body.user_password.length > 16
      ) {
        return helper.response(
          response,
          400,
          "Password must be 8-16 characters"
        );
      } else if (request.body.user_name === "") {
        return helper.response(response, 400, "Username can't be empty");
      } else if (user_name.length >= 1) {
        return helper.response(response, 400, "Username has been taken");
      } else {
        const result = await postUser(setData);
        return helper.response(response, 200, "Register Success", result);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
