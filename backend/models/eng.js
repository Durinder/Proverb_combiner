const mongoose = require('mongoose')

const engSchema = mongoose.Schema({
  content: String
})

engSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Eng', engSchema)