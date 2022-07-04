const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(cors());

morgan.token('body', (request, response) => 
    JSON.stringify(request.body)
);
app.use(morgan(':method :url :status :body'));

let notes = [
    {
        "id": 1,
        "content": "HTML is easy",
        "date": "2022-1-17T17:30:31.098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "date": "2022-1-17T18:39:34.091Z",
        "important": false
    },
    {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2022-1-17T19:20:14.298Z",
        "important": true
    }
];

app.get('/api/notes', (request, response) => {
    response.send(notes);
});

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id)
    if (note) 
        response.send(note);
    else 
        response.status(404).end();
});

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
});

app.post('/api/notes', (request, response) => {
    const body = request.body;
    if (!body.content) {
        return response.status(400).send({error: 'content missing'});
    }
    const note = {
        content: body.content,
        date: new Date(),
        important: body.important || false,
        id: 1 + (notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0)
    };
    notes = notes.concat(note);
    response.send(note);
});

app.put('/api/notes/:id', (request, response) => {
    const body = request.body;
    notes = notes.map(note => note.id !== body.id ? note : body);
    response.send(body);
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'});
};
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
