import React from 'react'
// import {
//   MDBCarousel,
//   MDBCarouselItem,
// } from 'mdb-react-ui-kit';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

import img from './images/222.jpg'

import img2 from './images/11111.jpg'
import img3 from './images/333333.jpg'
import img4 from './images/11.jpg'

import CardSlider from './CardSlider';
import Header from './Header';
import Footer from './Footer';
import HomeCards from './HomeCards';
import Stat from './stat/stat';



export default function Home() {
  return (
    <>
    <Header/>
    <Carousel fade>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src={img4}
          alt="First slide"
        />        
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item>
      <img
          className="d-block w-100"
          src={img3}
          alt="First slide"
        />     
           {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"y
          src={img2}
          alt="First slide"
        />   
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src={img}
          alt="First slide"
        />   
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>

    <CardSlider/>
    <HomeCards/>
    <Stat/>
    <Footer/>
    </>
  //   <div>
   
  //  <MDBCarousel showControls showIndicators dark fade>
  //     <MDBCarouselItem
  //       className='w-100 d-block'
  //       itemId={1}
  //       src='https://mdbootstrap.com/img/Photos/Slides/img%20(19).jpg'
  //       alt='...'
  //     >
  //       <h5>First slide label</h5>
  //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  //     </MDBCarouselItem>
  //     <MDBCarouselItem
  //       className='w-100 d-block'
  //       itemId={2}
  //       src='https://mdbootstrap.com/img/Photos/Slides/img%20(35).jpg'
  //       alt='...'
  //     >
  //       <h5>Second slide label</h5>
  //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  //     </MDBCarouselItem>

  //     <MDBCarouselItem
  //       className='w-100 d-block'
  //       itemId={3}
  //       src='https://mdbootstrap.com/img/Photos/Slides/img%20(40).jpg'
  //       alt='...'
  //     >
  //       <h5>Third slide label</h5>
  //       <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
  //     </MDBCarouselItem>
  //   </MDBCarousel>
  //   </div>
  
  )
}
