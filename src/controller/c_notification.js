const helper = require("../helper/helper")
const { getNotifByUser, getCountNotifi, updateNotifStatus } = require("../model/m_notification")

module.exports = {
	getNotifByUser: async (request, response) => {
		const { role, id } = request.params
		try {
			updateStatus = await updateNotifStatus(role, id) 
			result = await getNotifByUser(role, id)
			return helper.response(response, 200, "Success get notificatin", result)
		} catch(e) {
			return helper.response(response, 400, "Bad Request")
		}
	},
	getCountNotif: async (request, response) => {
		const { role, id } = request.params
		try {
			result = await getCountNotifi(role, id)
			return helper.response(response, 200, "Success get unread notificatin", result)
		} catch(e) {
			return helper.response(response, 400, "Bad Request")
		}
	}
}