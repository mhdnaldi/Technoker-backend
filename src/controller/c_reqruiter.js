const bcrypt = require('bcrypt')
const helper = require('../helper/helper')
const jwt = require('jsonwebtoken')
const { checkReqruiter, postReqruiter } = require('../model/m_reqruiter')

module.exports = {
    registerReqruiter: async (request, response) => {
        const { reqruiter_name, reqruiter_email, reqruiter_company, reqruiter_position, reqruiter_phone, reqruiter_password, reqruiter_password_confirmation } = request.body

        if (
            reqruiter_name == '' || reqruiter_name == undefined ||
            reqruiter_email == '' || reqruiter_email == undefined ||
            reqruiter_company == '' || reqruiter_company == undefined ||
            reqruiter_position == '' || reqruiter_position == undefined ||
            reqruiter_phone == '' || reqruiter_phone == undefined ||
            reqruiter_password == '' || reqruiter_password == undefined ||
            reqruiter_password_confirmation == '' || reqruiter_password_confirmation == undefined
        ) {
            return helper.response(response, 403, "The data you've entered is not complete!")
        }

        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(reqruiter_password, salt)
        const email_validation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (email_validation.test(reqruiter_email) == false) {
            return helper.response(response, 403, "Your email is not valid")
        }

        try {
            const check = await checkReqruiter(reqruiter_email)

            if (check.length > 0) {
                return helper.response(response, 403, "This email already rigistered ")

            } else if (reqruiter_password.length < 7 || reqruiter_password.length > 20) {
                return helper.response(response, 403, "Password must be between 8 to 20 characters")

            } else if (reqruiter_password_confirmation !== reqruiter_password) {
                return helper.response(response, 403, "Your password confirmation is wrong")

            } else {
                setData = {
                    reqruiter_name,
                    reqruiter_email,
                    reqruiter_company,
                    reqruiter_position,
                    reqruiter_phone,
                    reqruiter_password: encryptPassword
                }
                const result = await postReqruiter(setData)
                return helper.response(response, 200, "Success Register Reqruiter", result)
            }
        } catch (e) {
            return helper.response(response, 400, "Bad request", e)
        }
    }
}