const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const usernameValidator = require('password-validator');

const usernameSchema = new usernameValidator();
usernameSchema
  .has().letters()
  .has().not().spaces();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    validate: {
      validator: ((v) => usernameSchema.validate(v)),
      msg: 'username must have at least one letter and contain zero spaces'
    }
  },
  name: {
    type: String,
    default: function() { return this.username }
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: {
    type: [ 
      { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ],
    default: []
  }
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._v;
    delete returnedObject.passwordHash;
  }
});

module.exports = mongoose.model('User', userSchema);
