const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Article = require("./models/Article");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// User Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registration successful" });
  } catch (error) {
    res.status(500).json({ message: "An error has occurred." });
  }
});

// User login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found.");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Incorrect password.");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
});

// Post upload
app.post("/api/upload", async (req, res) => {
  try {
    const { title, content, category, price } = req.body;
    const article = new Article({
      title,
      content,
      category,
      price,
      isPay: false,
    });
    await article.save();
    res.status(201).json({ message: "Post upload success" });
  } catch (error) {
    res.status(500).json({ message: "An error has occurred." });
  }
});

// Get all posts
app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "An error has occurred." });
  }
});

// Get specific post with id
app.get("/api/article/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) throw new Error("Article not found.");
    res.status(200).json(article);
  } catch (error) {
    res.status(404).json({ message: "Article not found." });
  }
});

// Get specific post with id
app.post("/api/pay", async (req, res) => {
  try {
    const updateData = { isPay: true };
    const article = await Article.findByIdAndUpdate(
      req.body.articleId,
      updateData
    );
    if (!article) throw new Error("Article not found.");
    res.status(200).json(article);
  } catch (error) {
    res.status(404).json({ message: "Article not found." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
