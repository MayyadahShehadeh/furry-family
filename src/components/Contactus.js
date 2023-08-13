import React, { useState } from 'react'
import './css/contactus.css';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default function Contactus() {
  let [userInputs, setIuserInputs] = useState({})

  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setShow(false)
  }
  const [rest, setReset] = useState(" ");
  const user = useSelector((state) => state.user);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "background.paper",
    textAlign: 'center',
    p: 4
  };

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


  const addMessage = async (e) => {
    e.preventDefault();
    if (user.id) {
      const messageInputs = {
        name: userInputs.name || user.username,
        email: userInputs.email || user.email,
        message: userInputs.message,
        userPhotourl:user.photoUrl,
        userId: user.id
      }
      const addMessage = await axios.post(`https://furry-family-backend-production.up.railway.app/api/v2/contactus`, messageInputs)

      console.log('your message', addMessage.data);

      setOpen(true);
      e.target.reset();

    } else {
      setShow(true);
    }
  }

  return (
    <>
      <Header />
      <div>

      <Breadcrumb style={{marginLeft:'170px',marginTop:'30px'}}>
         <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
       
         <Breadcrumb.Item active>Contact us</Breadcrumb.Item>
         </Breadcrumb>

        {/* --------------------------------- SHOW MODAL MESSAGE ----------------------------  */}

        <div>
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          <Modal
            aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose} closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}>
            <Fade in={open}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  <b>Thank You {userInputs.name}!</b>
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Your message has been sent
                  <br />
                  The response will be via e-mail within 1-2 days
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </div>
        {/* ------------------------------------------------------------------------------------ */}
        {/* ------------------------ 2 MODAL IF NOT SIGN ------------------------------------------------ */}

        <div>
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          <Modal
            aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description"
            open={show}
            onClose={handleClose} closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}>
            <Fade in={show}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  <b>You need to have account!</b>
                </Typography>
                {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Your message has been sent
                  <br />
                  The response will be via e-mail within 1-2 days
                </Typography> */}
              </Box>
            </Fade>
          </Modal>
        </div>
        {/* ---------------------------------------------------------------------------------------------- */}
        {/* <br /><br /> */}
        <div className='wrapper2' >

          <div class="container2">
            <div class="content">
              <div class="left-side">
                <div class="address details">
                  <i class="fas fa-map-marker-alt"></i>
                  <div class="topic">Address</div>
                  <div class="text-one">Amman, Jordan</div>
                  <div class="text-two">{" "}</div>
                
                </div>
                <div class="phone details">
                  <i class="fas fa-phone-alt"></i>
                  <div class="topic">Phone</div>
                  <div class="text-one">+962 7893 56472</div>
                  <div class="text-two">{" "}</div>
                </div>
                <div class="email details">
                  <i class="fas fa-envelope"></i>
                  <div class="topic">Email</div>
                  <div class="text-one">contactus@gmail.com</div>
                  <div class="text-two">{" "}</div>
                </div>
              </div>
              <div class="right-side">
                <div class="topic-text">Send us a message</div>
                <p>If you have any work from me or any types of quries related to my tutorial, you can send me message from here. It's my pleasure to help you.</p>


                <form action="#" onSubmit={addMessage}>
                  <div class="input-box">
                    <input type="text" placeholder="Enter your name" defaultValue={user.username} name='name' onChange={handleChange} />
                  </div>
                  <div class="input-box">
                    <input type="text" placeholder="Enter your email" defaultValue={user.email} name='email' onChange={handleChange} />
                  </div>
                  <div class="input-box message-box">
                    <label for="message"></label>
                    <textarea id="message" name="message" rows="4" cols="50" placeholder='Enter Your Message' onChange={handleChange}>

                    </textarea>
                  </div>
                  <div class="button">
                    <input type="submit" value="Send Now" class="btn btn-primary btn-rounded   btn-sm"
                      data-mdb-ripple-color="#ffffff"
                      style={{ backgroundColor: "#ec3257", margin: '5px' }} />

                   
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
