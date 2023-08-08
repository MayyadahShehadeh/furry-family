import { useContext } from "react";
import { PetsDataContext } from '../datacontext';
import { When } from 'react-if';


export default function Auth(props) {

    const login = useContext(PetsDataContext)

    const isLoggedIn = login.loggedIn;
    const can = login.canDo(props.capability);

    // console.log('props.capability)', props.capability);
    // console.log('inside auth', isLoggedIn, can);

    return (
        <When condition={isLoggedIn && can}>
            {props.children}
        </When>
    )
}