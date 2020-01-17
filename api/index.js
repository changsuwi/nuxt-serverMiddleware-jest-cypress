const express = require('express')
const MongoHelper = require('./helper/mongoHelper').MongoHelper
const mongoHelper = new MongoHelper()
const router = require('./router')
// Create express instnace
const app = express()

// for parsing application/json
app.use(express.json())

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// Require API routes
app.use('/', router)

mongoHelper.connect('mongodb://vic010744:vic32823@ds135750.mlab.com:35750/heroku_qv3hd41s')

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
