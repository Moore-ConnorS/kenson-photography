import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'

import './Cart.css'
import { timingSafeEqual } from 'crypto';

export default class Cart extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
            orderTotal: 0
        }
    }

    componentDidMount() {
        this.getCart()
    }

    getCart = () => {
        axios.get(`/api/cart/${this.props.match.params.id}`).then(res => {
            const total = res.data.map(item => {
                return +item.price
            })
            const findTotal = total.reduce((a, c) => {
                return a + c
            }, 0)
            console.log('findTotal', findTotal)
            this.setState({
                items: res.data,
                orderTotal: findTotal
            })
        })
    }

    deleteCart = (id) => {
        axios.delete(`/api/cart/${id}`).then(() => {
            this.getCart()
        })
    }

    deleteAllCart = () => {
        axios.delete(`/api/order/${this.state.items[0].user_id}`).then(() => {
            this.getCart()
        })
    }

    // axios posting total to orders table 

    addOrder = () => {
        axios.post(`/api/order`, this.state)

    }

    onToken = (token) => {
        const { orderTotal } = this.state
        axios.post('/stripe', { token, orderTotal })
            .then(() => alert('payment successful')
            )
        this.addOrder()
        this.deleteAllCart()
    }



    render() {
        const { items, orderTotal } = this.state
        const cartDash = items.map(item => {
            return (
                <div key={item.id}>
                    <div className='itemContainer'>
                        <img src={item.img} />
                        <button onClick={() => this.deleteCart(item.id)}>Delete</button>
                        <p>{item.price}</p>
                    </div>
                </div>
            )
        })
        return (
            <div>
                {/* <button onClick={this.addOrder}>Purchase</button> */}
                {/* <button onClick={this.addOrder}> */}
                <StripeCheckout
                    ComponentClass="stripe"
                    email='email@email.com'
                    amount={this.state.orderTotal * 100}
                    description=""
                    token={this.onToken}
                    allowRememberMe={false}
                    //Publishable key
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                />
                {/* </button> */}
                <br />
                Total: {orderTotal}
                <div className='cartContainer'>
                    {cartDash}
                </div>
            </div>
        )
    }
}