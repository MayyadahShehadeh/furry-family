import React, { useContext, useEffect, useState } from 'react'

import { Modal } from 'react-bootstrap'
// import { useNavigate } from "react-router-dom"
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBCardFooter
} from 'mdb-react-ui-kit';
import { PetsDataContext } from '../context/datacontext';
export default function DogsRenders({ socket }) {

  const petsContext = useContext(PetsDataContext);
  const dogsDatabase = petsContext.allPets;
  const [dogOwnerName, setdogOwnerName] = useState('');
  const [dogOwnerEmail, setdogOwnerEmail] = useState('');
  const [dogOwnerPhone, setdogOwnerPhone] = useState('');
  const [show, setShow] = useState(false);
  const [choosenDog, setchoosenDog] = useState(false);


  const ownerContactInformation = async (catID) => {
    let selectedDog = dogsDatabase.find(item => {
      return item.id === catID
    })
    console.log('selectedDog',selectedDog);
    setchoosenDog(selectedDog)
    // console.log('choosenCat', choosenCat);
    setdogOwnerName(choosenDog.petOwnerName);
    setdogOwnerEmail(choosenDog.petOwnerEmail);
    setdogOwnerPhone(choosenDog.userPhone);
    setShow(true);

  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // const loginContext = useContext(LoginContext);
  // const navigate = useNavigate()
  const [userName, setUserName] = useState("")

  // const handleSubmit = () => {
    // socket.emit('newUser', { userName: loginContext.user.user.username,finder_id:loginContext.user.user.id, socketID: socket.id ,
    // petOwnerName:choosenDog.petOwnerName, petOwner_id:choosenDog.userId})
    // navigate("/chat")
  // }
  return (
    <div style={{ marginLeft: '140px', marginRight: '140px', marginTop: '80px' }}>

      {/* ----------------------------- SHOW CONTACT OWNER INFORMATION IN MODAL ---------------- */}
      <Modal show={show} onHide={handleClose}>
        <form >
          <Modal.Header closeButton>
            <Modal.Title>
              Cat Owner Contact Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Name :{dogOwnerName} <br />
            Email :{dogOwnerEmail} <br />
            Phone :{dogOwnerPhone} <br />

            <button >chat with {dogOwnerName}</button>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </form>
      </Modal>

      <MDBRow className='row-cols-1 row-cols-md-4 g-4'>

        {console.log('getdbDogs', petsContext.allPets)}

        {dogsDatabase.map((item, idx) => {
          if (item.petType == "dog") {


            return (
              <MDBCol>
                <MDBCard className='h-100' style={{ margin: '10px' }} key={idx}>
                  <MDBCardImage
                    src={item.image_link}
                    alt='...'
                    position='top'
                  />
                  <MDBCardBody>
                    <MDBCardTitle>{item.name}</MDBCardTitle>
                    {/* <Auth capability="read"> */}
                    <button onClick={() => { ownerContactInformation(item.id) }}>
                      contact the owner </button>
                    {/* </Auth> */}
                    {/* <button onClick={() => { petsContext.addFavPet(item.id) }}>add to favo </button> */}
                    <button onClick={() => { petsContext.addFavPet(item.id) }}>
                      add to fav </button>

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
  )
}
