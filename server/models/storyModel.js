const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["food", "health_and_fitness", "travel", "movies", "education"],
  },
  slides: [
    {
      heading: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Story", StorySchema);
