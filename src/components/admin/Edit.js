import React, { Component } from 'react'
import axios from 'axios'

export default class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: this.props.description,
            img: this.props.img,
            id: this.props.id
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


    render() {

        return (
            <div>
                <img src={this.state.img} />
                <textarea value={this.state.description} onChange={this.handleDescription} />
                <button onClick={this.editPhotos}>Save</button>
            </div>
        )
    }
}