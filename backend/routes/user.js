const express = require('express')
const controller = require('../controllers/user')
const passport = require("passport");
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getByID)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)

module.exports = router