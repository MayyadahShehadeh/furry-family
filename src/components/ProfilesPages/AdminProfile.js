import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import cookie from "react-cookies";
import { useSelector } from 'react-redux';
import { MDBIcon, MDBTabs,MDBTabsItem,
  MDBTabsLink,MDBTabsContent, MDBTabsPane,MDBRow, MDBCol} from 'mdb-react-ui-kit';
import Chat from '../Chat';
import Header from '../Header';
import Footer from '../Footer';
import AdminMessageCards from '../AdminMessageCards';
import InformationProfilePages from '../InformationProfilePages';
import FixedBottomNavigation from '../CardsNavigation'
const token = cookie.load("token")

export default function AdminProfile() {
  const [allusers, setAllusers] = useState([]);

  const getAllusers = async () => {
    const getUsers = await axios.get(`http://localhost:3001/auth/users`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    console.log('getUsers', getUsers);

    setAllusers(getUsers.data)
  }

  const deleteUser = async (userID) => {
    let deleteuser = await axios.delete(`http://localhost:3001/auth/users/${userID}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    console.log('deleteuser', deleteuser);
    getAllusers();
  }

  useEffect(() => {
    getAllusers();

    console.log('all users', allusers);
  }, [])

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const [iconsActive, setIconsActive] = useState('tab1');

  function stringAvatar(name) {
    console.log('name', name);
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0]}`,
    };
  }

  const handleIconsClick = (value) => {
    if (String(value) === iconsActive) {
      return;
    }

    setIconsActive(value);
  };

  return (
    <> 
      <div className='background-white'>

        <Header />

        <InformationProfilePages/>
        <div style={{ backgroundColor: 'white' }}>

          <MDBTabs className='mb-3'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleIconsClick('tab1')} active={iconsActive === 'tab1'}>
                <MDBIcon fas icon="user-friends" /> users
              </MDBTabsLink>
            </MDBTabsItem>

            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleIconsClick('tab2')} active={iconsActive === 'tab2'}>
                <MDBIcon fas icon="comment" /> chat
              </MDBTabsLink>
            </MDBTabsItem>

            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleIconsClick('tab3')} active={iconsActive === 'tab3'}>
              <i class="fas fa-envelope"></i> Messages
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane show={iconsActive === 'tab1'}>
            <section class="title container" style={{marginTop:'5px',marginBottom:'30px'}}>
    {/* <div class="row"> */}
        {/* <div class="col-md-12"> */}
            <h1>All Users</h1>
            <div class="seperator"></div>
         
        {/* </div> */}
    {/* </div> */}
</section>
            <MDBRow className='row-cols-1 row-cols-md-4 g-2'>

              {allusers.map((user, idx) => {
                if (user.role !== 'admin') {
                  return (
                    <MDBCol>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      <ListItem alignItems="flex-start" key={idx}>
                      {user.photoUrl?(
                      //  <div className='body22'>
                       <div class="card22"> 
                         <img src={user.photoUrl} alt="Avatar" class="avatar" style={{marginRight:'30px'}} />
                         {/* <div> */}
                         
                         {/* </div> */}
                       </div>
                    //  {/* </div> */}

                      )
                      :
                      (
                        <div style={{marginLeft:"10px"}}>

                        <ListItemAvatar>
                        <Stack direction="row" spacing={2}>
                          <Avatar {...stringAvatar(`${user.username}`)} />
                        </Stack>
                      </ListItemAvatar>
                        </div>
                     
                      )
                    }

                        <ListItemText
                          primary={user.id}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary" >
                                {user.username}
                                <br />
                              </Typography>
                              role: {user.role}
                            </React.Fragment>
                          } />

                        <button type="submit" class="btn btn-primary btn-rounded   btn-sm"
                          data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                          onClick={() => { deleteUser(user.id) }}
                        >
                          delete
                        </button>

                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </List>
                    
                      </MDBCol>
                    )
                }
              })}
              </MDBRow>
              </MDBTabsPane>
            <MDBTabsPane show={iconsActive === 'tab2'}>

              <Chat />
            </MDBTabsPane>

            <MDBTabsPane show={iconsActive === 'tab3'}>

            
{/* <FixedBottomNavigation/> */}
            <AdminMessageCards/>
            </MDBTabsPane>
          </MDBTabsContent>



          <br /><br /><br />
        </div>

        <Footer />
      </div>
    </>
  )
}
