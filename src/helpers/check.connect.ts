import mongoose from 'mongoose'
import os from 'os'

const _SECONDS = 5000

export const countConnect = () => {
  const numConnections = mongoose.connections.length
  console.log(`Number of connections: ${numConnections}`)
}

// check overload
// const checkOverload = () => {
//   setInterval(() => {
//     const numConnections = mongoose.connections.length
//     const numCores = os.cpus().length;
//     const memoryUsage = process.memoryUsage().rss
//   }, _SECONDS)
// }
