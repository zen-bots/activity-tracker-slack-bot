const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./router'))
app.use(require('./helpers/activeKeeper'))

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
    console.log('Press Ctrl+C to quit.')
});