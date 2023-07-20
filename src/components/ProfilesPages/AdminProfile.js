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
      console.log('deleteuser',deleteuser);

  //  useEffect(()=>{
    getAllusers();
  //  },[deleteuser])
  }
  useEffect(() => {
    getAllusers();
    // axios.get(`http://localhost:3003/users`,
    //   {
    //     headers: {
    //       authorization: `Bearer ${loginContext.user.token}`,
    //     },
    //   }).then((res)=>{
    //     setAllusers(res.data)
    //     console.log('getUsers', res.data);

    //   })

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
  function stringAvatar(name) {
    console.log('name', name);
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0]}`,
    };
  }

  return (
    <div>

      Admin Profile page!!
      {allusers.map((user, idx) => {
        if (user.role !== 'admin') {
          return (
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start" key={idx}>
                <ListItemAvatar>
                  <Stack direction="row" spacing={2}>
                    <Avatar {...stringAvatar(`${user.username}`)} />
                  </Stack>
                </ListItemAvatar>
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
                  <button 
                  onClick={() => { deleteUser(user.id) }}
                  >
                  delete

                  </button>
                {/* <Button onClick={() => { petsContext.deletePet(item.id) }}>

                  delete
                </Button> */}
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>)
        }
      })}
      <br /><br /><br />
    </div>
  )
}
