import React, { useContext, useEffect, useState } from 'react'

import { Modal } from 'react-bootstrap'

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
// import Auth from '../auth/auth';
// import { LoginContext } from '../context/context';
import { PetsDataContext } from '../context/datacontext';

export default function DogsRenders() {

  // const dataContext = useContext(DataContext);
  const petsContext = useContext(PetsDataContext);

  // const apiCats = dataContext.getCats;
  const catsDatabase = petsContext.allPets;

  // const [allCats, setAllCats] = useState([]);
  const [show, setShow] = useState(false);
  const [catOwnerName, setcatOwnerName] = useState('');
  const [catOwnerEmail, setcatOwnerEmail] = useState('');
  const [catOwnerPhone, setcatOwnerPhone] = useState('');


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
  // useEffect(()=>{


  //   return setAllCats([...catsDatabase,...apiCats]);
  //   // console.log('akk catss', allCats);


  // },[])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (





<div style={{marginLeft:'140px',marginRight:'140px',marginTop:'80px'}}>
            <MDBRow className='row-cols-1 row-cols-md-4 g-4'>

            {/* {console.log('getdbDogs', petsContext.allPets)} */}

            {catsDatabase.map((item, idx) => {
              if(item.petType == "cat"){

              
                return (
                    <MDBCol>
                    <MDBCard className='h-100' style={{margin:'10px'}} key={idx}>
                      <MDBCardImage
                        src={item.image_link}
                        alt='...'
                        position='top'
                      />
                      <MDBCardBody>
                        <MDBCardTitle>{item.name}</MDBCardTitle>
                         {/* <Auth capability="read"> */}
                  <button onClick={() => { ownerContactInformation(item.id) }}>contact the owner </button>
                  {/* </Auth> */}
                  <button onClick={() => { petsContext.addFavPet(item.id) }}>add to favo </button>

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
  )
}