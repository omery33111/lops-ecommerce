import React from 'react'
import { Carousel } from 'react-bootstrap'



const Carrousel = () => {
  return (
    <div><br/>
    <Carousel variant="white">
      <Carousel.Item>
        <img style={{width: "100%"}}
          className="d-block w-10"
          src={require('../../images/fashion1.png')}
          alt="First slide"
          height="400"
        />
        <Carousel.Caption>
          <h4>FREE SHIPPING!</h4>
          <h6>YOU CAN ENJOY AND RECIEVE FAST EXPRESS DELIVERY BY PURCHASES OVER $50!</h6>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img style={{width: "100%"}}
          className="d-block w-10"
          src={require('../../images/fashion2.png')}
          alt="Second slide"
          height="400"
        />
        <Carousel.Caption>
          <h4>OUR PRODUCTS</h4>
          <h6>WE ENSURE THE QUALITY OF OUR PRODUCTS BEFORE WE PASS THE PRODUCT TO THE CUSTOMER</h6>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img style={{width: "100%"}}
          className="d-block w-10"
          src={require('../../images/fashion3.png')}
          alt="Third slide"
          height="400"
        />
        <Carousel.Caption>
          <h4>CONTACT US</h4>
          <h6>
            FOR ANY ISSUE, YOU ARE WELCOME TO CONTACT US. CONTACT DETAILS IN THE BOTTOM OF THE PAGE
          </h6>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Carrousel