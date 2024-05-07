const router = require('express').Router();
const path = require('path');
const {notes} = require('../db/db.json');
const { v4: uuid } = require('uuid');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
}
);

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
}
);

router.get('/api/notes', (req, res) => {
    res.json(notes);
}
);

router.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid()
        };
        notes.push(newNote);
        res.json(newNote);
    } else {
        res.json('Error in posting feedback');
    }
}
);

router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    notes.splice(noteId, 1);
    res.json('Note deleted');
}
);

module.exports = router;


 
