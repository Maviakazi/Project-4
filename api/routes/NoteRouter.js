const router = require('express').Router();
const { getAllNotes, addNote, getSingleNote, updateNote, deleteNote } = require('../controllers/NoteController');

router.get('/', getAllNotes);
router.get('/:id', getSingleNote);
router.delete('/:id', deleteNote);
router.post('/add', addNote);
router.patch('/update/:id', updateNote);

module.exports = router;