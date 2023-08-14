import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <>
      {/* <br/> <br/> 
      <br/> <br/>  */}
      <footer className=" text-center text-white" style={{backgroundColor:"#e6c48e"}}>
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
        </div>

      
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5' >
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Furry Family
              </h6>
              <p>
              Furry Family is a site that makes it easy for people to connect to send their pets or adopt a new pet friend.

              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Pets</h6>
              <p>
                <a href='/cats' className='text-reset'>
                  Cats
                </a>
              </p>
              <p>
                <a href='/dogs' className='text-reset'>
                  Dogs
                </a>
              </p>
           
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful pages</h6>
              <p>
                <a href='/process' className='text-reset'>
                  Adoption process
                </a>
              </p>
              <p>
                <a href='/careafteradoption' className='text-reset'>
                  Care after adoption
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Amman , Jordan
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                contactus@gmail.com
              </p>
      
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 {" "}
        <a className='text-reset fw-bold' href='/'>
          Furry Family
        </a>
      </div>
    </MDBFooter>
    </footer>
    </>
  );
}