import React, { Component } from 'react';
import axios from 'axios';

import './Cart.css'

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
                <button>Purchase</button>
                <br />
                Total: {orderTotal}
                <div className='cartContainer'>
                    {cartDash}
                </div>
            </div>
        )
    }
}