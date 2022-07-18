const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

notesRouter.get('/all', async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.send(notes);
});

notesRouter.get('/important', async (request, response) => {
  const notes = await Note
    .find({important: true})
    .populate('user', { username: 1, name: 1 });
  response.send(notes);
});

notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 });
  note ? response.send(note) : response.status(404).end();
});

notesRouter.delete('/:id', async (request, response) => {
  const note = await Note.findByIdAndDelete(request.params.id);
  note ? response.status(204).send(note) : response.status(400).end();
});

notesRouter.post('/', async (request, response) => {
  const newNote = new Note(request.body);
  const savedNote = await newNote.save();
  const user = await User.findById(savedNote.user);
  user.notes = user.notes.concat(savedNote._id);
  await user.save();
  response.status(201).send(savedNote);
});

notesRouter.put('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (!note) {
    return response.status(400).end();
  }
  note.important = !note.important;
  const updatedNote = await note.save();
  response.send(updatedNote);
});

module.exports = notesRouter;
