import React, { Component } from 'react';
import axios from 'axios'

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
        const singlePhoto = photo.map(photo => {
            return (
                <div key={photo.id}>
                    <img src={photo.img} />
                    {photo.description}
                </div>
            )
        })
        return (
            <div>
                {singlePhoto}
            </div>
        )
    }
}