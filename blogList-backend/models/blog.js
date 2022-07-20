const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    default: 'N/A' 
  },
  url: { 
    type: String, 
    required: true 
  },
  likes: { 
    type: Number, 
    default: 0 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', blogSchema);
