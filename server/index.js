const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session')
require('dotenv').config()

const photoController = require('./controllers/photoController')
const authController = require('./controllers/authController')

const app = express()
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));

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

// Login Endpoint
app.get('/auth/callback', authController.login)

app.get('/api/user-data', (req, res) => {
    res.send(req.session.user)
})

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send();
});

const PORT = 3006
app.listen(PORT, () => {
    console.log(`Ship docked at port ${PORT}`)
})
