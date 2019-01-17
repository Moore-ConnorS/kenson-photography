import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-modal'

import Edit from './Edit'

export default class Admin extends Component {
    constructor() {
        super()
        this.state = {
            photos: [],
            photo: [],
            modalUno: false,
            modalTwo: false,
            imgUrl: '',
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
            imgUrl: e.target.value
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
            console.log(res.data[0].id)
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
        const photoDisplay = photos.map(photo => {
            return (
                <div key={photo.id}>
                    <img className='photo' alt='from database' src={photo.img} />
                    <br />
                    {photo.description}
                    <br />
                    ${photo.price}
                    <button onClick={() => { this.deletePhotos(photo.id) }}>Delete</button>
                    <button onClick={() => this.openModalUno(photo.id)}>Edit Description</button>
                    {/* <Modal isOpen={this.state.modalUno} onRequestClose={this.closeModalUno}>
                        <button onClick={this.closeModalUno}>Close</button>
                        <Edit description={photo.description}
                            img={photo.img}
                            id={photo.id} />
                    </Modal> */}
                </div >
            )
        })
        return (
            <div>
                {photoDisplay}
                <Modal isOpen={this.state.modalUno} onRequestClose={this.closeModalUno}>
                    <button onClick={this.closeModalUno}>Close</button>
                    <Edit description={this.state.photo.description}
                        img={this.state.photo.img}
                        id={this.state.photo.id} />
                </Modal>
                <button onClick={this.openModalTwo}>Add Photo</button>
                <Modal isOpen={this.state.modalTwo} onRequestClose={this.closeModalTwo}>
                    <button onClick={this.closeModalTwo}>Close</button>
                    Image Url:<input value={this.state.imgUrl} onChange={(e) => this.handleImg(e)} />
                    Image Description:<input value={this.state.description} onChange={(e) => this.handleDescription(e)} />
                    Image Price:<input value={this.state.price} onChange={(e) => this.handlePrice(e)} />
                    <button onClick={this.addPhoto}>Add</button>
                </Modal>
            </div >
        )
    }
}