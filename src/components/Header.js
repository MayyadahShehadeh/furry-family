import React, { useState, useEffect } from 'react';
import {
    MDBContainer, MDBNavbar, MDBNavbarBrand,
    MDBNavbarToggler, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBCollapse,
    MDBIcon, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem
} from 'mdb-react-ui-kit';
import { logout, fetchConversations } from '../store/utils/thunkCreators';
import { clearOnLogout } from '../store/index';
import { useSelector, useDispatch } from 'react-redux';
import logoimg from './images/preview.png';

export default function Header(props) {
    const user = useSelector((state) => state.user);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);

    console.log('user:::', user);
    console.log('isLoggedIn:::', isLoggedIn);

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

                {/* --------------------------------------------------------- */}
                <MDBNavbar expand='lg' fixed className='bg-transparent shadow-1-strong text-dark text-danger' >
                    <MDBContainer fluid>
                        <MDBNavbarBrand href='/'>
                            <img
                                style={{ marginLeft: '50px' }}
                                src={logoimg}
                                height='40x'
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


                        <div className='ms-auto' >

                            <MDBCollapse navbar show={showNav} style={{ justifyContent: 'center' }}  >
                                <MDBNavbarNav>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href='/' >
                                            Home
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                    <MDBNavbarItem>
                                        <MDBDropdown>
                                            <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                                                Adopt
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu>
                                                <MDBDropdownItem link href='/cats'>Cats</MDBDropdownItem>
                                                <MDBDropdownItem link href='/dogs'>Dogs</MDBDropdownItem>
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </MDBNavbarItem>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href='/process' >
                                             Process
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                    
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href='/careafteradoption' >
                                            Care
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href='/contactus' >
                                            Contact
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href='/aboutus' >
                                            About us
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                   

                                    {user.id ?

                                        <MDBDropdown group className='shadow-0'>
                                            <MDBDropdownToggle color='link' style={{color:'#ed1e4d'}}>
                                                <MDBIcon fas icon="user" style={{color:'#ed1e4d'}}/>


                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu>

                                                <MDBDropdownItem link>
                                                    <MDBNavbarItem >

                                                        <MDBNavbarLink href='/profile'>
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
                    </MDBContainer>
                </MDBNavbar>
            </div>
        </div>
    )
}
