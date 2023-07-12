const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const { slow } = require('./middlewares/slow')

let url = process.env.URL ? process.env.URL : 'http://localhost:3000'
app.use(cors({ origin: url }))
app.use(bodyParser.json());



require('./routers/product')(app)
require('./routers/promotion')(app)

app.get('/ping', slow, async (req, res, next) => {
    try {
        res.send('pong')
    } catch (error) {
        return res.send(error)
    }
})

app.get('/', (req, res, next) => {
    res.send('okay')
})



server.listen(process.env.PORT || 8080, console.log('server started'))