var express = require("express");
var router = express.Router();

var auth = require("../auth"); //used for token authentication

var userController = require("../controllers/userController"); //used to separate routes and controllers

router.post("/add_user", userController.add_user);
router.post("/login/", userController.user_login_post);
router.post("/list", userController.user_list);
router.post("/profile", auth, userController.profile);
router.post("/disable", auth, userController.disable_user);
router.post("/active", auth, userController.active);

module.exports = router;
