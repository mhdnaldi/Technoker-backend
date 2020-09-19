const bcrypt = require("bcrypt");
const helper = require("../helper/helper");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const {
  checkUser,
  postUser,
  updateKeys,
  checkKey,
  patchUser,
  getWorkerById,
  getWorkerByIdV2,
  patchDataWorker,
  getWorker,
  getWorkerCount,
  searchWorkerByName,
  countJobType,
  getWorkerByJobType,
} = require("../model/m_worker");

const { getWorkerSkills } = require("../model/m_skill");
const { getPortofolioByUserId } = require("../model/m_portofolio");
const { getExperienceById } = require("../model/m_experience");
const nodemailer = require("nodemailer");

module.exports = {
  registerUser: async (request, response) => {
    const {
      user_name,
      user_email,
      user_phone,
      user_password,
      user_confirm_password,
    } = request.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    const setData = {
      user_name,
      user_email,
      user_phone,
      user_password: encryptPassword,
      user_created_at: new Date(),
    };
    try {
      const checkEmailUser = await checkUser(user_email);
      if (checkEmailUser.length >= 1) {
        return helper.response(response, 400, "Email has been registered");
      } else if (user_email === "") {
        return helper.response(response, 400, "Email can't be empty");
      } else if (user_email.search("@") < 1) {
        return helper.response(response, 400, "Email not valid");
      } else if (user_password === "") {
        return helper.response(response, 400, "Password can't be empty");
      } else if (user_password.length < 8 || user_password.length > 16) {
        return helper.response(
          response,
          400,
          "Password must be 8-16 characters"
        );
      } else if (user_confirm_password !== user_password) {
        return helper.response(response, 400, "Password do not match");
      } else if (user_name === "") {
        return helper.response(response, 400, "Name can't be empty");
      } else if (user_phone.length > 15) {
        return helper.response(
          response,
          400,
          "Phone number cannot be 15 numbers"
        );
      } else {
        const result = await postUser(setData);
        return helper.response(response, 200, "Register Success", result);
      }
    } catch (error) {
      return helper.response(response, 200, "Bad Request");
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body;
      const checkDataUser = await checkUser(user_email);
      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        );
        if (checkPassword) {
          const {
            user_id,
            user_email,
            user_name,
            role,
            user_skill,
            user_phone,
            user_job_desk,
            user_location,
            user_image,
            user_instagram,
            user_github,
            user_about,
          } = checkDataUser[0];
          let payload = {
            user_id,
            user_email,
            user_name,
            role,
            user_skill,
            user_phone,
            user_job_desk,
            user_location,
            user_image,
            user_instagram,
            user_github,
            user_about,
          };
          const token = jwt.sign(payload, "SECRET", { expiresIn: "1h" });
          payload = { ...payload, token };
          return helper.response(response, 200, "Login Success", payload);
        } else {
          return helper.response(response, 400, "Wrong Password");
        }
      } else {
        return helper.response(
          response,
          400,
          "Email / account is not registered"
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  forgotPassword: async (request, response) => {
    try {
      const { user_email } = request.body;
      const keys = Math.round(Math.random() * 99999);
      const checkDataUser = await checkUser(user_email);

      if (checkDataUser.length >= 1) {
        const user_id = checkDataUser[0].user_id;
        const updateKey = await updateKeys(keys, user_id);
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "info.technoker",
            pass: "technoker2020",
          },
        });
        const redirectLink =
          process.env.FRONTEND_LINK + 'confirm-password?role=1&keys=' + keys
        await transporter.sendMail({
          from: '"Technoker Team" <info.technoker@gmail.com>',
          to: user_email,
          subject: "Technoker - Forgot Password",
          html: `
                        Click link bellow for redirect to change password page <br /> <a href="${redirectLink}">Click Here</a> 
                        <p> Or copy this link ${redirectLink} </p>
                        `,
        }),
          function (err) {
            if (err) {
              return helper.response(response, 400, "Email not sent");
            }
          };
        return helper.response(
          response,
          200,
          "Email has been sent, please check your email"
        );
      } else {
        return helper.response(response, 400, "This email is not registered!");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  updatePassword: async (request, response) => {
    const { user_key, user_password, user_confirm_password } = request.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    try {
      if (user_password !== user_confirm_password) {
        return helper.response(response, 400, "Password do not match");
      } else if (
        request.body.user_password.length < 8 ||
        request.body.user_password.length > 16
      ) {
        return helper.response(
          response,
          400,
          "Password must be 8-16 characters"
        );
      }
      const checkDataUser = await checkKey(user_key);
      if (checkDataUser.length > 0) {
        const id = checkDataUser[0].user_id;
        const setData = {
          user_password: encryptPassword,
          user_key: null,
        };
        const updateKey = await patchUser(setData, id);
        return helper.response(
          response,
          200,
          "Success, your password has been changed"
        );
      } else {
        return helper.response(response, 400, "Access Denied");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  getWorkerById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getWorkerById(id);
      const skills = await getWorkerSkills(id);
      const portofolio = await getPortofolioByUserId(id);
      const experience = await getExperienceById(id);

      if (result.length > 0) {
        result[0].skills = skills;
        result[0].portofolio = portofolio;
        result[0].experience = experience;
        return helper.response(
          response,
          200,
          `Success Get Worker By ID: ${id}`,
          result
        );
      } else {
        return helper.response(
          response,
          400,
          `Worker By ID: ${id} is not found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchDataWorker: async (request, response) => {
    try {
      const { id } = request.params;
      const {
        user_name,
        user_phone,
        user_job_desk,
        user_location,
        user_workplace,
        user_about,
        user_instagram,
        user_github,
      } = request.body;
      const profileImage = request.file;
      let updateData = {
        user_name,
        user_phone,
        user_job_desk,
        user_location,
        user_workplace,
        user_about,
        user_instagram,
        user_github,
        user_updated_at: new Date(),
      };
      if (user_name === "") {
        return helper.response(response, 400, "Name cannot be empty");
      } else if (user_phone === "") {
        return helper.response(response, 400, "Phone cannot be empty");
      } else if (user_job_desk === "") {
        return helper.response(response, 400, "Job desk cannot be empty");
      } else if (user_location === "") {
        return helper.response(response, 400, "Location cannot be empty");
      } else if (user_workplace === "") {
        return helper.response(response, 400, "Workplace cannot be empty");
      } else if (user_about === "") {
        return helper.response(response, 400, "Work place cannot be empty");
      }

      const checkId = await getWorkerById(id);
      if (checkId.length > 0) {
        if (profileImage === "" || profileImage === undefined) {
          updateData = updateData;
        } else {
          updateData.user_image = profileImage.filename;
          if (checkId[0].user_image !== null) {
            fs.unlink(
              `./uploads/profile/${checkId[0].user_image}`,
              async (error) => {
                if (error) throw err;
              }
            );
          }
        }
        const result = await patchDataWorker(updateData, id);
        return helper.response(
          response,
          200,
          "Data successfully updated",
          result
        );
      } else {
        return helper.response(response, 404, `Worker by Id ${id} not found!`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  getAllWorker: async (request, response) => {
    let { page, limit, orderBy } = request.query;
    page = page == undefined ? 1 : parseInt(page);
    limit = limit == undefined ? 9 : parseInt(limit);
    orderBy = orderBy == undefined ? "user_name ASC" : orderBy;
    let offset = page * limit - limit;

    try {
      let totalData = "";
      let result = "";
      if (orderBy == "freelance" || orderBy == "fulltime") {
        totalData = await countJobType(orderBy);
        result = await getWorkerByJobType(orderBy, limit, offset);
      } else {
        totalData = await getWorkerCount();
        result = await getWorker(orderBy, limit, offset);
      }

      for (let i = 0; i < result.length; i++) {
        result[i].skills = await getWorkerSkills(result[i].user_id);
      }

      const totalPage = Math.ceil(totalData / limit);
      let prevLink = helper.getPrevLink(page, request.query);
      let nextLink = helper.getNextLink(page, totalPage, request.query);

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        orderBy,
        prevLink: prevLink && `http://127.0.0.1:4000/user?${prevLink}`,
        nextLink: nextLink && `http://127.0.0.1:4000/user?${nextLink}`,
      };
      return helper.response(
        response,
        200,
        "Success Get Worker",
        result,
        pageInfo
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getWorkerByName: async (request, response) => {
    let { name } = request.query;
    str = `LIKE '%${name}%'`;
    try {
      let result = await searchWorkerByName(str);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Data Worker",
          result
        );
      } else {
        return helper.response(response, 404, "Worker not found!");
      }
    } catch (error) {
      return helper.response(response, 200, "Bad request", error);
    }
  },
};
