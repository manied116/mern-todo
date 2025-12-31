const Router = require('express')
const ProudctRouter = require('./product')
const UserRouter = require('./users')

const router = Router()

router.use(ProudctRouter)
router.use(UserRouter)

module.exports = router