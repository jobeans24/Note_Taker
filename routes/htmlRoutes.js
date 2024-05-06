const routes = require('express').Router();
const path = require('path');
const fs = require('fs');
const { notes } = require('../db/db.json');

// GET Route for homepage
routes.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

// GET Route for notes page
routes.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// GET Route for all notes
routes.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST Route for a new note
routes.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: notes.length,
    };
    notes.push(newNote);
    res.json(newNote);
  } else {
    res.json('Error in posting feedback');
  }
});

// DELETE Route for a specific note
routes.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  notes.splice(noteId, 1);
  res.json('Note deleted');
});

module.exports = routes;
