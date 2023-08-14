import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, } from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap'
import { When } from 'react-if';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PetsDataContext } from '../context/datacontext';
import Header from '../Header';
import Footer from '../Footer';
import '../css/petscards.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import axios from 'axios';
import cookie from "react-cookies";

export default function DogsRenders({ socket }) {

  const petsContext = useContext(PetsDataContext);
  const dogsDatabase = petsContext.allPets;
  const [dogOwnerName, setdogOwnerName] = useState('');
  const [dogOwnerEmail, setdogOwnerEmail] = useState('');
  const [dogOwnerPhone, setdogOwnerPhone] = useState('');
  const [show, setShow] = useState(false);
  const [choosenDog, setchoosenDog] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [allFavor, setallFavor] = useState([]);

  const user = useSelector((state) => state.user);
  const token = cookie.load("token");

  const ownerContactInformation = async (catID) => {
    let selectedDog = await dogsDatabase.find(item => {
      return item.id === catID
    })
    console.log('selectedDog', selectedDog);
    setchoosenDog(selectedDog)
    // console.log('choosenCat', choosenCat);
    setdogOwnerName(choosenDog.petOwnerName);
    setdogOwnerEmail(choosenDog.petOwnerEmail);
    setdogOwnerPhone(choosenDog.userPhone);
    setShow(true);

  }
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const addFavorite = (id) => {
  //   petsContext.addFavPet(id)
  //   setshowAlert(true)
  // }
  const addFavPet = async (petID) => {
    let choosenPet = dogsDatabase.find(item => {
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

    const addPetData = await axios.post(`https://furry-family-backend-production.up.railway.app/api/v2/favpets`, petInfo,
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
  // const [userName, setUserName] = useState("")

  // const handleSubmit = () => {
  // socket.emit('newUser', { userName: loginContext.user.user.username,finder_id:loginContext.user.user.id, socketID: socket.id ,
  // petOwnerName:choosenDog.petOwnerName, petOwner_id:choosenDog.userId})
  // navigate("/chat")
  // }
  useEffect(() => {
    const timer = setTimeout(() => {
      setshowAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <>
          <div style={{backgroundColor:"white"}}>
      <Header />
      {/* ----------------- alert ----------------------- */}
      <Breadcrumb style={{ marginLeft: '170px', marginTop: '30px' }}>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/dogs">Adopt</Breadcrumb.Item>

        <Breadcrumb.Item active>Dogs</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ position: "absolute", top: 50, left: 800, right: 50, zIndex: 999 }}>

        <Alert show={showAlert} variant="success" >
          Added To Favorite!
          {/* <Button onClick={() => setshowAlert(false)} variant="outline-success">
            X
          </Button> */}

        </Alert>
      </div>
      {/* ---------------------------- */}
      <div style={{ marginLeft: '140px', marginRight: '140px', marginTop: '30px' }}>
        
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
              <Link to="/profile">

                <button type="button" className="btn btn-primary btn-rounded   btn-sm"
                  data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}>
                    go chat {dogOwnerName}
                </button>
              </Link>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </form>
        </Modal>

        <MDBRow className='row-cols-1 row-cols-md-4 g-4'>

          {console.log('getdbDogs', petsContext.allPets)}

          {dogsDatabase.map((item, idx) => {
            if (item.petType === "dog") {


              return (
                <MDBCol>
                  <MDBCard className='h-80' style={{ margin: '10px', width: "250px" }} key={idx}>

                    <div className='body22'>
                      <div className="card22">
                        <img src={item.photoUrl} alt="Avatar" className="avatar" />
                        <div>
                          <div className="name22" >{item.petOwnerName}</div>
                          {/* <div className="job">Frontend Developer</div> */}
                        </div>
                      </div>
                    </div>

                    <div className="bg-image hover-zoom" style={{ margin: '10px 10px 0 10px' }}>
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
                      <p>{item.description}</p>
                      <p><b>Breed:</b> {item.breed}</p>


                      <When condition={user.capabilities === 'read'}>
                        {/* <FavoriteBorderOutlinedIcon/>          */}
                        {/* <button onClick={() => { ownerContactInformation(item.id) }}>
                          contact the owner </button> */}

                        <button type="button" className="btn btn-primary btn-rounded   btn-sm"
                          data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                          onClick={() => { ownerContactInformation(item.id) }}
                        >
                          contact the owner
                        </button>
                        <button type="button" className="btn btn-primary btn-rounded   btn-sm"
                          data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                          onClick={() => { addFavPet(item.id) }}>
                          add to fav </button>
                      </When>

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
              </div>
      <Footer />
    </>
  )
}
