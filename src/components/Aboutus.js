import React, { Component } from 'react'
import './css/aboutus.css'
import img1 from './images/myphoto.jpeg'
import Accordion from 'react-bootstrap/Accordion';
import './css/Adoppro.css'
import Footer from './Footer';
import Header from './Header';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

export class Aboutus extends Component {
  render() {
    return (
      <>
      <Header/>
      <div>
                <div className='allConta'>

        {/* <!-- For demo purpose --> */}
<div class="container py-5">
    <div class="row text-center text-white">
        <div class="col-lg-8 mx-auto">
            <br/>
            <h1 class="display-4" style={{color:'black'}}>Members</h1>
        </div>
    </div>
</div>
{/* <!-- End --> */}


<div class="container">
    <div class="row text-center">

        {/* <!-- Team item --> */}
        <div class="col-xl-3 col-sm-6 mb-5" style={{marginLeft:'400px' , border:'500px black'}}>
            <div class="bg-white rounded shadow-sm py-5 px-4">
                <img src={img1} alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                <h5 class="mb-0">Mayadah Shehadeh</h5><span class="small text-uppercase text-muted">Software Developer</span>
                <ul class="social mb-0 list-inline mt-3">
                  
                    <li class="list-inline-item"><a href="https://www.linkedin.com/in/mayyadah-shehadeh-3014b0121/" class="social-link">
                    <MDBIcon fab icon='linkedin-in' />
   </a></li>
                </ul>
            </div>
        </div>
        {/* <!-- End --> */}
    </div>
</div>

<br/>

<Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>OUR MISSION</Accordion.Header>
        <Accordion.Body>
        <b>
           Protect the welfare of animals, preserve the human-animal bond, and prevent the overpopulation of companion animals. </b>
        </Accordion.Body>
      </Accordion.Item>
      <br/>
      <Accordion.Item eventKey="0">
        <Accordion.Header>OUR PURPOSE</Accordion.Header>
        <Accordion.Body><b> 
        Furry Family is a site that makes it easy for people to connect to send their pets or adopt a new pet friend.</b>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
      </div>
      <Footer/>
      </>
    )
  }
}

export default Aboutus