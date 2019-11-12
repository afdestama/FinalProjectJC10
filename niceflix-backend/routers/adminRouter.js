var express = require('express')
var router = express.Router()
const { adminController } = require('../controllers')
var multer = require('multer')
var path = require('path');

//untuk bukti pembayaran
let multerStorageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img')
    },
    filename: (req, file, cb) => {
        // cb(null, 'fotoku.jpg')

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let filterConfig = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === "png" || file.mimetype.split('/')[1] === "jpeg") {
        cb(null, true)
    } else {
        req.validation = { error: true, msg: 'File must be an image' }
    }
}

let upload = multer({
    storage: multerStorageConfig,
    fileFilter: filterConfig
})

router.post('/subscribe', upload.single('bukti'), adminController.uploadTransaksi)
router.get('/request', adminController.getRequest)
router.post('/approve', adminController.setApprove)
router.get('/history', adminController.subsHistory)

module.exports = router