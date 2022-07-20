const bcrypt = require('bcryptjs');
const User = require('../models/user');

const passwordHash = async (password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

const nonExistingID = async () => {
  const passwordHashX = await passwordHash('P@sswordX'); 
  const user = new User({ 
    username: 'userX',
    name: 'Person X',
    passwordHash: passwordHashX
  });
  await user.save();
  await user.remove();
  return user._id;
};

const usersInDB = async () => {
  const users = await User.find({});
  return users;
};

const intialUsers = async () => {
  const passwordHash1 = await passwordHash('P@ssword1');
  const passwordHash2 = await passwordHash('P@ssword2');
  const passwordHash3 = await passwordHash('P@ssword3');
  return [
    {
      username: 'user1',
      name: 'Person One',
      passwordHash: passwordHash1
    },
    {
      username: 'user2',
      name: 'Person Two',
      passwordHash: passwordHash2
    },
    {
      username: 'user3',
      name: 'Person Three',
      passwordHash: passwordHash3
    }
  ];
};

module.exports = { 
  nonExistingID, 
  usersInDB, 
  intialUsers 
};
