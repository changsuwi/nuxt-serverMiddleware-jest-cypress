const mongoose = require('mongoose')

const MongoHelper = function () {
  return {
    async connect (url) {
      await mongoose.connect(url)
      // Get Mongoose to use the global promise library
      mongoose.Promise = global.Promise
      // Get the default connection
      const db = mongoose.connection

      // Bind connection to error event
      // db.on('error', console.error.bind(console, 'MongoDB connection error:'))
      return db
    }
  }
}
exports.MongoHelper = MongoHelper
