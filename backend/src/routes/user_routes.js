const express = require('express')
const user_controller = require('../controllers/user_controller')
const { require_auth } = require('../middlewares/auth_middleware')
const router = express.Router()

router.post('/follow', require_auth, user_controller.follow)
router.post('/unfollow', require_auth, user_controller.unfollow)
router.get('/followees', require_auth, user_controller.followees)
router.get('/timeline', require_auth, user_controller.timeline)

module.exports = router
