var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

const port = 8000
const { authRouter } = require('./routers')
const { movRouter } = require('./routers')
const { usersRouter } = require('./routers')
const { adminRouter } = require('./routers')



app.use(bodyParser.json())
app.use(cors())
app.use('*/public/img', express.static(__dirname + '/public/img'));
app.use('*/public/vid', express.static(__dirname + '/public/vid'));

app.get('/', (req, res) => {
    res.send('<h1>Test...</h1>')
})

app.use('/auth', authRouter)
app.use('/mov', movRouter)
app.use('/users', usersRouter)
app.use('/admin', adminRouter)



app.get('/public/img', function (req, res) {
    res.sendFile(__dirname + '/public/img/');
});

app.get('/public/vid/', function (req, res) {
    res.sendFile(__dirname + '/public/vid/');
});

app.listen(port, () => console.log('on port.. ' + port))