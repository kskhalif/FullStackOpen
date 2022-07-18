const Note = require('../models/note');
const User = require('../models/user');

const nonExistingID = async () => {
  const user = await User.findOne({});
  const note = new Note(
    { 
      content: 'will remove soon', 
      user: user._id 
    }
  );
  await note.save();
  await note.remove();
  return note._id.toString();
};

const notesInDB = async () => {
  const notes = await Note.find({});
  return notes;
};

const initialNotes = async () => {
  const initialUsers = await User.find({});
  return [
    { 
      content: 'mongoose is cool',
      user: initialUsers[0]._id
    },
    { 
      content: 'jest is also cool',
      user: initialUsers[1]._id
    },
    { 
      content: 'this note is for testing',
      user: initialUsers[2]._id
    }
  ];
};

module.exports = { 
  nonExistingID, 
  notesInDB, 
  initialNotes 
};
