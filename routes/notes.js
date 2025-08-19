const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
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
      const note = await Notes.create({
        user: req.user.id,
        title,
        description,
        tag,
      });
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "server error" });
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
      const { title, description, tag } = req.body;
  const newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }
  if (note.user.toString() != req.user.id) {
    return res.status(401).send("unauthorized");
  }
  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote },{new:true});
  res.json({note})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("internal server issue")
  }

});

module.exports = router;
