import React from 'react'
import img from '../../components/images/14710.jpg'
import './stat.css'

const Stat = (props) => {
  return (
    <div className="stat-container" style={{alignContent:'center' ,  backgroundImage: `url(${img})` , backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <div className="stat-stats" style={{marginTop:'40px'}}>
        <div className="stat-stat">
          <h1 className="stat-text">
            <span>4250</span>
            <span>+</span>
          </h1>
          <span className="stat-text03"><b>Animals Adopted</b></span>
          <span className="stat-text04">
          Every day many new animal adoptions take place 
          </span>
        </div>
   
        <div className="stat-stat1">
          <h1 className="stat-text05">
            <span>369</span>
          </h1>
          <span className="stat-text07"><b>Happy family</b></span>
          
          <span className="stat-text08">
            Happy pet with new happy home is happy family.
          </span>
        </div>
        {/* <div className="stat-stat2">
          <h1 className="stat-text09">
            <span>500</span>
            <span>+</span>
          </h1>
          <span className="stat-text12">Hours</span>
          <span className="stat-text13">
            Lorem ipsum dolor sit amet, consectetur adipiscing.
          </span>
        </div> */}
        <div className="stat-stat3">
          <h1 className="stat-text14">
            <span>24/7</span>
          </h1>
          <span className="stat-text16"><b>Support</b></span>
          <span className="stat-text17">
           We are available any time you need us!
          </span>
        </div>
      </div>
    </div>
  )
}

export default Stat
