const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("name", "Name is required").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // Check validation errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      // Create user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, // ✅ fixed typo here
      });

      res.status(201).json(user); // Success response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);



module.exports = router;
