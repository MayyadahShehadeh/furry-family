import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Modal } from 'react-bootstrap'
import {
  MDBCard, MDBCardImage, MDBCardBody,
  MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBCardFooter, MDBTabs,
  MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane, MDBIcon
} from 'mdb-react-ui-kit';
import { PetsDataContext } from '../context/datacontext';
import { useSelector } from 'react-redux';
import Chat from '../Chat';
import Header from '../Header';
import Footer from '../Footer';
import InformationProfilePages from '../InformationProfilePages';
import cookie from "react-cookies";
import axios from 'axios';
const token = cookie.load("token");


export default function PetOwnerProfile() {
  const petsContext = useContext(PetsDataContext);
  const user = useSelector((state) => state.user);

  let [userInputs, setIuserInputs] = useState({})
  let [catsData, setCatsData] = useState([]);

  let [show, setShow] = useState(false);
 
 
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setIuserInputs((prevalue) => {
      console.log('prevalue', prevalue);
      return {
        ...prevalue,   // Spread Operator              
        [name]: value
      }
    })
  }
  const updatCatHandler = async (catId) => {
    await petsContext.updatePet(catId);
    // console.log('updateCat', dataContext.updateCat(catId));
    setShow(true);

  }
  const updateCatInfoOnSubmit = async (e) => {
    e.preventDefault();
    petsContext.updatePetInfo(
      userInputs.catName,
      userInputs.image_link,
      userInputs.description,
      userInputs.breed,
      userInputs.gender

    );
    // console.log('updateCat',dataContext.updateCat(catId));
  }

  const addPetSubmit = (e) => {
    e.preventDefault();
    petsContext.addPet(userInputs.name,
      userInputs.image_link,
      userInputs.description,
      userInputs.petType,
      userInputs.breed,
      userInputs.gender,

    );
    e.target.reset();
  };
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
    let userData = await axios.put(`http://localhost:3001/auth/users/${userID}`, userInputs,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('userData', userData.data);
    refreshPage();

  }
  const handleClose = () => {setShow(false);}

  function refreshPage() {
    window.location.reload(false);
  }

  const [verticalActive, setVerticalActive] = useState('tab1');

  const handleVerticalClick = (value) => {
    if (String(value) === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  return (
    <>
      <div className='background-white'>

        <Header />
        <InformationProfilePages />
        <div style={{ marginLeft: '10px', marginRight: '50px', marginTop: '80px', backgroundColor: 'white' }}>

          {/* ---------------------- tabs ------------------------------------ */}
          <MDBRow>
            <MDBCol size='3'>
              <MDBTabs className='flex-column text-center'>
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
                    <MDBIcon fas icon="dog" /> {" "}
                    YOUR PETS
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleVerticalClick('tab3')}
                    active={verticalActive === 'tab3'} >
                    <MDBIcon fas icon="comment" />{" "}
                    CHAT

                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
            </MDBCol>
            <MDBCol size='9'>
              <MDBTabsContent>
                <MDBTabsPane show={verticalActive === 'tab1'}>YOUR INFORMATIONS
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

                    <br /><br /> <br />
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Change Your Password?</Form.Label>
                      <Form.Control type="password" placeholder="Password" defaultValue={user.password} name="password" />
                    </Form.Group>
                    <br />
                    <input type="submit" class="btn btn-primary btn-rounded   btn-sm"
                      data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                      value="update" />

                  </form>
                </MDBTabsPane>
                <MDBTabsPane show={verticalActive === 'tab2'}>ADD YOUR PET


                  {/* ------------------------- FILTER PETS --------------------- */}
                  {/* <div className="row h-100 justify-content-center align-items-center" style={{ margin: '35px', marginTop: '100px' }}>
        <Form.Select aria-label="Default select example" name='petType2' 
      style={{ width: '50%' }} placeholder='choose pet'onChange={handleChange} */}
                  {/* > */}
                  {/* <option value="" >Select Cat Breed</option> */}
                  {/* <option value="">All</option> */}
                  {/* <option value="cat">cat</option>
          <option value="dog">dog</option>
          </Form.Select>
          <button onSubmit={(e) => choosenPetType(e)}>select </button>
        </div > */}
                  <div style={{ marginLeft: '40px', marginRight: '50px' }}>
                    <Form onSubmit={addPetSubmit}>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>name:</Form.Label>
                        <Form.Control type="text" placeholder="name" name="name"
                          onChange={handleChange} />
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>breed:</Form.Label>
                        <Form.Control type="text" placeholder="breed" name="breed"
                          onChange={handleChange} />
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>image:</Form.Label>
                        <Form.Control type="text" placeholder="image_link" name="image_link"
                          onChange={handleChange} />
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>description:</Form.Label>
                        <Form.Control type="text" placeholder="description" name="description"
                          onChange={handleChange} />
                      </Form.Group>

                      <br />
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label for="gender">gender :</Form.Label>
                        <Form.Control as="select" onClick={handleChange} name="gender" id="gender">
                          {/* <option value="admin">Admin</option> */}
                          <option value="male" >male</option>
                          <option value="female">female</option>

                        </Form.Control>
                      </Form.Group>
                      <br />

                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label for="petType">pet type :</Form.Label>
                        <Form.Control as="select" onClick={handleChange} name="petType" id="petType">
                          {/* <option value="admin">Admin</option> */}
                          <option value="cat" >cat</option>
                          <option value="dog">dog</option>

                        </Form.Control>
                      </Form.Group>
                      <br />
                      <button type="submit" class="btn btn-primary btn-rounded   btn-sm"
                        data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                      >
                        Add
                      </button>
                      {/* <Button variant="primary" type="submit">
                        Submit
                      </Button> */}
                    </Form>
                    <br /><br />
                    <br /><br />

                    {/* --------------------------- RENDER USER CATS ------------------- */}

                    <MDBRow className='row-cols-1 row-cols-md-4 g-3'>
                      {console.log('userdb cats', catsData)}
                      {/* {console.log('user id ', ContextLogin.user.user.id)} */}
                      {petsContext.allPets.map((item, idx) => {
                        // { console.log('catsssss userId:', item.userId) }
                        if (item.userId == user.id) {
                          return (
                            <MDBCol >
                              <MDBCard className='h-80' style={{ margin: '10px', textAlign: 'center' }} key={idx}>
                                <MDBCardImage
                                  src={item.image_link}
                                  alt='...'
                                  position='top'
                                  height={140}
                                  width={140}
                                />
                                {/* <MDBCardText>
                            This is a longer card with supporting text below as a natural lead-in to additional content.
                            This content is a little bit longer.
                          </MDBCardText> */}
                                <MDBCardBody>
                                  <MDBCardTitle>{item.name}</MDBCardTitle>
                                  <MDBCardTitle style={{ fontSize: '16px' }}>{item.description}</MDBCardTitle>
                                  <button type="button" class="btn btn-primary btn-rounded   btn-sm"
                                    data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                                    onClick={() => { petsContext.deletePet(item.id) }}>
                                    delete
                                  </button>
                                  {/* <Button style={{ margin: '10px' }} onClick={() => { petsContext.deletePet(item.id) }}>
                                    delete
                                  </Button> */}

                                  <button type="button" class="btn btn-primary btn-rounded   btn-sm"
                                    data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                                    onClick={() => { updatCatHandler(item.id) }}>
                                    update
                                  </button>
                                  {/* <Button style={{ margin: '10px' }} onClick={() => { updatCatHandler(item.id) }} > 
                                  update </Button> */}

                                </MDBCardBody>

                              </MDBCard>
                            </MDBCol>
                          )
                        }
                      })}
                    </MDBRow>
                  </div>
                  {/* ------------------------------------ */}
                </MDBTabsPane>
                <MDBTabsPane show={verticalActive === 'tab3'}>
                  <Chat />
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBCol>
          </MDBRow>

          {/* ------------------------ MODAL FORM TO UPDATE CAT INFORMATIONS ------------- */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={updateCatInfoOnSubmit}
              >
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>name :</Form.Label>
                      <Form.Control type="text" onChange={handleChange} defaultValue={petsContext.selectedPet.name} name="catName" />
                    </Form.Group>

                {/* name :<input type="text" name='catName' onChange={handleChange}
                  defaultValue={petsContext.selectedPet.name} /> */}
                <br />

                <Form.Group controlId="formBasicEmail">
                      <Form.Label> breed :</Form.Label>
                      <Form.Control type="text" onChange={handleChange} defaultValue={petsContext.selectedPet.breed} name="origin" />
                    </Form.Group>
                {/* breed :<input type="text" name='origin' onChange={handleChange}
                  defaultValue={petsContext.selectedPet.breed} /> */}
                <br />
                <Form.Group controlId="formBasicEmail">
                      <Form.Label> Image:</Form.Label>
                      <Form.Control type="text" onChange={handleChange} defaultValue={petsContext.selectedPet.image_link} name="image_link" />
                    </Form.Group>
                {/* Image: <input type="text" name='image_link' onChange={handleChange}
                  defaultValue={petsContext.selectedPet.image_link} style={{ width: '390px' }} /> */}
                <br />
                <Form.Group controlId="formBasicEmail">
                      <Form.Label> description :</Form.Label>
                      <Form.Control type="text" onChange={handleChange}
                       defaultValue={petsContext.selectedPet.description } name="description" />
                    </Form.Group>

                {/* description :<input type="text" name='description' onChange={handleChange}
                  defaultValue={petsContext.selectedPet.description} /> */}
                <br />

                <br />
                <input type="submit" class="btn btn-primary btn-rounded   btn-sm"
                  data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                  value="update" onClick={handleClose} />


                <button type="button" class="btn btn-primary btn-rounded   btn-sm"
                  data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                  onClick={handleClose}>Close</button>
              </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
          {/* -------------------------------------------------- */}
        </div>
        <Footer />
      </div>
    </>
  )
}
