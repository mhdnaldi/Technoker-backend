const helper = require("../helper/helper");
const { postExperience, getExperienceById, deleteExperienceById } = require('../model/m_experience')
const { getWorkerById } = require('../model/m_worker')

module.exports = {
	postExperience: async (request, response) => {
		const { user_id, experience_company, experience_position, experience_date_in, experience_date_out, experience_desc} = request.body

		if (
			user_id == '' || user_id == undefined ||
			experience_company == '' || experience_company == undefined ||
			experience_position == '' || experience_position == undefined ||
			experience_date_in == '' || experience_date_in == undefined ||
			experience_date_out == '' || experience_date_out == undefined ||
			experience_desc == '' || experience_desc == undefined
			) {
			return helper.response(response, 400, "Your data is not complete")
		}
		const setData = {
			user_id,
			experience_company,
			experience_position,
			experience_date_in,
			experience_date_out,
			experience_desc
		}

		try {
			const checkWorker = await getWorkerById(user_id)
			if (checkWorker.length > 0) {
				const result = await postExperience(setData)
				return helper.response(response, 200, "Success post experience", result)
			} else {
				return helper.response(response, 404, `Worker by ID ${user_id} is not found!`)
			}
		} catch(e) {
			return helper.response(response, 404, "Bad Request", e)
		}
	},
	deleteExperience: async (request, response) => {
		const { id } = request.params
		try {
            checkId = await getExperienceById(id)
            
            if (checkId.length > 0) {
                const result = await deleteExperienceById(id)
                return helper.response(response, 200, "Experience deleted", result);
            } else {
                return helper.response(response, 404, `Experience with ID ${id} is not found!`);
            }
        } catch (e) {
            return helper.response(response, 400, "Bad Request", e);
        }
	}
}