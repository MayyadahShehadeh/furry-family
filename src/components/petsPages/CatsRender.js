import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import {
  MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle,
  MDBCardText, MDBRow, MDBCol, MDBCardFooter
} from 'mdb-react-ui-kit';
import { PetsDataContext } from '../context/datacontext';
import { useSelector } from 'react-redux';
import { When } from 'react-if';
import { Alert, Button } from 'react-bootstrap'
import Header from '../Header';
import Footer from '../Footer';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Box, Image, Flex, Heading, Text, IconButton, BiLike } from '@chakra-ui/react'
import '../css/petscards.css'
import axios from 'axios';
import cookie from "react-cookies";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default function DogsRenders() {
  const petsContext = useContext(PetsDataContext);
  const catsDatabase = petsContext.allPets;
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [catOwnerName, setcatOwnerName] = useState('');
  const [catOwnerEmail, setcatOwnerEmail] = useState('');
  const [catOwnerPhone, setcatOwnerPhone] = useState('');
  const [showAlert, setshowAlert] = useState(false);
  const [allFavor, setallFavor] = useState([]);
  const token = cookie.load("token");

  // ------------ get person contact information ---------------- 
  const ownerContactInformation = async (catID) => {
    let choosenCat = catsDatabase.find(item => {
      return item.id === catID
    })
    // console.log('choosenCat', choosenCat);
    setcatOwnerName(choosenCat.petOwnerName);
    setcatOwnerEmail(choosenCat.petOwnerEmail);
    setcatOwnerPhone(choosenCat.userPhone);
    setShow(true);

  }
  // const favoritePethandler = (catid) => {
  //   petsContext.allFavPets.map(item => {
  //     if (item.id == catid) {
  //       return setshowAlert(true);
  //     }else{
  //       petsContext.addFavPet(catid)
  //     }
  //   })
  // }
  // const addFavorite = async (id) => {
  //   console.log('before context');
  //   await petsContext.addFavPet(id)
  //   console.log('after context');

  //   setshowAlert(true)
  // }


  const addFavPet = async (petID) => {
    let choosenPet = catsDatabase.find(item => {
      console.log("item", item);
      return item.id === petID;
    })
    console.log('choosenPet', choosenPet);

    let petInfo = {
      name: choosenPet.name,
      image_link: choosenPet.image_link,
      petOwnerName: choosenPet.petOwnerName,
      petOwnerEmail: choosenPet.petOwnerEmail,
      userPhone: choosenPet.userPhone,
      description: choosenPet.description,
      petType: choosenPet.petType,
      petOwnerId: choosenPet.userId,
      breed: choosenPet.breed,

      userId: user.id,
    }
    console.log(petInfo);

    const addPetData = await axios.post(`http://localhost:3001/api/v2/favpets`, petInfo,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },});
    console.log('addPetData.data', addPetData.data);
    await setallFavor([addPetData.data, ...allFavor]);
    console.log('-------------- from add fav function');
    setshowAlert(true)
   }
  console.log('allFavor', allFavor);

  useEffect(() => {
    const timer = setTimeout(() => {
      setshowAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

    <>
      <Header />
      <div style={{ marginLeft: '140px', marginRight: '140px', marginTop: '30px' }}>
      <Breadcrumb style={{marginLeft:'35px',marginTop:'30px'}}>
         <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
         <Breadcrumb.Item href="/cats">Adopt</Breadcrumb.Item>

         <Breadcrumb.Item active>Cats</Breadcrumb.Item>
       </Breadcrumb>

        <MDBRow className='row-cols-1 row-cols-md-4 g-4'>

          {/* {console.log('getdbDogs', petsContext.allPets)} */}

          {catsDatabase.map((item, idx) => {
            if (item.petType == "cat") {

              return (
                <MDBCol>

                  {/* ------------------------------------ CARD ---------------------------------------- */}
                  <MDBCard className='h-80' style={{ margin: '10px', width: "250px" }} key={idx}>

                    <div className='body22'>
                      <div class="card22">
                        <img src={item.photoUrl} alt="Avatar" class="avatar" />
                        <div>
                          <div class="name22" >{item.petOwnerName}</div>
                          {/* <div class="job">Frontend Developer</div> */}
                        </div>
                      </div>
                    </div>

                    <div class="bg-image hover-zoom" style={{ margin: '10px 10px 0 10px' }}>
                      <MDBCardImage
                        src={item.image_link}
                        alt='...'
                        position='top'
                        height={185}
                        width={140}
                      />
                    </div>
                    <MDBCardBody style={{ textAlign: 'center' }}>
                      <MDBCardTitle>{item.name}</MDBCardTitle>
                      {/* {user.capabilities == 'read' */}
                      <p>{item.description}</p>
                      <p><b>Breed:</b> {item.breed}</p>
                      <When condition={user.capabilities == 'read'}>


                        <button type="button" class="btn btn-primary btn-rounded   btn-sm"
                          data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                          onClick={() => { ownerContactInformation(item.id) }}>
                          contact the owner
                        </button>

                        <button type="button" class="btn btn-primary btn-rounded   btn-sm"
                          data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                          onClick={() => { addFavPet(item.id) }}>
                          add to favo
                        </button>
                      </When>
                    </MDBCardBody>
                  </MDBCard>

                  {/* ---------------------------------------------------------------------------- */}
                </MDBCol>
              )
            }
          })
          }
        </MDBRow>

        {/* ----------------- alert ----------------------- */}
        <div style={{ position: "absolute", top: 50, left: 800, right: 50, zIndex: 999 }}>

          <Alert show={showAlert} variant="success" >
            Added To Favorite!

            {/* <Button onClick={() => setshowAlert(false)} variant="outline-success">
              X
            </Button> */}

          </Alert>
        </div>

        {/* ----------------------------- SHOW CONTACT OWNER INFORMATION IN MODAL ---------------- */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Cat Owner Contact Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Name :{catOwnerName} <br />
            Email :{catOwnerEmail} <br />
            Phone :{catOwnerPhone} <br />

            <Link to="/profile">

              <button type="button" class="btn btn-primary btn-rounded   btn-sm"
                data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
              >
                go chat {catOwnerName}
              </button>
            </Link>

          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        {/* --------------------------------------------------- */}


        {/* ------------------------------- */}

        {/* {console.log('loginContext.user.username', loginContext.user.user.username)} */}


        {/* <MDBRow className='row-cols-1 row-cols-md-4 g-4'> */}
        {/* {console.log('all catsssss:', allCats)} */}
        {/* {catsDatabase.map((item, idx) => {
        return (
          
          
          <MDBCol >
          <MDBCard className='h-100' style={{ margin: '10px' }}>
          <MDBCardImage
                  src={item.image_link}
                  alt='...'
                  position='top'
                /> */}
        {/* <MDBCardBody>
                  <MDBCardTitle>{item.name}</MDBCardTitle>
                */}

        {/* <Auth capability="read"> */}
        {/* <button onClick={() => { ownerContactInformation(item.id) }}>contact the owner </button> */}
        {/* </Auth> */}
        {/* </MDBCardBody>

</MDBCard>
</MDBCol>
);
})
} */}
        {/* </MDBRow> */}

      </div>

      <Footer />
    </>
  )
}