import React, { useContext, useEffect, useState } from 'react'
import { PetsDataContext } from '../context/datacontext';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from 'mdb-react-ui-kit';

import { Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from "react-cookies";
import { useSelector } from 'react-redux';
import Chat from '../Chat';
const token = cookie.load("token");


export default function PetFinderProfile() {
  const petsContext = useContext(PetsDataContext);
  const [allFavPets, setallFavPets] = useState([]);
  const user = useSelector((state) => state.user);

  const getAllFavPets = async () => {
    const getFavPet = await axios.get(`http://localhost:3001/api/v2/favpets`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    console.log('getFavPet', getFavPet);

    setallFavPets(getFavPet.data)
  }
  useEffect(() => {
    getAllFavPets();
  }, [])
  const deleteFavoritePet = async (petID) => {
    let deletPet = await axios.delete(`http://localhost:3001/api/v2/favpets/${petID}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    console.log('deletPet', deletPet);
    getAllFavPets();


  }

  const [verticalActive, setVerticalActive] = useState('tab1');

  const handleVerticalClick = (value) => {
    if (String(value) === verticalActive) {
      return;
    }

    setVerticalActive(value);
  }


  return (
    <div style={{ marginLeft: '10px', marginRight: '50px', marginTop: '80px' }}>

      <MDBRow>
        <MDBCol size='3'>
          <MDBTabs className='flex-column text-center'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')}
                active={verticalActive === 'tab1'}>
                YOUR INFORMATIONS
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')}
                active={verticalActive === 'tab2'}>
                YOUR FAVORITE PETS
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab3')}
                active={verticalActive === 'tab3'}>
                CHAT
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='9'>
          <MDBTabsContent>
            <MDBTabsPane show={verticalActive === 'tab1'}>Home content</MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab2'}>


              <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '80px' }}>
                <MDBRow className='row-cols-1 row-cols-md-4 g-4'>

                  {/* {console.log('getdbDogs', petsContext.allPets)} */}

                  {allFavPets.map((item, idx) => {

                    if (user.id == item.userId) {



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
                              <Button onClick={() => { deleteFavoritePet(item.id) }}>

                                remove from favorite
                              </Button>
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
            <MDBTabsPane show={verticalActive === 'tab3'}>
            
            <Chat/>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>







    </div>
  )
}
