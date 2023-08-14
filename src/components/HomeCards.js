import React from 'react'
import './css/homecards.css'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import img4 from './images/88888.jpg'
import img5 from './images/99999.jpg'

export default function HomeCards() {
  return (
    <div>


      {/* <!-- Start Blog Layout --> */}
      <div class="container">
        <div class="row">
          <div class="col-md-6 item" style={{ width: '1100px' }}>
            <ScrollAnimation className="animate__animated animate__fadeInUp"  >

              <div class="item-in">
                <h4>What is adoption?</h4>
                <div class="seperator" ></div>
                <div style={{
                  display: 'flex'

                }}>
                  <img style={{
                    height: '290px', width: '420px', float: "left",
                    marginLeft: "10px",
                    
                  }} src={img5} alt='img1'/>

                  <div style={{ float: 'right', marginTop: '30px' }}>
                    <p style={{ fontSize: '18px', marginLeft: '70px' }}>It's the process of transferring responsibility for a pet that was previously owned by another party. Common sources for adoptable pets are animal shelters, rescue groups, or other pet owners. Some organizations give adopters ownership of the pet, while others use a guardianship model wherein the organization retains some control over the animal's future use or care.</p>
                    {/* 
                            <p style={{ fontSize: '15px' }}>Online pet adoption sites have databases, searchable by the public, of pets being housed by thousands of animal shelters and rescue groups.</p> */}
                    <a style={{ fontSize: '15px', marginLeft: '70px' }} href="https://en.wikipedia.org/wiki/Pet_adoption">Read More
                      {/* <i class="fa fa-long-arrow-right"></i> */}
                    </a>
                  </div>

                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
        <div class="row">


          <div class="col-md-6 item "  style={{ width: '1100px' }}>
            <div >


              <ScrollAnimation className="animate__animated animate__fadeInUp" >


                <div class="item-in">
                  <h4>Pet ownership</h4>
                  <div class="seperator"></div>

                  <div style={{
                    display: 'flex'

                  }}>
                    <div style={{ float: 'left' , marginTop: '30px'}}>

                      <p  style={{ fontSize: '18px', marginRight: '40px' }}>According to the American Veterinary Medical Association (AVMA) (2018), being responsible for a pet requires commitment and should be considered a privilege. Similar to having children, the pet depends on the owner for their needs such as food and shelter, exercise and mental stimulation, and veterinary care.</p>

                      {/*                             

                            <p style={{ fontSize: '15px' }}> When choosing to adopt a pet, the lifestyle of the owner and the pet are recommended to be compatible. Once a pet is chosen, the owner is recommended to identify it the pet needs and medical attention like being spayed or neutered. If a situation arises that the owner can no longer provide a suitable household for the animal, rehoming is recommended. The AVMA presents guidelines for being a responsible pet owner.[9] This guideline is a resource of things to consider before becoming a pet owner.</p> */}
                      <a style={{ fontSize: '15px', marginRight: '50px' }} href="https://en.wikipedia.org/wiki/Pet_adoption">Read More
                        {/* <i class="fa fa-long-arrow-right"></i> */}
                      </a>
                    </div>

                    <img style={{
                      height: '260px', width: '400px', float: "right",
                      marginRight: "10px"
                    }} src={img4} alt='img2'/>
                  </div>

                </div>
              </ScrollAnimation>
            </div>
          </div>
          {/* </div> */}
          {/* <p style={{textAlign:'center'}}>With Icons <em>(hover over icons)</em></p> */}
          {/* <!-- With Icons --> */}
          {/* <div class="row">
    <div class="col-md-6 item">
      <div class="item-in">
        <div class="icon">
          <a href="#"> */}
          {/* <?xml version="1.0" encoding="iso-8859-1"?> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16.662 16.662" xml:space="preserve" width="512px" height="512px"> */}
          {/* <g> */}
          {/* <path d="M13.365,0.324H3.297L0,5.109l8.331,11.229l8.331-11.229C16.662,5.109,13.365,0.324,13.365,0.324z    M15.213,4.734h-3.4l1.298-3.054C13.111,1.68,15.213,4.734,15.213,4.734z M12.526,1.303l-1.342,3.156L9.071,1.303H12.526z    M10.544,4.734H6.442l1.909-3.273L10.544,4.734z M7.648,1.303L5.856,4.378L4.185,1.303H7.648z M3.584,1.634l1.685,3.1h-3.82   C1.449,4.734,3.584,1.634,3.584,1.634z M1.45,5.421h4.124l1.95,8.184C7.524,13.605,1.45,5.421,1.45,5.421z M6.279,5.421h4.548   l-2.468,8.732C8.359,14.153,6.279,5.421,6.279,5.421z M9.28,13.413l2.259-7.992h3.672L9.28,13.413z" fill="#777777"/>
            </g> */}
          {/* </svg> */}
          {/* <div class="icon-topic">Work Topic</div>
            </a>
        </div>
        <h4>Some Kind of Title</h4>
        <div class="seperator"></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi expedita eveniet consectetur, voluptates voluptatum, sit excepturi earum. Veniam eius amet, accusantium, deserunt officia, quos qui debitis laboriosam velit quis autem!</p>
        <a href="#">Read More
          <i class="fa fa-long-arrow-right"></i>
        </a>
      </div>
    </div> */}
          {/* <div class="col-md-6 item">
      <div class="item-in">
        <div class="icon">
          <a href="#"> */}
          {/* <?xml version="1.0" encoding="iso-8859-1"?> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16.662 16.662" xml:space="preserve" width="512px" height="512px"> */}
          {/* <g>
              <path d="M13.365,0.324H3.297L0,5.109l8.331,11.229l8.331-11.229C16.662,5.109,13.365,0.324,13.365,0.324z    M15.213,4.734h-3.4l1.298-3.054C13.111,1.68,15.213,4.734,15.213,4.734z M12.526,1.303l-1.342,3.156L9.071,1.303H12.526z    M10.544,4.734H6.442l1.909-3.273L10.544,4.734z M7.648,1.303L5.856,4.378L4.185,1.303H7.648z M3.584,1.634l1.685,3.1h-3.82   C1.449,4.734,3.584,1.634,3.584,1.634z M1.45,5.421h4.124l1.95,8.184C7.524,13.605,1.45,5.421,1.45,5.421z M6.279,5.421h4.548   l-2.468,8.732C8.359,14.153,6.279,5.421,6.279,5.421z M9.28,13.413l2.259-7.992h3.672L9.28,13.413z" fill="#777777"/>
            </g> */}
          {/* </svg> */}
          {/* <div class="icon-topic">Another Category or Post Type</div> */}
          {/* </a> */}
          {/* </div> */}
          {/* <h4>Some Kind of Title</h4>
        <div class="seperator"></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi expedita eveniet consectetur, voluptates voluptatum, sit excepturi earum. Veniam eius amet, accusantium, deserunt officia, quos qui debitis laboriosam velit quis autem!</p>
        <a href="#">Read More
          <i class="fa fa-long-arrow-right"></i>
        </a>
      </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
