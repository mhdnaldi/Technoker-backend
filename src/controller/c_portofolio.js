const helper = require("../helper/helper");
const fs = require("fs");
const {
  postPortofolio,
  getPortofolioById,
  deletePortofolioById,
} = require("../model/m_portofolio");
module.exports = {
  postPortofolio: async (request, response) => {
    const {
      user_id,
      portofolio_name,
      portofolio_type,
      portofolio_repository,
    } = request.body;
    const portofolio_image = request.file;

    if (
      user_id == "" ||
      user_id == undefined ||
      portofolio_name == "" ||
      portofolio_name == undefined ||
      portofolio_image == "" ||
      portofolio_image == undefined ||
      portofolio_type == "" ||
      portofolio_type == undefined ||
      portofolio_repository == "" ||
      portofolio_repository == undefined
    ) {
      return helper.response(response, 400, "Your data is not complete");
    }

    try {
      const setData = {
        user_id,
        portofolio_name,
        portofolio_image:
          portofolio_image === undefined ? "" : portofolio_image.filename,
        portofolio_type,
        portofolio_repository,
      };
      const result = await postPortofolio(setData);
      return helper.response(response, 201, "Success post portofolio", result);
    } catch (e) {
      console.log(e)
      return helper.response(response, 400, "Bad request", e);
    }
  },
  patchPortofolio: async (request, response) => {
    console.log(request.body);
    console.log(request.params);
    console.log(request.file);
  },
  deletePortofolio: async (request, response) => {
    const { id } = request.params;
    try {
      checkId = await getPortofolioById(id);

      if (checkId.length > 0) {
        image = checkId[0].portofolio_image;
        fs.unlink(`./uploads/portofolio/${image}`, function (err) {
          if (err) throw err;
        });
        const result = await deletePortofolioById(id);
        return helper.response(response, 200, "Portofolio deleted", result);
      } else {
        return helper.response(
          response,
          404,
          `Prtofolio with ID ${id} is not found!`
        );
      }
    } catch (e) {
      return helper.response(response, 400, "Bad Request", e);
    }
  },
};
