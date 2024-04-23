const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
        data: null,
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        data: null,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,

      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: 3600,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        user: {
          id: newUser._id,
          username: newUser.username,
        },
        token,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: err.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
        data: null,
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
        data: null,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res.json({
      success: true,
      message: "Logged in successfully.",
      data: {
        user: {
          id: user._id,
          username: user.username,
        },
        token,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: err.message,
    });
  }
};
