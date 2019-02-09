import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// router.get('/me', (req, res) => {
//   res.send({ data: 'router here' })
// })

router
  .route('/cat')
  .get()
  .post()

router
  .route('/cat/:id')
  .get()
  .put()
  .delete()
app.use('/api', router)

// custom middleware
const log = (req, res, next) => {
  console.log('logging here')
  req.myData = 'data from middleware'
  next()
}

// get request
app.get('/data/*', log, (req, res) => {
  res.send({ message: 'hello world once', data: req.myData })
})

// post request
app.post('/data', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is running on port 3000')
  })
}
