const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json({ notes });
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title must be at least 3 characters").isLength({
      min: 3,
    }),
    body("description", "description at least 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = await Note.create({
        user: req.user.id,
        title,
        description,
        tag,
      });
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({error:"server error"})
    }
  }
);

module.exports = router;
