const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://kkhalife:${password}@cluster0.nnrar.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const contactSchema = new mongoose.Schema({
    _id: String,
    content: String
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 3) {
    mongoose
        .connect(url)
        .then(() => Contact.find({}))
        .then(result => {
            console.log('phonebook:');
            result.forEach(contact => console.log(contact.name, contact.number));
            mongoose.connection.close();
        })
        .catch(error => console.log(error));
}
else {
    mongoose
        .connect(url)
        .then(() => {
            const contact = new Contact({
                _id: process.argv[3],
                content: process.argv[4]
            });
            return contact.save();
        })
        .then(() => {
            console.log('contact saved');
            return mongoose.connection.close();
        })
        .catch(error => console.log(error));
}
