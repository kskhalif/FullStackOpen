require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Contact = require('./models/contact');
const app = express();

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

// const morgan = require('morgan');
// morgan.token('body', (request, response) => 
//     JSON.stringify(request.body)
// );
// app.use(morgan(':method :url :status :body'));

app.get('/api/phonebook/:filter?', (request, response) => {
    const filter = request.params.filter;
    if (!filter) {
        Contact
            .find({})
            .then(contacts => response.send(contacts));
    }
    else {
        Contact
            .find({_id: { $regex: filter, $options: 'i'}})
            .then(contacts => response.send(contacts));
    }
});

app.delete('/api/phonebook/:id', (request, response) => {
    Contact
        .findByIdAndDelete(request.params.id)
        .then(contact => response.send(contact))
        .catch(() => response.status(400).end());
});

app.post('/api/phonebook', (request, response) => {
    const body = request.body;
    Contact
        .exists({_id: body.id})
        .then(result => {
            if (result !== null) {
                return response.status(400).send('exists');
            }
            const contact = new Contact({
                _id: body.id,
                content: body.content
            });
            contact
                .save()
                .then(contact => response.send(contact))
                .catch(() => response.status(400).send('missing'));
        });
});

app.put('/api/phonebook/:id', (request, response) => {
    Contact
        .findById(request.params.id)
        .then(contact => {
            contact.content = request.body.content;
            contact.save().then(contact => response.send(contact));
        })
        .catch(() => response.status(400).end());
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'});
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
