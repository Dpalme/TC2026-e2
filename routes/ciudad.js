const router = require("express").Router()
const controller = require('../controllers/index.js')

function bodyLog(req, res, next) {
    // console.log(req.body);
    return next()
}

router.post('/ciudad', bodyLog, controller.post)
router.get('/ciudad', bodyLog, controller.get)
router.get('/ciudades/:pais', bodyLog, controller.getAll)
router.delete('/ciudad', bodyLog, controller.del)
router.put('/ciudad', bodyLog, controller.put)
router.get('/reset', bodyLog, controller.reset)


module.exports = router