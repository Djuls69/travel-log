const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
require('dotenv').config()
const { notFound, errorHandler } = require('./middlewares')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
)
app.use(helmet())
app.use(morgan('common'))

app.get('/', (req, res) => {
  res.json({ message: 'Hello there!' })
})

app.use('/api/logs', require('./api/logs'))

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`App running on port ${port}`))
