// Import any necessary modules or models

const User = require("../models/userModel");
const Story = require("../models/storyModel");

exports.fetchUserDetails = (req, res) => {
  try {
    const userDetails = User.findById(req.user.id);
    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching user details",
      data: error.message,
    });
  }
};

// Fetch stories created by the user
exports.fetchMyStories = async (req, res) => {
  try {
    const stories = await Story.find({ author: req.user.id });
    res.status(200).json({
      success: true,
      message: "Stories retrieved successfully",
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching user stories",
      data: error.message,
    });
  }
};

// Fetch bookmarked stories
exports.fetchBookmarkedStories = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("bookmarks");
    res.status(200).json({
      success: true,

      message: "Bookmarked stories retrieved successfully",
      data: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: "Server error while fetching bookmarked stories",
      data: error.message,
    });
  }
};
