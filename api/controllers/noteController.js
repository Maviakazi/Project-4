// Importing Models
const Note = require("../models/note");

// Importing Models
const Note = require("../models/note");

// Controllers

// To retrieve all notes from the database
const get_all_notes = (req, res) => {
  Note.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      if (result.length > 0) {
        res.json({
          msg: "All notes have been fetched successfully!",
          content: result,
        });
      } else {
        res.json({ msg: "No notes to show!" });
      }
    })
    .catch((error) => res.json({ msg: error.message }));
};

// To add a new note to the database
const add_note = (req, res) => {
  let note = new Note(req.body);
  note
    .save()
    .then((result) => {
      res.json({
        msg: "Your note was saved successfully!",
        content: result,
      });
    })
    .catch((error) => res.json({ msg: error.message }));
};