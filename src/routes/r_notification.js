const router = require("express").Router();
const { getNotifByUser, getCountNotif } = require('../controller/c_notification')
const { authorization } = require('../middleware/auth')

router.get("/:role/:id", authorization, getNotifByUser);
router.get("/unread/:role/:id", authorization, getCountNotif);

module.exports = router