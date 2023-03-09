const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.post("/signin", AuthController.signin);
router.post("/signup", AuthController.signup);
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;