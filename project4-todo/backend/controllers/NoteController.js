// Importing Models
const Note = require("../models/noteModel");

// To retrieve all notes from the database
const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json({ data: notes });
  } catch (error) {
    console.log('Error in getAllNotes() in NoteController: ', error);
    next(error);
    res.status(500).json({ msg: 'Internal server error!' });
  }
}

const addNote = async (req, res, next) => {
  try {
    const newNote = new Note({
      title: value.title,
      details: value.details,
    });

    await newNote.save();

    res.status(201).json({ statusCode: 201, msg: 'New note added successfully!' });
  } catch (error) {
    console.log('Error in addNote() in NoteController: ', error);
    next(error);
    res.status(500).json({ msg: 'Internal server error!' });
  }
};

const getSingleNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    res.status(200).json({ data: note });
  } catch (error) {
    console.log('Error in getSingleNote() in NoteController: ', error);
    next(error);
    res.status(500).json({ msg: 'Internal server error!' });
  }
}

const updateNote = async (req, res, next) => {
  const { id } = req.params;

  const noteCount = await Note.findById(id).countDocuments();
  
  if (noteCount === 0) {
    res.status(404).json({ statusCode: 404, msg: 'The note does not exist!' });
  }

  try {
    // Find the existing snippet by _id and update its fields
    const result = await Note.updateOne(
      { _id: id },
      {
        $set: {
          title: value.title,
          details: value.details,
        },
      }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ statusCode: 200, msg: 'The note was updated successfully!' });
    } else {
      return res.status(500).json({ statusCode: 500, msg: 'Failed to update the note!' });
    }

  } catch (error) {
    console.log('Error in updateNote() in NoteController: ', error);
    next(error);
    res.status(500).json({ msg: 'Internal server error!' });
  }
};

const deleteNote = async (req, res, next) => {
  try {

    const { id } = req.params;

    const noteCount = await Note.findById(id).countDocuments();

    if (noteCount === 0) {
      res.status(404).json({ statusCode: 404, msg: 'The note does not exit!' });
    }

    // Find the existing snippet by _id and delete the document
    const result = await Note.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res.status(200).json({ statusCode: 200, msg: 'The note was deleted successfully!' });
    } else {
      return res.status(500).json({ statusCode: 500, msg: 'Failed to delete the note!' });
    }
  } catch (error) {
    console.log('Error in updateNote() in NoteController: ', error);
    next(error);
    res.status(500).json({ msg: 'Internal server error!' });
  }
};

module.exports = { getAllNotes, addNote, getSingleNote, updateNote, deleteNote };
