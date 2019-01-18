module.exports = {
    allPhotos: (req, res) => {
        const db = req.app.get('db')
        db.get_photos().then(photo => {
            res.send(photo)
        }).catch(err => {
            res.status(500).send(console.log('Error in getting allPhotos', err))
        })
    },

    onePhoto: (req, res) => {
        const db = req.app.get('db')
        db.get_one_photo(req.params.id).then(photo => {
            res.send(photo)
        }).catch(err => {
            res.status(500).send(console.log('Error in onePhoto endpoint', err))
        })
    },

    addPhoto: (req, res) => {
        const db = req.app.get('db')
        db.add_photo([
            req.body.img,
            req.body.description
        ]).then(() => {
            res.send()
        }).catch(err => {
            res.status(500).send(console.log('Error in addPhoto', err))
        })
    },

    editPhoto: (req, res) => {
        const db = req.app.get('db')
        db.edit_photo([
            req.params.id,
            req.body.description,
            req.body.price
        ]).then(() => {
            res.send()
        }).catch(err => {
            res.status(500).send(console.log('Error in editPhoto', err))
        })
    },

    deletePhoto: (req, res) => {
        const db = req.app.get('db')
        db.delete_photo(req.params.id).then(() => {
            res.send()
        }).catch(err => {
            res.status(500).send(console.log('Error in deletePhoto endpoint', err))
        })
    }
}