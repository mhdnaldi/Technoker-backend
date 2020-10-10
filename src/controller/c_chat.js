const helper = require("../helper/helper");
const { getWorkerById } = require("../model/m_worker")
const { getRecruiterById } = require("../model/m_recruiter")
const { postNotification } = require("../model/m_notification")
const { postMessage, postRoomChat, checkRoom, checkRoomById, getMessageByRoomId, getRoomByWorker, getRoomByRecruiter } = require("../model/m_chat")

module.exports = {
    postMessage: async (request, response) => {
        const { user_id, recruiter_id, role, sender_id, message_text } = request.body

        if (user_id == '' || user_id == undefined) {
            return helper.response(response, 400, "User ID is required")

        } else if (recruiter_id == '' || recruiter_id == undefined) {
            return helper.response(response, 400, "Recruiter ID is required")

        } else if (role == '' || role == undefined) {
            return helper.response(response, 400, "Role s required")

        } else if (sender_id == '' || sender_id == undefined) {
            return helper.response(response, 400, "Sender ID is required")

        } else if (message_text == '' || message_text == undefined) {
            return helper.response(response, 400, "Message text ID is required")
        }

        try {

            let setNotifData = {
                notif_subject: 'You got some message',
                role: role == 1 ? 2 : 1,
                user_id: role == 1 ? user_id : recruiter_id
            }

            const checkRoomData = await checkRoom(user_id, recruiter_id)
            if (checkRoomData.length < 1) {

                const random = Math.round(Math.random() * 99999);
                const newRoomId = random + new Date().getTime()
                let setRoomData = {
                    room_id: newRoomId,
                    user_id,
                    recruiter_id
                }
                const postRoom = await postRoomChat(setRoomData)

                let setMessageData = { room_id: newRoomId, role, sender_id, message_text }
                const sendMessage = await postMessage(setMessageData)
                const sendNotif = await postNotification(setNotifData)
                const result = { postRoom, sendMessage }
                return helper.response(response, 200, "Success create room & send message", result)

            } else {
                const oldRoomId = checkRoomData[0].room_id
                let setMessageData = { room_id: oldRoomId, role, sender_id, message_text }
                const sendMessage = await postMessage(setMessageData)
                const sendNotif = await postNotification(setNotifData)
                return helper.response(response, 200, "Success send message", sendMessage)
            }
        } catch (e) {
            return helper.response(response, 400, "Bad Request", e)
        }

    },
    getRoomById: async (request, response) => {
        const { id } = request.params
        try {
            const result = await checkRoomById(id)
            if (result.length > 0) {
                const getMessage = await getMessageByRoomId(id)

                for (i = 0; i < getMessage.length; i++) {
                    if (getMessage[i].role == 1) {
                        const getSender = await getRecruiterById(getMessage[i].sender_id)
                        getMessage[i].sender_name = getSender[0].recruiter_company
                        getMessage[1].sender_img = getSender[0].recruiter_profile_image;
                    } else {
                        const getSender = await getWorkerById(getMessage[i].sender_id)
                        getMessage[i].sender_name = getSender[0].user_name
                        getMessage[i].sender_img = getSender[0].user_image

                    }
                }

                result[0].messages = getMessage
                return helper.response(response, 200, `Success get room chat by ID ${id}`, result)
            } else {
                return helper.response(response, 404, "Room chat is not found!")
            }
        } catch (e) {
            return helper.response(response, 400, "Bad Request", e)
        }
    },
    getWorkerRoom: async (request, response) => {
        const { id } = request.params

        try {
            checkWorker = await getWorkerById(id)

            if (checkWorker.length > 0) {
                result = await getRoomByWorker(id)

                for (i = 0; i < result.length; i++) {
                    const getRecruiter = await getRecruiterById(result[i].recruiter_id)
                    result[i].room_name = getRecruiter[0].recruiter_company
                    result[i].image = getRecruiter[0].recruiter_profile_image
                }
                return helper.response(response, 200, "Success get worker room chat", result)
            } else {
                return helper.response(response, 404, "Worker not found")
            }
        } catch (e) {
            return helper.response(response, 400, "Bad Request", e);
        }
    },
    getRecruiterRoom: async (request, response) => {
        const { id } = request.params

        try {
            checkRecruiter = await getRecruiterById(id)

            if (checkRecruiter.length > 0) {
                result = await getRoomByRecruiter(id)

                for (i = 0; i < result.length; i++) {
                    const getWorker = await getWorkerById(result[i].user_id)
                    result[i].room_name = getWorker[0].user_name
                    result[i].image = getWorker[0].user_image
                }
                return helper.response(response, 200, "Success get recruiter room chat", result)
            } else {
                return helper.response(response, 404, "Recruiter not found")
            }
        } catch (e) {
            return helper.response(response, 400, "Bad Request", e);
        }
    },
}