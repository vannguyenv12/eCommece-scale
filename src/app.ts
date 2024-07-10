import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
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
app.use((req, res, next) => {
  const error: any = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error'
  })
})

export default app
