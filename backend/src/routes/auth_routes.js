const express = require('express')
const auth_controller = require('../controllers/auth_controller')
const router = express.Router()

router.post('/signup', auth_controller.signup)
router.post('/login', auth_controller.login)
router.get('/logout', auth_controller.logout)

module.exports = router
