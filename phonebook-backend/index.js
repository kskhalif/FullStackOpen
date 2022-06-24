const express = require('express');
const morgan = require('morgan');
const app = express();

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method);
//     console.log('Path:  ', request.path);
//     console.log('Body:  ', request.body);
//     console.log('---');
//     next();
// };

morgan.token('body', (request, response) => {
    return JSON.stringify(request.body);
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
// app.use(requestLogger);

let phonebook = {
    Arto_Hellas: "040-123456",
    Ada_Lovelace: "39-44-5323523",
    Dan_Abramov: "12-43-234345",
    Mary_Poppendieck: "39-23-6423122"
};
let size = 4;

app.get('/', (request, response) => {
    response.send('<h1>Welcome to PhoneBook!</h1>');
});

app.get('/info', (request, response) => {
    let str = `Phonebook has info for ${size} people.<br/>`;
    str += `${new Date()}`;
    response.send(str);
});

app.get('/api/persons', (request, response) => {
    let str = "";
    for ([key, val] of Object.entries(phonebook))
        str += `${key}: ${val}<br/>`;
    response.send(str);
});

app.get('/api/persons/:name', (request, response) => {
    const name = request.params.name;
    const number = phonebook[name];
    if (number !== undefined)
        response.send(`${name}: ${number}`);
    else
        response.status(404).send(`${name} isn't in the phonebook.`);
});

app.delete('/api/persons/:name', (request, response) => {
    const name = request.params.name;
    if (!phonebook[name])
        response.status(400).send(`${name} isn't in the phonebook.`);
    else
    {
        delete phonebook[name];
        --size;
        response.status(204).send(`${name} has been removed from the phonebook.`);
    }
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number)
        response.status(400).send("Error: missing name and/or number.");
    else if (phonebook[body.name])
        response.status(400).send(`${body.name} is already in the phonebook.`)
    else
    {
        phonebook[body.name] = body.number;
        ++size;
        response.status(204).send(`${body.name} has been added to the phonebook.`)
    }
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'});
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
