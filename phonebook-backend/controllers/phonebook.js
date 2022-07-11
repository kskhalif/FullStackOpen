const phonebookRouter = require('express').Router();
const Contact = require('../models/contact');

phonebookRouter.get('/:filter?', (request, response) => {
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

phonebookRouter.delete('/:id', (request, response) => {
  Contact
      .findByIdAndDelete(request.params.id)
      .then(contact => response.send(contact))
      .catch(() => response.status(400).end());
});

phonebookRouter.post('/', (request, response) => {
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

phonebookRouter.put('/:id', (request, response) => {
  Contact
      .findById(request.params.id)
      .then(contact => {
          contact.content = request.body.content;
          contact.save().then(contact => response.send(contact));
      })
      .catch(() => response.status(400).end());
});

module.exports = phonebookRouter;
