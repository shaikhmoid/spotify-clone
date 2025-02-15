const express = require("express");

const { check } = require("express-validator");
const {
  Signup,
  Login,
  getMessages,
} = require("../controller.js/authController");
const authMiddleware = require("../middleware/userMiddleware");
const User = require("../modal/user");
const Message = require("../modal/messages");

const router = express.Router();

router.post(
  "/signup",
  [
    check("firstName", "firstname is required").not().isEmpty(),
    check("username", "Username is requireddd").not().isEmpty(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  Signup
);

router.post(
  "/login",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  Login
);

router.post("/logout", authMiddleware, (req, res) => {
  const { token } = req.cookies;
  res.cookie("token", { expires: new Date(1) });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

router.get("/user", authMiddleware, (req, res) => {
  const user = req.user;
  if (!user) {
    res.send("user not found");
  }
  res.status(200).json({ user });
});

router.get("/alluser", authMiddleware, async (req, res) => {
  const user = req.user;
  const allUser = await User.find({
    _id: { $ne: user._id },
  });

  res.status(200).json({ allUser });
});

router.get("/messages/:userId", authMiddleware, getMessages);

module.exports = router;
