const router = require("express").Router()
const controller = require('../controllers/index.js')

router.post('/ciudad', controller.post)
router.get('/ciudad', controller.get)
router.get('/ciudades', controller.getAll)
router.delete('/ciudad', controller.del)
router.put('/ciudad', controller.put)


module.exports = router