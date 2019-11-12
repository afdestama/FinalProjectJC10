var express = require('express')
var router = express.Router()
const { movController } = require('../controllers')
var multer = require('multer')
var path = require('path');

//untuk poster
let PostermulterStorageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img')
    },
    filename: (req, file, cb) => {
        // cb(null, 'fotoku.jpg')

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let PosterfilterConfig = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === "png" || file.mimetype.split('/')[1] === "jpeg") {
        cb(null, true)
    } else {
        req.validation = { error: true, msg: 'File must be an image' }
    }
}





let uploadPoster = multer({
    storage: PostermulterStorageConfig,
    fileFilter: PosterfilterConfig
})



router.post('/upload', uploadPoster.single('poster'), movController.upload)
router.get('/movies', movController.allmovies)
router.get('/mostviewed', movController.MostViewed)
router.get('/randommoviespreview', movController.randomMoviesPreview)
router.post('/recomendation', movController.recomendation)
router.get('/movies/:id', movController.getMoviesByID)
router.get('/moviesbygenre', movController.getMoviesByGenre)
router.get('/moviesbydirector', movController.getMoviesByDirector)
router.get('/moviesbyactor', movController.getMoviesByActor)
router.get('/cast/:id', movController.getCastbyID)
router.get('/cast/', movController.getAllCast)
router.get('/director/:id', movController.getDirectorbyID)
router.get('/director/', movController.getAllDirector)
router.get('/genre', movController.getAllGenre)
router.get('/genre/:id', movController.getGenreByID)
router.delete('/delete/:id', movController.deleteMovie)
router.get('/search', movController.search)
router.post('/views/add', movController.addViews)
router.get('/views/:id', movController.getViews)
// router.post('/rating/:id', movController.getRatingByID)

module.exports = router