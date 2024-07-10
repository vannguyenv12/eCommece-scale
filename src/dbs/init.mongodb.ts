import mongoose from 'mongoose'
import { countConnect } from '~/helpers/check.connect'
import config from '~/configs/config.mongodb'

const { db: { host, name, port } } = config;

class Database {
  static instance: Database

  constructor() {
    this.connect()
  }

  public connect(type = 'mongodb') {
    const isEnv = true
    if (isEnv) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose
      .connect(`mongodb://${host}:${port}/${name}`)
      .then((_) => console.log('Connected Mongodb Success', countConnect()))
      .catch((err) => console.log('Error Connect'))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()
export default instanceMongodb
