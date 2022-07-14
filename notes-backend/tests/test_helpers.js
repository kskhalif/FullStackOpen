const Note = require('../models/note');

const nonExistingID = async () => {
  const note = new Note({ content: 'will remove soon' });
  await note.save();
  await note.remove();
  return note._id.toString();
};

const notesInDB = async () => {
  const notes = await Note.find({});
  return notes;
};

module.exports = { nonExistingID, notesInDB };
