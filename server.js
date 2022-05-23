import 'dotenv/config.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'

import { router as profilesRouter } from './routes/profiles.js'
import { router as authRouter } from './routes/auth.js'
import { router as questionsRouter } from './routes/questions.js'

import('./config/database.js')

const app = express()

app.use(cors({
  origin: '*',
  methods: '*'
}))

//------------------- TEST ZONE -------------------
app.options('/questions/play', cors())
app.get('/questions/play', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' })
})
//------------------- TEST ZONE -------------------

app.use(logger('dev'))
app.use(express.json())

app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)
app.use('/api/questions', questionsRouter)

app.use(function (req, res, next) {
  res.status(404).json({ err: "Not found this is in server.js line 34" })
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message + " server.js line 38" })
})

export { app }
