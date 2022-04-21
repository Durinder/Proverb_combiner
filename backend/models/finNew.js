const mongoose = require('mongoose')

const finNewSchema = mongoose.Schema({
  content: String
})

finNewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Fin_new', finNewSchema)