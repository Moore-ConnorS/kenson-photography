module.exports = {

    getOrder: (req, res) => {
        const db = req.app.get('db')
    },


    addOrder: (req, res) => {
        const db = req.app.get('db')
        console.log(req.body)
        let newOrderId = null
        // db.get_orders().then(orders => {
        // This call should give back all orders ordered by order_id, incrementing
        // Pop the last element off and use the order_id to make new variable
        // increment variable ---> newOrderId = order.pop().order_id++
        db.get_order().then(orders => {
            if (orders.length) {
                newOrderId = orders.pop().order_id
                newOrderId++
            } else (newOrderId = 1)
            db.add_order([req.body.orderTotal, req.session.user.id, newOrderId])
        }).catch(err => {
            res.status(500).send(console.log('Error in addOrder method', err))
        })
    },

    deleteAllCart: (req, res) => {
        const db = req.app.get('db');
        db.delete_all_cart(req.params.id).then(() => {
            res.send()
        }).catch(err => {
            res.status(500).send(console.log('Error in deleteAllCart method', err))
        })
    }
}