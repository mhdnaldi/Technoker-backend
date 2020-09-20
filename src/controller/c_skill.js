const helper = require("../helper/helper");
const {
  postSkill,
  deleteSkill,
  checkWorkerSkill,
} = require("../model/m_skill");
const { getWorkerById, updateSkillWorker } = require("../model/m_worker");

module.exports = {
  postSkill: async (request, response) => {
    const { skill_name, user_id } = request.body;
    if (
      user_id === "" ||
      user_id === undefined ||
      skill_name === "" ||
      skill_name === null
    ) {
      return helper.response(response, 400, "Data must be complete");
    }
    try {
      checkId = await getWorkerById(user_id);
      if (checkId.length > 0) {
        checkSkill = await checkWorkerSkill(skill_name, user_id);
        if (checkSkill.length > 0) {
          return helper.response(
            response,
            200,
            `The ${skill_name} skill for this user is already set`
          );
        } else {
          const setData = {
            skill_name,
            user_id,
          };
          const result = await postSkill(setData);
          const updateSkill = await updateSkillWorker(user_id);
          return helper.response(response, 200, "Success post skill", result);
        }
      } else {
        return helper.response(
          response,
          400,
          `Worker with ID ${user_id} is not Found!`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad request");
    }
  },
  deleteSkill: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteSkill(id);
      return helper.response(response, 200, "Skill deleted", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
