const proverbsRouter = require('express').Router()
const Fin = require('../models/fin')

proverbsRouter.get('/', async (request, response, next) => {
  try {
    const proverbs = await Fin.find({})
    response.json(proverbs.map(proverb => proverb.toJSON()))
  }
  catch(error) {
    next(error)
  }
})

module.exports = proverbsRouter