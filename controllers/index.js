// Express imports
const express = require('express')
const router = express.Router()

//Handlers
const accountHandler = require('./account/accountHandler')
const authHandler = require('./auth/authHandler')

// Routes in use
router.use('/bank', accountHandler)
router.use('/auth', authHandler)
router.use('/', (_, res) => res.sendFile(__dirname + "/index.html"))
router.use('/', (_, res) => res.sendFile(__dirname + "/logo.png"))
router.use('/', (_, res) => res.sendFile(__dirname + "/banking.jpg"))
router.use('/', (_, res) => res.sendFile(__dirname + "/about.html"))
router.use('*', (_, res) => res.status(404).json({msg: 'Não tem nada para você por aqui 👀'}))

module.exports = router
