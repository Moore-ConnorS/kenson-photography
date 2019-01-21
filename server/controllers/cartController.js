module.exports = {

    getCart: (req, res) => {
        const db = req.app.get('db')
        db.get_cart(req.params.id).then(cart => {
            res.send(cart)
        }).catch(err => {
            res.status(500).send(console.log('Error in getCart method', err))
        })
    },

    addCart: (req, res) => {
        const db = req.app.get('db')
        db.add_cart([
            req.session.user.id,
            req.params.id
        ]).then(() => {
            res.send()
        }).catch(err => {
            res.status(500).send(console.log('Error in addCart method', err))
        })
    },

    deleteCart: (req, res) => {
        const db = req.app.get('db')
        db.delete_cart(req.params.id).then(() => {
            res.send()
        }).catch(err => {
            res.status(500).send(console.log('Error in deleteCart method', err))
        })
    }
}