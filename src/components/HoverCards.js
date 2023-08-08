import React, { useContext } from 'react'
// import './css/hoverCards.css';
import { PetsDataContext } from './context/datacontext';

import { Card, Button } from 'react-bootstrap'
export default function HoverCards() {
    const petsContext = useContext(PetsDataContext);
    return (
        <div>
            {petsContext.allPets.map((item, idx) => {
                return (

                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    )
}
