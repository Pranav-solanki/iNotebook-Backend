const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post(
  "/createuser",
  [
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("name", "Name is required").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // Check validation errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const salt = bcrypt.genSaltSync(10);
    const secpass=await bcrypt.hash(req.body.password,salt)
    try {
      // Create user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass, // ✅ fixed typo here
      });
      const jwt_key="shhh"
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,jwt_key);
      res.status(201).json({authtoken}); // Success response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
