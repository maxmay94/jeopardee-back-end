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
  // origin: '*',
  // methods: 'GET', //! TESTING JUST GET used to be *
  // credentials: 'false'
}))

//------------------- TEST ZONE -------------------
// app.options('*', cors())
// app.get('/api/questions', function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for all origins!' })
// })
// app.get('/api/profiles', function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for all origins!' })
// })
// app.get('/api/auth', function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for all origins!' })
// })
// app.get('/', function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for all origins!' })
// })

//------------------- TEST ZONE -------------------

app.use(logger('dev'))
app.use(express.json())

app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)
app.use('/api/questions', questionsRouter)

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message + " server.js line 38" })
})

export { app }
