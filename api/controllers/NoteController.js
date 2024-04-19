// Importing Models
const Note = require("../models/noteModel");
const Joi = require('joi');

// Define the validation schema
const schema = Joi.object({
  title: Joi.string().required().max(100),
  details: Joi.string().required(),
  color: Joi.string().required(),
});

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
  // Validate the request body against the schema
  const { error, value } = schema.validate(req.body);

  // If there's a validation error, respond with a 400 Bad Request
  if (error) {
    return res.status(400).json({
      statusCode: 400,
      msg: error.details[0].message
    })
  }

  try {
    const newNote = new Note({
      title: value.title,
      details: value.details,
      color: value.color,
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
    res.status(400).json({ statusCode: 400, msg: 'The note does not exist!' });
  }

  // Validate the request body against the schema
  const { error, value } = schema.validate(req.body);

  // If there's a validation error, respond with a 400 Bad Request
  if (error) {
    return res.status(400).json({
      statusCode: 400,
      msg: error.details[0].message
    })
  }

  try {
    // Find the existing snippet by _id and update its fields
    const result = await Note.updateOne(
      { _id: id },
      {
        $set: {
          title: value.title,
          details: value.details,
          color: value.color,
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
      res.status(400).json({ statusCode: 400, msg: 'The note does not exit!' });
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
