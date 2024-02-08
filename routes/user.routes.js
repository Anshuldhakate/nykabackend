const express= require("express")
const bcrypt= require("bcrypt")
const User = require("../model/user.model");
const jwt= require("jsonwebtoken")

const userRouter= express.Router()


userRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.status(200).json({ msg: "The new user has been registered!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Login route
  userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        "masai" // Replace this with your actual secret key
      );
  
      res.status(200).json({ msg: "Logged In!", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  module.exports = {
    userRouter,
  };