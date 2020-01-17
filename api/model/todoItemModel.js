const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoItemModel = function () {
  const todoItemSchema = new Schema({
    title: { type: String, required: true }
  })
  return mongoose.model('todo', todoItemSchema)
}

exports.TodoItemModel = TodoItemModel
