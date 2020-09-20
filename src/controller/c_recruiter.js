const bcrypt = require('bcrypt')
const helper = require('../helper/helper')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const { checkRecruiter, getRecruiterById, postRecruiter, updateRecruiterKey, checkKey, patchRecruiter } = require('../model/m_recruiter')

module.exports = {
    registerrecruiter: async (request, response) => {
        const { recruiter_name, recruiter_email, recruiter_company, recruiter_position, recruiter_phone, recruiter_password, recruiter_password_confirmation } = request.body

        if (
            recruiter_name == '' || recruiter_name == undefined ||
            recruiter_email == '' || recruiter_email == undefined ||
            recruiter_company == '' || recruiter_company == undefined ||
            recruiter_position == '' || recruiter_position == undefined ||
            recruiter_phone == '' || recruiter_phone == undefined ||
            recruiter_password == '' || recruiter_password == undefined ||
            recruiter_password_confirmation == '' || recruiter_password_confirmation == undefined
        ) {
            return helper.response(response, 403, "The data you've entered is not complete!")
        }

        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(recruiter_password, salt)
        const email_validation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (email_validation.test(recruiter_email) == false) {
            return helper.response(response, 403, "Your email is not valid")
        }

        try {
            const check = await checkRecruiter(recruiter_email)

            if (check.length > 0) {
                return helper.response(response, 403, "This email already rigistered ")

            } else if (recruiter_password.length < 7 || recruiter_password.length > 20) {
                return helper.response(response, 403, "Password must be between 8 to 20 characters")

            } else if (recruiter_password_confirmation !== recruiter_password) {
                return helper.response(response, 403, "Your password confirmation is wrong")

            } else {
                setData = {
                    recruiter_name,
                    recruiter_email,
                    recruiter_company,
                    recruiter_position,
                    recruiter_phone,
                    recruiter_password: encryptPassword
                }
                const result = await postRecruiter(setData)
                return helper.response(response, 200, "Success Register recruiter", result)
            }
        } catch (e) {
            return helper.response(response, 400, "Bad request", e)
        }
    },
    loginrecruiter: async (request, response) => {
        const { recruiter_email, recruiter_password } = request.body
        if (
            recruiter_email == '' || recruiter_email == undefined ||
            recruiter_password == '' || recruiter_password == undefined
        ) {
            return helper.response(response, 403, "The data you've entered is not complete!")
        }
        try {
            const checkData = await checkRecruiter(recruiter_email)

            if (checkData.length > 0) {
                const checkPassword = bcrypt.compareSync(recruiter_password, checkData[0].recruiter_password)
                if (checkPassword) {
                    const { recruiter_id, recruiter_name, recruiter_email, recruiter_company, recruiter_position, recruiter_phone, recruiter_profile_image, recruiter_background_image, recruiter_location, recruiter_about, recruiter_instagram, recruiter_linkedin, role } = checkData[0]

                    let payload = {
                        recruiter_id,
                        recruiter_name,
                        recruiter_name,
                        recruiter_email,
                        recruiter_company,
                        recruiter_position,
                        recruiter_phone,
                        recruiter_profile_image,
                        recruiter_background_image,
                        recruiter_location,
                        recruiter_about,
                        recruiter_instagram,
                        recruiter_linkedin,
                        role
                    }

                    const token = jwt.sign(payload, 'SECRET', { expiresIn: 3600 * 24 })
                    payload = { ...payload, token }
                    return helper.response(response, 200, "Success Login", payload)
                } else {
                    return helper.response(response, 400, "Your password is wrong")
                }
            } else {
                return helper.response(response, 400, "Your email is not registered")
            }
        } catch (e) {
            return helper.response(response, 400, "Bad Request", e)
        }
    },
    recruiterForgotPassword: async (request, response) => {
        const nodemailer = require('nodemailer')
        const { recruiter_email } = request.body
        const key = Math.round(Math.random() * 99999)

        try {
            const checkData = await checkRecruiter(recruiter_email)

            if (checkData.length >= 1) {
                const id = checkData[0].recruiter_id
                const updateKey = await updateRecruiterKey(key, id)
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "info.technoker",
                        pass: "technoker2020"
                    }
                })
                const redirectLink = process.env.FRONTEND_LINK + 'confirm-password?role=1&keys=' + key
                await transporter.sendMail({
                        from: '"Technoker Team" <info.technoker@gmail.com>',
                        to: recruiter_email,
                        subject: "Technoker - Forgot Password",
                        html: `
                        Click link bellow for redirect to change password page <br /> <a href="${redirectLink}">Click Here</a> 
                        <p> Or copy this link ${redirectLink} </p>
                        `
                    }),
                    function(err) {
                        if (err) {
                            return helper.response(response, 400, "Email not send !")
                        }
                    }

                return helper.response(response, 200, "Email has been send, Please check your email")
            } else {
                return helper.response(response, 400, "This email is not registered!")
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    recruiterUpdatePassword: async (request, response) => {
        const { recruiter_key, recruiter_password, recruiter_password_confirmation } = request.body
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(recruiter_password, salt)

        try {

            if (recruiter_password.length < 7 || recruiter_password.length > 20) {
                return helper.response(response, 403, "Password must be between 8 to 20 characters")
            } else if (recruiter_password !== recruiter_password_confirmation) {
                return helper.response(response, 400, "Your password don't match!")
            }

            const checkData = await checkKey(recruiter_key)

            if (checkData.length > 0) {
                const id = checkData[0].recruiter_id
                const setData = {
                    recruiter_password: encryptPassword,
                    recruiter_key: null
                }
                const updateKey = await patchRecruiter(setData, id)

                return helper.response(response, 200, "Success, your password has been changed")
            } else {
                return helper.response(response, 400, "Access Danied")
            }
        } catch (e) {
            return helper.response(response, 400, "Bad Request", e)
        }

    },
    patchRecruiter: async (request, response) => {
        const { id } = request.params
        const { recruiter_company, recruiter_field, recruiter_location, recruiter_about, recruiter_instagram, recruiter_phone, recruiter_linkedin } = request.body
        const recruiter_profile_image = request.file
        try {
            if (
                recruiter_company == '' || recruiter_company == undefined ||
                recruiter_field == '' || recruiter_field == undefined ||
                recruiter_location == '' || recruiter_location == undefined ||
                recruiter_about == '' || recruiter_about == undefined ||
                recruiter_instagram == '' || recruiter_instagram == undefined ||
                recruiter_phone == '' || recruiter_phone == undefined
            ) {
                return helper.response(response, 400, "The data you've entered is not complete!")
            }
            let setData = {
                recruiter_company,
                recruiter_field,
                recruiter_location,
                recruiter_about,
                recruiter_instagram,
                recruiter_phone,
                recruiter_linkedin
            }
            const checkData = await getRecruiterById(id)

            if (checkData.length > 0) {
                let result = ''
                if (recruiter_profile_image == undefined || recruiter_profile_image == '') {
                    setData = setData
                } else {
                    setData.recruiter_profile_image = recruiter_profile_image.filename
                    const image = checkData[0].recruiter_profile_image
                    if (image !== null) {
                        fs.unlink(`./uploads/profile/${image}`, function(err) {
                            if (err) throw err;
                        })
                    }
                }

                result = await patchRecruiter(setData, id)
                return helper.response(response, 200, "Recruiter data updated", result)
            } else {
                return helper.response(response, 404, `Recruiter with ${id} is not found!`)
            }
        } catch (e) {
            return helper.response(response, 400, "Bad Request", e)
        }
    },
    getRecruiterById: async (request, response) => {
        const { id } = request.params
        try {
            result = await getRecruiterById(id)
            if (result.length > 0) {
                return helper.response(response, 200, `Success get recruiter by Id ${id}`, result)
            } else {
                return helper.response(response, 404, `Recruiter by Id ${id} not Found`)
            }
        } catch (e) {
            return helper.response(response, 400, "Bad Request", e);
        }
    }
}