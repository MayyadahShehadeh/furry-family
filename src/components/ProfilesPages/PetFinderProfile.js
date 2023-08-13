import React, { useContext, useEffect, useState } from 'react'
// import { PetsDataContext } from '../context/datacontext';
import { Modal, Form } from 'react-bootstrap'
import {
  MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBIcon, MDBRow,
  MDBCol, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane,
} from 'mdb-react-ui-kit';

import { Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from "react-cookies";
import { useSelector } from 'react-redux';
import Chat from '../Chat';
import Header from '../Header';
import Footer from '../Footer';
import InformationProfilePages from '../InformationProfilePages';
import { Alert } from 'react-bootstrap'


export default function PetFinderProfile() {
  const token = cookie.load("token");
  // const petsContext = useContext(PetsDataContext);
  const user = useSelector((state) => state.user);
  const [allFavPetss, setallFavPetss] = useState([]);
  let [show, setShow] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

  const getAllFavPets = async () => {
    const getFavPet = await axios.get(`https://furry-family-backend-production.up.railway.app/api/v2/favpets`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    console.log('getFavPet', getFavPet);
    setallFavPetss(getFavPet.data)
  }

  useEffect(() => {
    getAllFavPets();
  }, []);
  
  const deleteFavoritePet = async (petID) => {
    let deletPet = await axios.delete(`https://furry-family-backend-production.up.railway.app/api/v2/favpets/${petID}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    console.log('deletPet', deletPet);
    getAllFavPets();
  }

  const updateUserInfo = async (e) => {
    e.preventDefault();
    let userInputs = {
      // username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      photoUrl: e.target.photoUrl.value,
      address: e.target.address.value,
      phone: e.target.phone.value,

      
    }
    let userID = user.id;
    let userData = await axios.put(`https://furry-family-backend-production.up.railway.app/auth/users/${userID}`, userInputs,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('userData', userData.data);
    refreshPage();
    setshowAlert(true)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setshowAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showAlert]);
  function refreshPage() {
    window.location.reload(false);
  }

  const [verticalActive, setVerticalActive] = useState('tab1');

  const handleVerticalClick = (value) => {
    if (String(value) === verticalActive) {
      return;
    }

    setVerticalActive(value);
  }

  const handleClose = () => setShow(false);

  return (
    <>
    <div className='background-white'>

      <Header />
      <InformationProfilePages/>
      <div style={{ backgroundColor: 'white' }}>
         {/* ----------------- alert ----------------------- */}
         <div style={{ position: "absolute", top: 50, left: 800, right: 50, zIndex: 999 }}>

<Alert show={showAlert} variant="success" >
  Added To Favorite!

  <Button onClick={() => setshowAlert(false)} variant="outline-success">
    X
  </Button>

</Alert>
</div>
        <div style={{ marginLeft: '10px', marginRight: '50px', marginTop: '80px' }}>

          <MDBRow>
            <MDBCol size='3'>
              <MDBTabs className='flex-column '>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleVerticalClick('tab1')}
                    active={verticalActive === 'tab1'}>
                    <MDBIcon fas icon="user-edit" />{" "}
                    YOUR INFORMATIONS
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleVerticalClick('tab2')}
                    active={verticalActive === 'tab2'}>
                    <MDBIcon fas icon="cat" />{" "}
                    YOUR FAVORITE PETS
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>

                  <MDBTabsLink onClick={() => handleVerticalClick('tab3')}
                    active={verticalActive === 'tab3'}>
                    <MDBIcon fas icon="comment" />{" "}
                    CHAT
                  </MDBTabsLink>

                </MDBTabsItem>

              </MDBTabs>
            </MDBCol>
            <MDBCol size='9'>
              <MDBTabsContent>
                <MDBTabsPane show={verticalActive === 'tab1'}>  ACCOUNT INFORMATIONS

                  <br />

                  <form
                onSubmit={updateUserInfo}
              >
               <Form.Group controlId="formBasicEmail">
                      <Form.Label>email :</Form.Label>
                      <Form.Control type="text" placeholder={user.email} defaultValue={user.email} name="email" />
                    </Form.Group>

                    <br />
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>phone :</Form.Label>
                      <Form.Control type="text" placeholder={user.phone} defaultValue={user.phone} name="phone" />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>photo:</Form.Label>
                      <Form.Control type="text" placeholder={user.photoUrl} defaultValue={user.photoUrl} name="photoUrl" />
                    </Form.Group>

                    <br />

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>address :</Form.Label>
                      <Form.Control type="text" placeholder={user.address} defaultValue={user.address} name="address" />
                    </Form.Group>
                <br />
                <Form.Group controlId="formBasicPassword">
                      <Form.Label>Change Your Password?</Form.Label>
                      <Form.Control type="password" placeholder="Password" defaultValue={user.password} name="password" />
                    </Form.Group>
                <br />
                <input type="submit" class="btn btn-primary btn-rounded   btn-sm"
                  data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                  value="update"/>
              </form>   

                </MDBTabsPane>
                <MDBTabsPane show={verticalActive === 'tab2'}>


                  <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '80px' }}>
                    <MDBRow className='row-cols-1 row-cols-md-4 g-4'>

                      {console.log('allFavPetss', allFavPetss)}

                      {allFavPetss.map((item, idx) => {
                        if (item.userId === user.id && item.image_link) {

                          
                          
                          return (
                            <MDBCol>
                              <MDBCard className='h-60' style={{ margin: '10px', textAlign:'center' }} key={idx}>
                                <MDBCardImage
                                  src={item.image_link}
                                  alt='...'
                                  position='top'
                                  height={140}
                                  width={140}
                                />
                                <MDBCardBody>
                                  <MDBCardTitle>{item.name}</MDBCardTitle>
                                  <p>
                                    {item.description}
                                  </p>
                                  <p>
                                  <b>type:</b>:{item.petType}
                                  </p>
                                  <p>
                                  <b>breed:</b> {item.breed}
                                  </p>
                                  <p>

                                  <p>
                                    
                                    <b> gender:</b> {item.gender}
                                    </p>
                                    
                                  <b> owner:</b> {item.petOwnerName}
                                  </p>
                                  <button type="button" class="btn btn-primary btn-rounded   btn-sm"
                                    data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }} 
                                    onClick={() => { deleteFavoritePet(item.id) }}
                                    >

                                    remove
                                  </button>
                                </MDBCardBody>

                              </MDBCard>
                            </MDBCol>
                            // <p>
                            //     {item.breed}
                            // </p>
                            )
                          }
                        })
                      }
                    </MDBRow>
                  </div>
                </MDBTabsPane>
                <MDBTabsPane show={verticalActive === 'tab3'} >
                  <Chat />
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBCol>
          </MDBRow>

          {/* ------------------------ MODAL FORM TO UPDATE INFORMATIONS ------------- */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                // onSubmit={updatePetInfo}
                >

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>email:</Form.Label>
                  <Form.Control type="text" name="username"
                    defaultValue={user.email}
                    />

                  <Form.Label>password:</Form.Label>
                  <Form.Control type="text" name="username"
                    defaultValue={user.password}
                  />
                </Form.Group>
                {/* <Form.Group controlId="formBasicEmail">
                  <Form.Label>breed:</Form.Label>
                  <Form.Control type="text" placeholder="breed" name="breed"
                  />
                  </Form.Group>
                  
                  <Form.Group controlId="formBasicEmail">
                  <Form.Label>image:</Form.Label>
                  <Form.Control type="text" placeholder="image_link" name="image_link"
                  onChange={handleChange} />
                  </Form.Group>
                  
                  <Form.Group controlId="formBasicEmail">
                  <Form.Label>origin:</Form.Label>
                  <Form.Control type="text" placeholder="origin" name="origin"
                  onChange={handleChange} />
                </Form.Group> */}

                <br />

                {/* <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label for="petType">pet type :</Form.Label>
                <Form.Control as="select" onClick={handleChange} name="petType" id="petType"> */}
                {/* <option value="admin">Admin</option> */}
                {/* <option value="cat" >cat</option>
                    <option value="dog">dog</option> */}

                {/* </Form.Control>
                </Form.Group> */}
                <br />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
          {/* -------------------------------------------------- */}
        </div>
      </div>

      <Footer />
                    </div>
    </>
  )
}
