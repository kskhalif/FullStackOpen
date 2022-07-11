const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    content: { type: String, required: true }
});

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Contact', contactSchema);
