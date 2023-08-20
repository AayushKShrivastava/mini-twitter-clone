const express = require('express')
const { require_auth } = require('../middlewares/auth_middleware')
const post_controller = require('../controllers/post_controller')
const { route } = require('./auth_routes')
const router = express.Router()

router.post('/', require_auth, post_controller.create_post)
router.put('/:post_id', require_auth, post_controller.update_post)
router.delete('/:post_id', require_auth, post_controller.delete_post)
router.get('/', require_auth, post_controller.user_posts)

module.exports = router
