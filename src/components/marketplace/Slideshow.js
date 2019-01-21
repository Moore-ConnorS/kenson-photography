import React, { Component } from 'react'
import Slider from 'react-slick'
import './Marketplace.css'

export default class Slideshow extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 4000,
            cssEase: "linear"
        };
        const photoSlick = this.props.photos.map((photo, i) => {
            return (
                <div key={i}>
                    <img className='slickImg' src={photo.img} />
                </div>
            )
        })
        return (
            <div className='slickCont'>
                <Slider {...settings}>
                    {photoSlick}
                </Slider>
            </div>
        )
    }
}