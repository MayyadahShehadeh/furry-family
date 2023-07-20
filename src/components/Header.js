import React, { useState, useEffect } from 'react';
import {
    MDBContainer, MDBNavbar, MDBNavbarBrand,
    MDBNavbarToggler, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBCollapse,
    MDBIcon, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem
} from 'mdb-react-ui-kit';
import { logout, fetchConversations } from '../store/utils/thunkCreators';
import { clearOnLogout } from '../store/index';
import { useSelector, useDispatch } from 'react-redux';
import logoimg from './images/logo.png';
export default function Header(props) {
    const user = useSelector((state) => state.user);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showNav, setShowNav] = useState(false);

console.log('user:::',user);
console.log('isLoggedIn:::',isLoggedIn);

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout(user.id));
        dispatch(clearOnLogout());
        console.log('you logout');
      };


      useEffect(() => {
        setIsLoggedIn(true);
      }, [user?.id]);

  return (
    <div>
        
        <div >

<MDBNavbar expand='lg' light bgColor='light' fixed  >
    <MDBContainer fluid>
        <MDBNavbarBrand href='/'>
            <img
            style={{marginLeft:'50px'}}
                src={logoimg}
            height='70'
            alt=''
            loading='lazy'
            />
        </MDBNavbarBrand>
        <MDBNavbarToggler
            type='button'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNav(!showNav)}>

        </MDBNavbarToggler>


        <div className='ms-auto'>


            <MDBCollapse navbar show={showNav} style={{ justifyContent: 'center' }}  >
                <MDBNavbarNav>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/'>
                            Home
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/chat'>
                            chat
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/cats'>
                            Cats
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                     <MDBNavbarItem>
                        <MDBNavbarLink href='/dogs'>
                            Dogs
                        </MDBNavbarLink>
                    </MDBNavbarItem>

                    {user.id ?

                        <MDBDropdown group className='shadow-0'>
                            <MDBDropdownToggle color='link'>
                                <MDBIcon fas icon="user" />


                            </MDBDropdownToggle>
                            <MDBDropdownMenu>

                           
                           
                                <MDBDropdownItem link>
                                    <MDBNavbarItem >
                                      
                                           {/* {ContextLogin.user.user.username} */}
                                       <br/>
                                       {/* {ContextLogin.loggedIn} */}
                                    </MDBNavbarItem>
                                </MDBDropdownItem>

                                <MDBDropdownItem link>
                                    <MDBNavbarItem >
                                      
                                        <MDBNavbarLink  href='/profile'>
                                            Profile
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                </MDBDropdownItem>

                             
                                <MDBDropdownItem link onClick={handleLogout}>
                                    Log Out
                                </MDBDropdownItem>

                            </MDBDropdownMenu>
                        </MDBDropdown>
                        :
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/sign' >Sign in</MDBNavbarLink>


                        </MDBNavbarItem>
                     } 
                </MDBNavbarNav>
            </MDBCollapse>
        </div>





        {/* <img alt="imag" className="header-user-pic" src={imagelogo} /> */}

    </MDBContainer>
</MDBNavbar>
</div>
  </div>
  )
}
