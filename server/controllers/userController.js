const User = require("../models/userModel");
const Story = require("../models/storyModel");

exports.fetchUserDetails = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
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
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const count = await Story.countDocuments({ author: req.user.id });
    const stories = await Story.find({ author: req.user.id })
      .skip(skip)
      .limit(limit);

    if (stories.length === 0 && count > 1) {
      return res.status(404).json({
        success: false,
        message: "No stories found for this category",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Stories retrieved successfully",
      data: {
        stories,
        totalStories: count,
        currentPage: page,
      },
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
