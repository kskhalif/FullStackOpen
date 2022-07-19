const jwt = require('jsonwebtoken');
const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }
  return null;
};

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

notesRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  const note = request.body;
  note.user = user._id;
  const savedNote = await Note.create(note);
  user.notes = user.notes.concat(savedNote._id);
  await user.save();
  response.status(201).send(savedNote);
});

notesRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  const note = await Note.findById(request.params.id);
  if (!note) {
    return response.status(400).send({ 
      error: 'note does not exist' 
    });
  }
  if (note.user.toString() !== user._id.toString()) {
    return response.status(401).send({ 
      error: 'user not authorized to delete note'
    });
  }
  user.notes = user.notes.filter(id => id.toString() !== note._id.toString());
  await user.save();
  await note.remove();
  response.status(204).end();
});

notesRouter.put('/:id', async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  const note = await Note.findById(request.params.id);
  if (!note) {
    return response.status(400).send({ 
      error: 'note does not exist' 
    });
  }
  if (note.user.toString() !== user._id.toString()) {
    return response.status(401).send({ 
      error: 'user not authorized to update note'
    });
  }
  note.important = !note.important;
  const updatedNote = await note.save();
  response.send(updatedNote);
});

module.exports = notesRouter;
