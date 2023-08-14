import React, { useEffect, useState } from "react";
import "./css/cardSlider.css";
import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Card } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import axios from "axios";

function Navbar() {

  const history = useHistory();
const [allPets,setallPets] = useState([]);


  const getAllPets = async () => {
    axios.get(`https://furry-family-backend-production.up.railway.app/api/v2/pets`).then((res) => {
        // console.log('dogs database', res.data);
        setallPets(res.data)

    });
    console.log('res.data', allPets);

}

useEffect(() => {
 
    getAllPets();

}, []);


  var swiper = new Swiper('.swiper', {
    slidesPerView: 4,
    direction: getDirection(),
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      resize: function () {
        swiper.changeDirection(getDirection());
      },
    },
  });

  function getDirection() {
    // var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    return direction;
  }

  const patsHandler = (item) => {
    if (item === "cat") {
      history.push("/cats")

    } else {
      history.push("/dogs")
    }
  }

  return (
    <div>

    <section className="title container" style={{marginTop:'75px'}}>
    {/* <div className="row"> */}
        {/* <div className="col-md-12"> */}
            <h1>Our pets</h1>
            <div className="seperator"></div>
            <p>CHOOSE YOUR FRIEND !</p>
        {/* </div> */}
    {/* </div> */}
</section>
    <div className="swiper" style={{ marginTop: 100 }}>
      <div className="swiper-wrapper">
        {allPets.map((item, idx) => {
          return (
            <div className="swiper-slide"  >

              <Card style={{ width: '18rem' }} key={idx}>
                <Card.Body>
                  <Card.Img variant="top" className="w-100 hover-shadow"
                    height={190}
                    width={140} src={item.image_link} />

                    <Card.Title style={{marginTop:'10px'}}>{item.name}</Card.Title>
                  <Card.Text style={{fontSize:'16px'}}>
                    {item.description}
                  </Card.Text>
                  <button type="button" className="btn btn-primary btn-rounded   btn-sm"
                  data-mdb-ripple-color="#ffffff" style={{ backgroundColor: "#ec3257", margin: '5px' }}
                  onClick={() => patsHandler(item.petType)}>Adopt Me!</button>

                  {/* <Button variant="primary" onClick={() => patsHandler(item.petType)}>Adopt Me!</Button> */}
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
      <br/><br/>
    </div>
                  </div>
  );
}

export default Navbar;
