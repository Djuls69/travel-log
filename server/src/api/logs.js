const express = require('express')
const router = express.Router()
const LogEntry = require('../models/logEntry')

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find()
    res.json(entries)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body)
    const createdEntry = await logEntry.save()
    res.json(createdEntry)
  } catch (error) {
    res.status(400)
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const logEntry = await LogEntry.findById(req.params.id)
    if (!logEntry) {
      return res.status(404).json({
        message: 'Log Not Found'
      })
    }
    await logEntry.deleteOne()
    res.json({ message: 'Success' })
  } catch (error) {
    res.status(400)
    next(error)
  }
})

module.exports = router
