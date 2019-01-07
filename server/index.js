const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config()

const photoController = require('./controllers/photoController')

const app = express()
app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
}).catch(err => {
    console.log('Something bad happened in db setup', err)
})

// Photo DB Endpoints
app.get('/api/photos', photoController.allPhotos)
app.get('/api/photos/:id', photoController.onePhoto)
app.post('/api/photos', photoController.addPhoto)
app.put('/api/photos/:id', photoController.editPhoto)
app.delete('/api/photos/:id', photoController.deletePhoto)

const PORT = 3006
app.listen(PORT, () => {
    console.log(`Ship docked at port ${PORT}`)
})
