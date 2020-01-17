const { Router } = require('express')
const router = new Router()
const TodoSvc = require('./svc/todoSvc').TodoSvc
const todoSvc = new TodoSvc()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  // console.log('Time: ', Date.now())
  next()
})

router.get('/', async function (req, res) {
  const result = await todoSvc.findAll()
  console.log(result)
  res.send(result)
})

router.post('/', async function (req, res) {
  // console.log(req)
  const result = await todoSvc.create(req.body.title)
  res.send(result)
})

module.exports = router
