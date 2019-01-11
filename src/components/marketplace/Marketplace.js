import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Marketplace.css'

export default class Marketplace extends Component {
    constructor() {
        super()
        this.state = {
            photos: []
        }
    }

    componentDidMount() {
        this.getPhotos()
    }

    getPhotos = () => {
        axios.get('/api/photos').then(res => {
            this.setState({
                photos: res.data
            })
        })
    }

    addToCart = (id) => {
        axios.post(`/api/cart/${id}`)
    }



    render() {
        const { photos } = this.state
        console.log(this.state.photos)
        const photoDash = photos.length ? photos.map(photo => {
            return (
                <div key={photo.id}>
                    <div className='photoContainer'>
                        <Link to={`/photo/${photo.id}`}>
                            <img className='photo' alt='from database' src={photo.img} />
                        </Link>
                        {photo.description}
                        <br />
                        ${photo.price}
                        <button onClick={() => this.addToCart(photo.id)}>Add To Cart</button>
                    </div>
                </div>
            )
        }) :
            <div>Loading...</div>
        return (
            <div className='marketBox'>
                {photoDash}
            </div>
        )
    }
}