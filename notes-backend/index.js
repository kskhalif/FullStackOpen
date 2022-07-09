require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note');
const app = express();

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

// const morgan = require('morgan');
// morgan.token('body', (request, response) => 
//     JSON.stringify(request.body)
// );
// app.use(morgan(':method :url :status :body'));

app.get('/api/notes/all', (request, response) => {
    Note.find({})
        .then(notes => response.send(notes));
});

app.get('/api/notes/important', (request, response) => {
    Note.find({important: true})
        .then(notes => response.send(notes));
});

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => response.send(note))
        .catch(() => response.status(404).end());
});

app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndDelete(request.params.id)
        .then(note => response.send(note))
        .catch(() => response.status(400).end());
});

app.post('/api/notes', (request, response) => {
    const note = new Note({
        content: request.body.content,
        date: new Date(),
        important: false,
    });
    note.save()
        .then(note => response.send(note))
        .catch(() => response.status(400).end());
});

app.put('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
        .then(note => {
            note.important = !note.important;
            note.save().then(note => response.send(note));
        })
        .catch(() => response.status(400).end());
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'});
};
app.use(unknownEndpoint);

// const errorHandler = (error, request, response, next) => {
//     console.error(error.message);
//     if (error.name === 'CastError') {
//         return response.status(400).send({error: 'malformatted id'});
//     }
//     else if (error.name === 'ValidationError') {
//         return response.status(400).send({ error: error.message });
//     }
//     next(error);
// };
// app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
