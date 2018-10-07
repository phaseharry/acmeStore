const express = require('express')
const path = require('path')
const routes = require('./server/routes')
const {syncAndSeed} = require('./server/db')

const app = express()

app.use(express.static(path.join(__dirname, '/public')))
app.use('/api', routes)

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname,'/public/index.html'))
})

const init = () => syncAndSeed()

init()

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))