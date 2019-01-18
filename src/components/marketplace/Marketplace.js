import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Marketplace.css';
import Slider from 'react-slick';
import Slideshow from './Slideshow'

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
        const photoDash = photos.length ? photos.map(photo => {
            return (
                <div key={photo.id}>
                    <div className='photoContainer'>
                        <div className='marketImgCont'>
                            <div className='photo' alt='from database' style={{ backgroundImage: `url(${photo.img})`, backgroundSize: 'cover' }}>
                                <div className='overlay'>
                                    <div className='swipeContent'>
                                        <div className='photoDesc'>
                                            {photo.description}
                                            ${photo.price}
                                        </div>
                                        <button onClick={() => this.addToCart(photo.id)}>Add To Cart</button>
                                        <Link to={`/photo/${photo.id}`}>
                                            <button>View</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )
        }) :
            <div>Loading...</div>

        return (
            <div>
                <div>
                    <Slideshow photos={photos} />
                </div>
                <div className='marketBox'>
                    {photoDash}
                </div>
            </div>
        )
    }
}