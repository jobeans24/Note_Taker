
const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
}
);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
}
);

app.post('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
}
);

app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json')));
    res.json(notes);
}
);

app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json')));
    const newNote = req.body;
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(notes));
    res.json(newNote);
}
);

app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json')));
    const noteId = req.params.id;
    const newNotes = notes.filter(note => note.id !== noteId);
    fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(newNotes));
    res.json(newNotes);
}
);


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
}
);

