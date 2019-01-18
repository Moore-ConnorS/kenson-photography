import React, { Component } from 'react'
import axios from 'axios'

export default class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: this.props.description,
            img: this.props.img,
            id: this.props.id,
            price: this.props.price
        }
    }

    editPhotos = () => {
        axios.put(`/api/photos/${this.props.id}`, this.state)
    }

    handleDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    handlePrice = (e) => {
        this.setState({
            price: e.target.value
        })
    }


    render() {

        return (
            <div className='editContainer'>
                <img src={this.state.img} />
                <textarea value={this.state.description} onChange={this.handleDescription} />
                <input value={this.state.price} onChange={this.handlePrice} />
                <button onClick={this.editPhotos}>Save</button>
            </div>
        )
    }
}