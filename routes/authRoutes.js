const express = require("express");
const { signup, login } = require("../controllers/authController");
const { validateUser, validateLoginUser } = require("../validation/user");

const router = express.Router();

router.post("/signup", validateUser, signup);
router.post("/login", validateLoginUser, login);

module.exports = router;
