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
            const findTotal = '$' + total.reduce((a, c) => {
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
        const cartDash = items.length ? items.map(item => {
            return (
                <div key={item.id}>
                    <div className='itemContainer'>
                        <img className='cartImg' src={item.img} />
                        <div>
                            <button className='cartDelete' onClick={() => this.deleteCart(item.id)}>Remove</button>
                            <h2>${item.price}</h2>
                        </div>
                    </div>
                </div>
            )
        }) : <h2>Loading...</h2>
        return (
            <div>
                <br />
                <div className='cartContainer'>
                    {cartDash}
                </div>
                <div className='line'></div>
                <div className='bottomCart'>
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
                    <h2>Total: {orderTotal}</h2>
                </div>
            </div>
        )
    }
}