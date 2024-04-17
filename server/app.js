const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// Basic route
const authRoutes = require("./routes/authRouter");
const storiesRoutes = require("./routes/storyRouter");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/stories", storiesRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Web Story Platform!");
});
console.log(process.env.PORT);
app.use(express.json()); // Middleware to parse JSON bodies

module.exports = app;
