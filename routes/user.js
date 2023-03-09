const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/userController");

//login request
router.post("/login", loginUser);

//account registration request
router.post("/register", registerUser);

module.exports = router;
