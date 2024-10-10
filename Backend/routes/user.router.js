const router = require("express").Router();
const UserController = require('../controller/user.controller');
router.post("/reg",UserController.register);
router.post("/login", UserController.login);
router.post("/resetPass", UserController.resetPass);
router.patch("/profile", UserController.updateUserProfile);
router.get("/profile", UserController.getUserProfile);
router.delete("/profile", UserController.deleteUser);
router.patch("/newPass", UserController.newPass);


module.exports = router;