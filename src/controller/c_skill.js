const helper = require("../helper/helper");
const { postSkill, deleteSkill, getWorkerSkills } = require("../model/m_skill");

module.exports = {
  postSkill: async (request, response) => {
    const { skill_name, user_id } = request.body;
    if (skill_name === "" || skill_name === null) {
      return helper.response(
        response,
        400,
        "Skill must be filled at least 1 skill"
      );
    }
    try {
      const setData = {
        skill_name,
        user_id,
      };
      const result = await postSkill(setData);
      return helper.response(response, 200, "Success post skill", result);
    } catch (error) {
      console.log(error);
      //   return helper.response(response, 400, "Bad request");
    }
  },
  deleteSkill: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteSkill(id);
      return helper.response(response, 200, "Skill deleted", result);
    } catch (error) {
      console.log(error);
      //   return helper.response(response, 400, "Bad Request", error);
    }
  },
};
