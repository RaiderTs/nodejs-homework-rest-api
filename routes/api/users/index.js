const express = require("express");
const router = express.Router();

const guard = require("../../../helpers/guard");
const validate = require("./validation");
const { createAccountLimiter } = require("../../../helpers/rate-limit-reg");
const upload = require('../../../helpers/upload')
const userController = require("../../../controllers/users"); 

router.post(
  "/registration",
  createAccountLimiter,
  validate.registration,
  userController.reg
);
router.post("/login", validate.login, userController.login);
router.post("/logout", guard, userController.logout);
router.patch(
  '/avatars',
  [guard, upload.single('avatar'), validate.uploadAvatar],
  userController.avatars
)

module.exports = router;
