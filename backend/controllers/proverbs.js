const proverbsRouter = require('express').Router()
const Fin = require('../models/fin')
const AllFin = require('../models/allFin')
const translate = require('@vitalets/google-translate-api')

proverbsRouter.get('/', async (request, response, next) => {
  try {
    response.sendFile('views/mainpage.html', {root: __dirname})
    // const proverbs = await Fin.find({})
    // response.json(proverbs.map(proverb => proverb.toJSON()))
  }
  catch(error) {
    next(error)
  }
})

proverbsRouter.get('/random', async (request, response, next) => {
  try {
    const count = await AllFin.count()
    const random = Math.floor(Math.random() * count)
    const proverb = await AllFin.findOne().skip(random)

    const translatedProverb = await translate(proverb.content, {to: 'en'})
    const translatedLocation = await translate(proverb.location, {to: 'en'})

    response.send(`<!DOCTYPE html><title>Sananlaskuja</title>
    <h1>${proverb.content} (${proverb.location})</h1>
    <h1>${translatedProverb.text} (${translatedLocation.text})</h1>`)
  }
  catch(error) {
    next(error)
  }
})

proverbsRouter.get('/combined', async (request, response, next) => {
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
        newLocation += ` / ${ret.location}`
      }
    }

    const translatedProverb = await translate(newProverb, {to: 'en'})
    const translatedLocation = await translate(newLocation, {to: 'en'})

    response.send(`<!DOCTYPE html><title>Sananlaskuja</title><h1>${newProverb} (${newLocation})</h1>
    <h1>${translatedProverb.text} (${translatedLocation.text})</h1>`)
  }
  catch(error) {
    next(error)
  }
})

module.exports = proverbsRouter