const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

router.post("/create-user", userController.createUser);
router.get("/get-all-users", userController.getUsers);
router.get("/get-a-user", userController.getSingleUser);
router.put("/update-user", userController.updateUser);
router.delete("/delete-user", userController.deleteUser);

module.exports = router;

