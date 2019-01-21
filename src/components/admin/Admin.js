import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import './Admin.css'

import Edit from './Edit'

export default class Admin extends Component {
    constructor() {
        super()
        this.state = {
            photos: [],
            photo: [],
            modalUno: false,
            modalTwo: false,
            img: '',
            description: '',
            price: 0
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

    deletePhotos = (id) => {
        axios.delete(`/api/photos/${id}`).then(() => {
            this.getPhotos()
        })
    }

    addPhoto = () => {
        axios.post('/api/photos', this.state).then(() => {
            this.getPhotos()
            this.closeModalTwo()
        })
    }

    // editPhotos = (id) => {
    //     axios.put(`/api/photos/${id}`, this.state.description)
    // }

    // handleChange = (e) => {
    //     this.setState({
    //         description: e.target.value
    //     })
    // }

    handleImg = (e) => {
        this.setState({
            img: e.target.value
        })
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

    openModalUno = (id) => {
        axios.get(`/api/photos/${id}`).then((res) => {
            this.setState({
                photo: res.data[0],
                modalUno: true
            })
        })
    }

    closeModalUno = () => {
        this.setState({
            modalUno: false
        })
        this.getPhotos()
    }

    openModalTwo = () => {
        this.setState({
            modalTwo: true
        })
    }

    closeModalTwo = () => {
        this.setState({
            modalTwo: false
        })
    }

    render() {
        const { photos } = this.state
        // console.log(photos)
        console.log(this.state.img)
        const photoDisplay = photos.map(photo => {
            return (
                <div className='adminItems' key={photo.id}>
                    <img className='photo' alt='from database' src={photo.img} />
                    <br />
                    {photo.description}
                    <br />
                    ${photo.price}
                    <button onClick={() => { this.deletePhotos(photo.id) }}>Delete</button>
                    <button onClick={() => this.openModalUno(photo.id)}>Edit</button>
                </div >
            )
        })
        return (
            <div className='admin'>
                {photoDisplay}
                <Modal isOpen={this.state.modalUno} onRequestClose={this.closeModalUno}>
                    <button onClick={this.closeModalUno}>Close</button>
                    <Edit description={this.state.photo.description}
                        img={this.state.photo.img}
                        id={this.state.photo.id}
                        price={this.state.photo.price}
                    />
                </Modal>
                <button onClick={this.openModalTwo}>Add Photo</button>
                <Modal className='add' isOpen={this.state.modalTwo} onRequestClose={this.closeModalTwo}>
                    <button onClick={this.closeModalTwo}>Close</button>
                    Image Url:<textarea className='addInput' value={this.state.img} onChange={(e) => this.handleImg(e)} />
                    Image Description:<textarea className='addInput' value={this.state.description} onChange={(e) => this.handleDescription(e)} />
                    Image Price:<input className='addPrice' value={this.state.price} onChange={(e) => this.handlePrice(e)} />
                    <button onClick={this.addPhoto}>Add</button>
                </Modal>
            </div >
        )
    }
}