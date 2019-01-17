const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session')
require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET)

const photoController = require('./controllers/photoController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const orderController = require('./controllers/orderController')

const app = express()
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/../build`));
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

// Cheeky Middleware

function checkForLog(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.status(403).send(console.log('Must log in to purchase'))
    }
}

// Cart Endpoints

app.get('/api/cart/:id', checkForLog, cartController.getCart)
app.post('/api/cart/:id', checkForLog, cartController.addCart)
app.delete('/api/cart/:id', checkForLog, cartController.deleteCart)

//  Order Endpoints

app.post('/api/order', orderController.addOrder)
app.delete('/api/order/:id', orderController.deleteAllCart)

// Stripe Endpoint

app.post('/stripe', (req, res) => {
    // console.log('--------------req.body', req.body)
    const { orderTotal } = req.body
    stripe.charges.create({
        source: req.body.token.id,
        amount: orderTotal * 100,
        currency: 'usd',
        description: 'Buying rights to selected photos'
    }).catch(err => {
        res.status(500).send(console.log('Error in stripe endpoint', err))
    })
})

const PORT = 3006
app.listen(PORT, () => {
    console.log(`Ship docked at port ${PORT}`)
})

const path = require('path')
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})
