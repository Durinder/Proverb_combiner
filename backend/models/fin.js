const mongoose = require('mongoose')

const finSchema = mongoose.Schema({
  content: [String],
  location: String
})

finSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Fin', finSchema)