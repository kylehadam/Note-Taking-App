const express = require('express');
const Note = require('../models'); // Make sure the path is correct based on your project structure
const router = express.Router();

// Get all notes
router.get('/notes', async (req, res) => {
   try {
      const notes = await Note.find();
      res.json(notes);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Create a new note
router.post('/notes', async (req, res) => {
   const note = new Note({
      title: req.body.title,
      content: req.body.content,
      user: req.body.user // Replace with actual user ID handling
   });
   try {
      const newNote = await note.save();
      res.status(201).json(newNote);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// Update a note
router.put('/notes/:id', async (req, res) => {
   try {
      const note = await Note.findById(req.params.id);
      if (!note) {
         return res.status(404).json({ message: 'Note not found' });
      }
      note.title = req.body.title || note.title;
      note.content = req.body.content || note.content;
      note.user = req.body.user || note.user;

      const updatedNote = await note.save();
      res.json(updatedNote);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// Delete a note
router.delete('/notes/:id', async (req, res) => {
   try {
      const note = await Note.findById(req.params.id);
      if (!note) {
         return res.status(404).json({ message: 'Note not found' });
      }
      await note.remove();
      res.json({ message: 'Note deleted' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = router;
