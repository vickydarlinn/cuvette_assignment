const mongoose = require("mongoose");
const app = require("./app");

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected at port " + process.env.PORT))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
