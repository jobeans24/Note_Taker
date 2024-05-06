
const express = require('express');
const path = require('path');
const clog = require('./middleware/clog.js');
const fs = require('./helpers/fsUtils');
const apiRoutes = require('./routes/notes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
    );

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('/api/notes', (req, res) => {
    fs.readAndAppend(req.body, './db/db.json');
    res.json('Note added');
}
);

app.get('/api/notes', (req, res) => {
    fs.readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
}
);

app.delete('/api/notes/:id', (req, res) => {
    fs.readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const newJson = json.filter((note) => note.id !== req.params.id);
            fs.writeToFile('./db/db.json', newJson);
            res.json('Note deleted');
        });
}
);


module.exports = app;

