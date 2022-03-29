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

proverbsRouter.get('/random', async (request, response, next) => {
  try {
    const count = await Fin.count()
    const random = []
    for (let i = 0; i < 2; i++) {
      random[i] = Math.floor(Math.random() * count)
    }

    let newProverb = ''
    let newLocation = ''
    for (let i = 0; i < 2; i++) {
      let ret = await Fin.findOne().skip(random[i])
      if (i == 0) {
        newProverb += ret.content[i]
        newLocation += ret.location
      }
      else {
        newProverb += `, ${ret.content[i]}`
        newLocation += `/${ret.location}`
      }
    }
    response.send(`<!DOCTYPE html><title>Random Proverb Combined</title><h1>${newProverb} (${newLocation})</h1>`)
  }
  catch(error) {
    next(error)
  }
})

module.exports = proverbsRouter