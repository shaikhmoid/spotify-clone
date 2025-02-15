const bcrypt = require("bcrypt");
const User = require("../modal/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Message = require("../modal/messages");

const Signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, username, password, imageUrl } = req.body;

  const userName = req.body.username;
  try {
    let user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      firstName,
      lastName,
      username,
      password,
      imageUrl: `https://avatar.iran.liara.run/public/boy?username=${username}`,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const token = await jwt.sign({ id: user._id }, "moid@313");
    res.cookie("token", token);
    await user.save();

    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const token = await jwt.sign({ id: user._id }, "moid@313");
    res.cookie("token", token);

    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getMessages = async (req, res, next) => {
  try {
    const myId = req.user._id;
    const { userId } = req.params;
    console.log(userId);

    if (!userId) {
      throw new error("id is not there");
    }

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId receiverId");

    res.status(200).json(messages);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { Signup, Login, getMessages };
