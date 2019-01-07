import React, { Component } from 'react';
import axios from 'axios'

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
                <div>
                    <img src={photo.img} />
                    {photo.description}
                </div>
            )
        }) :
            <div>Loading...</div>
        return (
            <div>
                {photoDash}
            </div>
        )
    }
}