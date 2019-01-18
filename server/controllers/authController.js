const axios = require('axios')

module.exports = {

    login: (req, res) => {

        let redirect_uri = process.env.HOST == "localhost" ?
            `http://${req.headers.host}/auth/callback` :
            `https://${req.headers.host}/auth/callback`

        const payload = {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri
        };

        function tradeCodeForAccessToken() {
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
        }

        function tradeAccessTokenForUserInfo(response) {
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${response.data.access_token}`)
        }

        function storeUserInfoInDataBase(response) {
            const user = response.data;
            return req.app.get('db').find_user([user.sub]).then(users => {
                // console.log(users)
                if (users.length) {
                    req.session.user = {
                        id: users[0].id,
                        auth0_id: users[0].auth0_id,
                        name: users[0].name,
                        picture: users[0].picture,
                        email: users[0].email
                    }
                    res.redirect('/')
                } else {
                    return req.app.get('db').create_user({
                        id: user.id,
                        auth0_id: user.sub,
                        email: user.email,
                        name: user.name,
                        picture: user.picture
                    }).then(newlyCreatedUsers => {
                        req.session.user = newlyCreatedUsers[0];
                        res.redirect('/')
                    })
                }
            })
        }

        tradeCodeForAccessToken()
            .then(tradeAccessTokenForUserInfo)
            .then(storeUserInfoInDataBase)
            .catch(err => {
                console.log('Error in tradeCodeForAccessToken', err);
                res.status(500).send('Something happened on the server.')
            })
    }
}