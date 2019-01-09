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



    render() {
        const { photos } = this.state
        const photoDash = photos.length ? photos.map(photo => {
            return (
                <div key={photo.id}>
                    <div className='photoContainer'>
                        <Link to={`/photo/${photo.id}`}>
                            <img className='photo' alt='from database' src={photo.img} />
                        </Link>
                        {photo.description}
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