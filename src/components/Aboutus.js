import React, { Component } from 'react'
import './css/aboutus.css'
import img1 from './images/unnamed.jpg'
import Accordion from 'react-bootstrap/Accordion';
import './css/Adoppro.css'
import Footer from './Footer';
import Header from './Header';
import { MDBIcon } from 'mdb-react-ui-kit';

export class Aboutus extends Component {
  render() {
    return (
      <>
        <div style={{ backgroundColor: "white" }}>
          <Header />
          <div>
            <div className='allConta'>

              {/* <!-- For demo purpose --> */}
              <div className="container py-5">
                <div className="row text-center text-white">
                  <div className="col-lg-8 mx-auto">
                    <br />
                    <h1 className="display-4" style={{ color: 'black' }}>Members</h1>
                  </div>
                </div>
              </div>
              {/* <!-- End --> */}


              <div className="container">
                <div className="row text-center">

                  {/* <!-- Team item --> */}
                  <div className="col-xl-3 col-sm-6 mb-5" style={{ marginLeft: '400px', border: '500px black' }}>
                    <div className="bg-white rounded shadow-sm py-5 px-4">
                      <img src={img1} alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                      <h5 className="mb-0">Mayadah Shehadeh</h5><span className="small text-uppercase text-muted">Software Developer</span>
                      <ul className="social mb-0 list-inline mt-3">

                        <li className="list-inline-item"><a 
                        href="https://github.com/MayyadahShehadeh" 
                        className="social-link">
                          <MDBIcon fab icon='github' />
                        </a></li>
                      </ul>
                    </div>
                  </div>
                  {/* <!-- End --> */}
                </div>
              </div>

              <br />

              <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>OUR MISSION</Accordion.Header>
                  <Accordion.Body>
                    <b>
                      Protect the welfare of animals, preserve the human-animal bond, and prevent the overpopulation of companion animals. </b>
                  </Accordion.Body>
                </Accordion.Item>
                <br />
                <Accordion.Item eventKey="0">
                  <Accordion.Header>OUR PURPOSE</Accordion.Header>
                  <Accordion.Body><b>
                    Furry Family is a site that makes it easy for people to connect to send their pets or adopt a new pet friend.</b>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Aboutus