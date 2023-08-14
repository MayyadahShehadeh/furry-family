import React, { useEffect, useState } from 'react'
import './css/adminmessagecard.css';
import axios from 'axios';
import cookie from "react-cookies";

import {MDBRow, MDBCol
} from 'mdb-react-ui-kit';

const token = cookie.load("token")

export default function AdminMessageCards() {

  const [allmsgs, setAllmsgs] = useState([]);
const getAllMsgs = async () =>{

  const getMsgs = await axios.get(`https://furry-family-backend-production.up.railway.app/api/v2/contactus`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        setAllmsgs(getMsgs.data)

      
}
  useEffect(() => {
    getAllMsgs();
  
  }, [])

  const deleteMessage = async(userID) =>{
    let deleteMsg = await axios.delete(`https://furry-family-backend-production.up.railway.app/api/v2/contactus/${userID}`,{
      headers: {
        authorization: `Bearer ${token}`,
    }, })
    console.log('deletmsg', deleteMsg);
    getAllMsgs();

  }


  return (
    <div>
      <MDBRow className='row-cols-1 row-cols-md-6 g-2'>

        {allmsgs.map((item, idx) => {
          return (
            <MDBCol>

              <div class="card bg-light mb-3" style={{ maxWidth: "12rem" }}>
                <div class="card-header card22" >
                  <img src={item.userPhotourl} alt="Avatar" class="avatar" />
                  <p>{item.name}</p>
                </div>
                <div class="card-body">
                  {/* <h5 class="card-title">{item.name}</h5> */}
                  <p class="card-text">
                    {item.message}</p>

                  <button type="button" class="btn btn-primary btn-rounded   btn-sm"
                    data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                    onClick={() => { deleteMessage(item.id) }}
                    >
                   remove
                  </button>
                </div>
              </div>
            </MDBCol>

          )
        })}
      </MDBRow>
      {/* <div style={{margin:'30px'}}>

<div className='bodyy'>

<div class="blog_post" >
<div class="img_pod">
<img src="https://pbs.twimg.com/profile_images/890901007387025408/oztASP4n.jpg" alt="random image" />
</div>
<div class="container_copy">
<h3>12 January 2019</h3>
<h1>CSS Positioning</h1>
<p>The position property specifies the type of positioning method used for an element (static, relative, absolute, fixed, or sticky).</p>
<a class="btn_primaryy" href='#' target="_blank">Read More</a>
</div>

</div>
</div>
</div> */}
    </div>
  )
}
