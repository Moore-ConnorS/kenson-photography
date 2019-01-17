import React, { Component } from 'react';
import axios from 'axios';
import './SinglePhoto.css'

export default class SinglePhoto extends Component {
    constructor() {
        super()
        this.state = {
            photo: []
        }
    }

    componentDidMount() {
        this.getOnePhoto()
    }

    getOnePhoto = () => {
        axios.get(`/api/photos/${this.props.match.params.id}`).then(res => {
            this.setState({
                photo: res.data
            })
        })
    }

    render() {
        const { photo } = this.state
        const singlePhoto = photo.length ? photo.map(photo => {
            return (
                <div key={photo.id}>
                    <img className='singlePhoto' src={photo.img} />
                    <br />
                    {photo.description}
                </div>
            )
        }) : <div>Loading...</div>
        return (
            <div>
                {singlePhoto}
            </div>
        )
    }
}