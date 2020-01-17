const TodoItemModel = require('../model/todoItemModel').TodoItemModel

const TodoItemRepo = function () {
  const TIModel = new TodoItemModel()
  return {
    async findAll () {
      const docs = await TIModel.find({})
      return docs
    },
    async insert (title) {
      const todoItem = new TIModel({
        title
      })
      const result = await todoItem.save()
      return result
    }
  }
}

exports.TodoItemRepo = TodoItemRepo
