const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("notes_db", noteSchema);
module.exports = Note;
