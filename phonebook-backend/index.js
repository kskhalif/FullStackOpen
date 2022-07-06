const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(cors());

morgan.token('body', (request, response) => 
    JSON.stringify(request.body)
);
app.use(morgan(':method :url :status :body'));

let phonebook = [
    {
        "id": "Arto Hellas",
        "content": "040-123456"
    },
    {
        "id": "Ada Lovelace",
        "content": "39-44-5323523"
    },
    {
        "id": "Kacem Khalife",
        "content": "734-892-7206"
    },
    {
        "id": "Mohamed Khalife",
        "content": "313-522-7730"
    }
];

app.get('/api/phonebook/:filter?', (request, response) => {
    const userFilter = request.params.filter;
    if (!userFilter) {
        response.send(phonebook);
    }
    else {
        response.send(phonebook.filter(contact =>
            contact.id.toLowerCase().includes(userFilter.toLowerCase())
        ));
    }
});

app.delete('/api/phonebook/:id', (request, response) => {
    const id = request.params.id;
    phonebook = phonebook.filter(contact => contact.id !== id);
    response.status(204).end();
});

app.post('/api/phonebook', (request, response) => {
    const newContact = request.body;
    if (!newContact.id || !newContact.content) {
        response.status(400).send('missing');
    }
    else if (phonebook.find(contact => contact.id === newContact.id)) {
        response.status(400).send('exists');
    }
    else {
        phonebook = phonebook.concat(newContact);
        response.status(204).end();
    }
});

app.put('/api/phonebook/:id', (request, response) => {
    const id = request.params.id;
    const update = request.body;
    phonebook = phonebook.map(contact => contact.id !== id ? contact : update);
    response.status(204).end();
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'});
};
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
