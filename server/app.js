const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(express.json()); // Middleware to parse JSON bodies

// Basic route
const authRoutes = require("./routes/authRouter");
const storiesRoutes = require("./routes/storyRouter");
const userRoutes = require("./routes/userRouter");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/stories", storiesRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Web Story Platform!");
});
console.log(process.env.PORT);

module.exports = app;
