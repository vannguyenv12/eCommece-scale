type Env = 'dev' | 'pro'

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 5000
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'shopDEV'
  }
}

const pro = {
  app: {
    port: process.env.PRO_APP_POR || 5000
  },
  db: {
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAM || 'shopPRO'
  }
}

const config = { dev, pro }
const env: Env = (process.env.NODE_ENV as Env) || 'dev'

export default config[env]
