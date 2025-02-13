/* eslint-disable */
require('dotenv').config()
require('module-alias/register')
const express = require('express')
const path = require('path')

require('express-async-errors')

const { PORT, inProduction } = require('@util/common')
const logger = require('@util/logger')

const { initializeDatabaseConnection } = require('@root/server/database/connection')

const { startBackupJob } = require('@root/server/scripts/backupAnswers')
const { startDeadlineWatcher } = require('@root/server/scripts/deadlineWatcher')
const { seed } = require('@root/server/scripts/seed')
const { getUserList } = require('@root/server/scripts/getUserList')
const { createTempAnswers } = require('@root/server/scripts/createTempAnswers');
const { devConfig, prodConfig } = require('./esbuild_config');

initializeDatabaseConnection()
  .then(() => {
    // Scripts that can be ran manually
    if (process.argv[2]) {
      switch (process.argv[2]) {
        case 'seed':
          seed()
          return
        case 'getUserList':
          getUserList()
          return
        case 'generateMissingTempAnswers':
          createTempAnswers()
          return
        default:
          return
      }
    }

    const app = express()
    const server = require('http').Server(app)
    const io = require('socket.io')(server)
    io.on('connection', socket => {
      socket.on('update_field', room => require('@util/websocketHandlers').updateField(socket, room, io))
      socket.on('join', room => require('@util/websocketHandlers').joinRoom(socket, room, io))
      socket.on('leave', room => require('@util/websocketHandlers').leaveRoom(socket, room))
      socket.on('get_lock', room => require('@util/websocketHandlers').getLock(socket, room, io))
    })  

    // Require is here so we can delete it from cache when files change (*)
    app.use('/api', (req, res, next) => require('@root/server')(req, res, next)) // eslint-disable-line

    if (!inProduction) {
      require('esbuild').build(devConfig).then(s => logger.info("Build successful"))
    } else {
      require('esbuild').build(prodConfig).then(s => logger.info("Build successful"))
    }

    const DIST_PATH = inProduction
      ? path.resolve(__dirname, './dist/prod')
      : path.resolve(__dirname, './dist/dev')
    const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

    app.use(express.static(DIST_PATH))
    app.get('*', (req, res) => res.sendFile(INDEX_PATH))

    server.listen(PORT, () => {
      logger.info(`Started on port ${PORT}`)
      startBackupJob()
      startDeadlineWatcher()
    })
  })
  .catch(e => {
    process.exitCode = 1
    logger.error(e)
  })
