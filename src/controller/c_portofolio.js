const helper = require("../helper/helper");
const { postPortofolio } = require('../model/m_portofolio')
module.exports = {
	postPortofolio: async (request, response) => {
    const { user_id, portofolio_name } = request.body
    const portofolio_image = request.file

    if (
      user_id == '' || user_id == undefined ||
      portofolio_name == '' || portofolio_name == undefined ||
      portofolio_image == '' || portofolio_image == undefined
      ) {
      return helper.response(response, 400, "Your da is not complete")
    }

    try {
      const setData = {
        user_id,
        portofolio_name,
        portofolio_image: portofolio_image === undefined ? '' : portofolio_image.filename
      }
      const result = await postPortofolio(setData)
      return helper.response(response, 201, "Seuccess post portofolio", result)
    } catch(e) {
    	console.log(e)
    	return helper.response(response, 400, "Bad request", e)
    }

  }
}