import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'

const app = express()

// Init Middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
// Init DB
import instanceMongodb from './dbs/init.mongodb'
import router from './routers'
instanceMongodb
// Init routes
app.use('/', router)
// Handle error

export default app
