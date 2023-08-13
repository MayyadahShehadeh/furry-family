import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import cookie from "react-cookies";
import Button from '@mui/material/Button';
import { Redirect, useHistory } from "react-router-dom";

const token = cookie.load("token")

export default function AdminMessageCards() {
    const user = useSelector((state) => state.user)
    const [show, setShow] = React.useState(false);
    const history = useHistory();

    console.log('user:::', user);

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

    const handleClose = () => {
        setShow(false)
    }

    const handleOpen = () => {
        setShow(true)
    }
    const deleteUser = async (userID) => {
        let deleteuser = await axios.delete(`https://furry-family-backend-production.up.railway.app/auth/users/${userID}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        console.log('deleteuser', deleteuser);
        history.push("/")

    }

    return (
        <div>

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
                                <b>are you sure?</b> <br />
                                <Button variant="outlined" color="error" onClick={() => { deleteUser(user.id) }}>
                                    yes, delete my account
                                </Button>
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>



            <section  >
                <div class="container py-5" >
                    <div class="row">
                        <div class="col">
                            <nav aria-label="breadcrumb" class="bg-light rounded-3 p-3 mb-4" style={{backgroundColor:'white'}}>
                                <ol class="breadcrumb mb-0">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="/profile">Profile</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">User Profile</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4">
                            <div class="card mb-4">
                                <div class="card-body text-center">
                                    <img src={user.photoUrl} alt="avatar"
                                        class="rounded-circle img-fluid" style={{ width: "150px" }} />
                                    <h5 class="my-3">{user.username}</h5>
                                    <p class="text-muted mb-1">{user.role}</p>
                                    {/* <p class="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                                    <div class="d-flex justify-content-center mb-2">
                                        {/* <button type="button" class="btn btn-primary">Follow</button>
              <button type="button" class="btn btn-outline-primary ms-1">Message</button> */}
                                    </div>
                                </div>
                            </div>
                            {/* <div class="card mb-4 mb-lg-0"> */}
                            {/* <div class="card-body p-0">
            <ul class="list-group list-group-flush rounded-3">
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <i class="fas fa-globe fa-lg text-warning"></i>
                <p class="mb-0">https://mdbootstrap.com</p>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <i class="fab fa-github fa-lg" style={{color: "#333333"}}></i>
                <p class="mb-0">mdbootstrap</p>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <i class="fab fa-twitter fa-lg" style={{color: "#55acee"}}></i>
                <p class="mb-0">@mdbootstrap</p>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <i class="fab fa-instagram fa-lg" style={{color:" #ac2bac"}}></i>
                <p class="mb-0">mdbootstrap</p>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <i class="fab fa-facebook-f fa-lg" style={{color: "#3b5998"}}></i>
                <p class="mb-0">mdbootstrap</p>
              </li>
            </ul>
          </div> */}
                            {/* </div> */}
                        </div>
                        <div class="col-lg-8">
                            <div class="card mb-4">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Full Name</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <p class="text-muted mb-0">{user.username}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Email</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <p class="text-muted mb-0">{user.email}</p>
                                        </div>
                                    </div>

                                    {user.role == 'petowner' || user.role == 'petfinder' ? (
                                        <div>
                                            <hr />
                                            <div class="row">

                                                <div class="col-sm-3">
                                                    <p class="mb-0">phone</p>
                                                </div>

                                                <div class="col-sm-9">
                                                    <p class="text-muted mb-0">{user.phone}</p>
                                                </div>

                                            </div>

                                            <hr />
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <p class="mb-0">Address</p>
                                                </div>
                                                <div class="col-sm-9">
                                                    <p class="text-muted mb-0">{user.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                        :
                                        ("")}

                                    <hr />

                                    <div class="row">
                                        <Button variant="outlined" color="error" onClick={handleOpen}
                                            style={{ width: '200px' }}
                                        >

                                            delete my account
                                        </Button>
                                    </div>

                                </div>
                            </div>
                            {/* <div class="row"> */}
                            {/* <div class="col-md-6">
                                    <div class="card mb-4 mb-md-0"> */}
                            {/* <div class="card-body">
                <p class="mb-4"><span class="text-primary font-italic me-1">assigment</span> Project Status
                </p>
                <p class="mb-1" style={{fontSize:" .77rem"}}>Web Design</p>
                <div class="progress rounded" style={{height: "5px"}}>
                  <div class="progress-bar" role="progressbar" style={{width: "80%"}} aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize:" .77rem"}}>Website Markup</p>
                <div class="progress rounded" style={{height: "5px"}}>
                  <div class="progress-bar" role="progressbar" style={{width: "72%"}} aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize:" .77rem"}}>One Page</p>
                <div class="progress rounded" style={{height: "5px"}}>
                  <div class="progress-bar" role="progressbar" style={{width: "89%"}} aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1"style={{fontSize:" .77rem"}}>Mobile Template</p>
                <div class="progress rounded" style={{height: "5px"}}>
                  <div class="progress-bar" role="progressbar" style={{width: "55%"}} aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize:" .77rem"}}>Backend API</p>
                <div class="progress rounded mb-2" style={{height: "5px"}}>
                  <div class="progress-bar" role="progressbar" style={{width: "66%"}} aria-valuenow="66"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div> */}
                            {/* </div> */}
                            {/* </div>
                                </div> */}
                            {/* <div class="col-md-6">
                                    <div class="card mb-4 mb-md-0"> */}
                            {/* <div class="card-body">
                <p class="mb-4"><span class="text-primary font-italic me-1">assigment</span> Project Status
                </p>
                <p class="mb-1" style={{fontSize:" .77rem"}}>Web Design</p>
                <div class="progress rounded" style={{height: "5px"}}>
                  <div class="progress-bar" role="progressbar" style={{width: "80%"}} aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize:" .77rem"}}>Website Markup</p>
                <div class="progress rounded" style={{height: "5px"}}>
                  <div class="progress-bar" role="progressbar" style={{width: "72%"}} aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize:" .77rem"}}>One Page</p>
                <div class="progress rounded" style={{height: "5px"}}>
                  <div class="progress-bar" role="progressbar" style={{width: "89%"}} aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize:" .77rem"}}>Mobile Template</p>
                <div class="progress rounded" style={{height: "5px"}}>
                  <div class="progress-bar" role="progressbar" style={{width: "55%"}} aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize:" .77rem"}}>Backend API</p>
                <div class="progress rounded mb-2" style={{height: "5px"}}>
                  <div class="progress-bar" role="progressbar" style={{width: "66%"}}aria-valuenow="66"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div> */}
                            {/* </div>
                                </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </section>



        </div>
    )
}
