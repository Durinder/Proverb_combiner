const mongoose = require('mongoose')

const allFinSchema = mongoose.Schema({
  content: String,
  location: String
})

allFinSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

module.exports = mongoose.model('All_Fin', allFinSchema)