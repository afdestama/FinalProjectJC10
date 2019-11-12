var express = require('express')
var router = express.Router()
const { usersController } = require('../controllers')

router.get('/watchlist/:id', usersController.watchlist)
router.get('/history/:id', usersController.history)
router.delete('/watchlist/remove/:id', usersController.watchremove)
router.post('/watchlist/add', usersController.watchlistAdd)
router.get('/checkwatchlist/', usersController.checkWatchlistButton)
module.exports = router