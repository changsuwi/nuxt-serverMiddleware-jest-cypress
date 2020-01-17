const TodoItemRepo = require('../repo/todoItemRepo').TodoItemRepo

const todoItemRepo = new TodoItemRepo()

const TodoSvc = function () {
  return {
    async findAll () {
      const result = await todoItemRepo.findAll()
      return result
    },
    async create (title) {
      if (title === '') {
        return 400
      } else {
        const result = await todoItemRepo.insert(title)
        return result
      }
    }
  }
}

exports.TodoSvc = TodoSvc
