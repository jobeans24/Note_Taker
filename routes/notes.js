const router = require('express').Router();
const path = require('path');
const {notes} = require('../db/db.json');

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    const note = deleteNote(req.params.id, notes);
    res.json(note);
});

module.exports = router;

 
