const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/all', (request, response) => {
  Note.find({})
      .then(notes => response.send(notes));
});

notesRouter.get('/important', (request, response) => {
  Note.find({important: true})
      .then(notes => response.send(notes));
});

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
      .then(note => response.send(note))
      .catch(() => response.status(404).end());
});

notesRouter.delete('/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id)
      .then(note => response.send(note))
      .catch(() => response.status(400).end());
});

notesRouter.post('/', (request, response) => {
  const note = new Note({
      content: request.body.content,
      date: new Date(),
      important: false,
  });
  note.save()
      .then(note => response.send(note))
      .catch(() => response.status(400).end());
});

notesRouter.put('/:id', (request, response) => {
  Note.findById(request.params.id)
      .then(note => {
          note.important = !note.important;
          note.save().then(note => response.send(note));
      })
      .catch(() => response.status(400).end());
});

module.exports = notesRouter;
