const proxy = require('http-proxy-middleware')

module.exports = app => {
    app.use('/auth/callback', proxy({ target: 'http://localhost:3006' }));
    app.use('/api', proxy({ target: 'http://localhost:3006' }));
    app.use('/stripe', proxy({ target: 'http://localhost:3006' }));
}