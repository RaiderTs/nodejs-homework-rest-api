const express = require('express')
const router = express.Router()

const validate = require('./validation')
const contactsController = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')

router
  .get('/', guard, contactsController.getContacts)
  .post('/', guard, validate.addContact, contactsController.create)

router
  .get('/:contactId', guard, contactsController.getById)
  .delete('/:contactId', guard, contactsController.remove)
  .put('/:contactId', guard, validate.updateContact, contactsController.update)

router.patch('/:contactId/phone', guard, contactsController.updateContactPhone)

module.exports = router