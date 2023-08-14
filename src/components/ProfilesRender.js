import React from 'react'
import AdminProfile from './ProfilesPages/AdminProfile';
import PetOwnerProfile from './ProfilesPages/PetOwnerProfile';
import Home from './Home';
import PetFinderProfile from './ProfilesPages/PetFinderProfile';
import { useSelector } from 'react-redux';

export default function ProfilesRender() {

    const user = useSelector((state) => state.user);

        


     if (user.role === 'petfinder') {
          return <PetFinderProfile/>;
        }
        if(user.role ==='admin') {
            return <AdminProfile />;
        }
        if (user.role === 'petowner') {
            return <PetOwnerProfile />;
        }
        return <Home />
        
  
      
         

  
}

