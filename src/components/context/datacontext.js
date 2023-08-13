import React, { useState, useEffect, useContext } from 'react';
// import cookie from 'react-cookies';
import axios from 'axios';
import { useSelector } from 'react-redux';

import cookie from "react-cookies";

export const PetsDataContext = React.createContext();

export default function PetsDataProvider(props) {

    const user = useSelector((state) => state.user);
    { console.log('user from context', user); }

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [allPets, setallPets] = useState([]);
    const [selectedPet, setselectedPet] = useState([]);
    const [favoritePet, setfavoritePett] = useState([]);
    const [allfavoritePet, setallfavoritePet] = useState([]);

    useEffect(() => {
        setIsLoggedIn(true);
    }, [user?.id]);

    const canDo = (capability) => {
        // optional chaining 
        return user?.capabilities?.includes(capability);
    }

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
    console.log('allPets', allPets);

    const token = cookie.load("token");
    console.log('token', token);


    const addPet = async (name, image_link, description, petType, breed,gender) => {

        console.log('userrrr', user);

        let petInfo = {
            userId: user.id,
            petOwnerName: user.username,
            petOwnerEmail: user.email,
            userPhone: user.phone,
            name: name,
            image_link: image_link,
            description: description,
            petType: petType,
            breed: breed,
            gender:gender,
            photoUrl:user.photoUrl
        }
        console.log(petInfo);
        const addPetData = await axios.post(`https://furry-family-backend-production.up.railway.app/api/v2/pets`, petInfo,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        console.log('addCatData', addPetData);
        setallPets([addPetData.data, ...allPets])
        getAllPets();

    }

    const deletePet = async (petID) => {
        let deletPet = await axios.delete(`https://furry-family-backend-production.up.railway.app/api/v2/pets/${petID}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })

        console.log('deletPet', deletPet);
        getAllPets();

    }

    const updatePet = async (petID) => {
        let choosenCat = allPets.find(item => {
            return item.id === petID;
        })
        setselectedPet(choosenCat);
        console.log('choosen cat', choosenCat);
    }
    console.log('selectedPet', selectedPet);

    const updatePetInfo = async (catName, image_link, origin, breed,gender) => {

        let petInputs = {
            name: catName,
            image_link: image_link,
            origin: origin,
            breed: breed,
            gender:gender
        }
        let petID = selectedPet.id;
        let catData = await axios.put(`https://furry-family-backend-production.up.railway.app/api/v2/pets/${petID}`, petInputs,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('catData', catData.data);
        // setallPets([...allPets,catData])
        getAllPets();

    }
    // --------------------------- FOR PET FINDER PAGE -----------------------
    // console.log('--------------before add fav function');
    // const addFavPet = async (petID) => {
    //     let choosenPet = allPets.find(item => {
    //         console.log("item",item);
    //         return item.id === petID;
    //     })
    //     console.log('choosenPet',choosenPet);
    //     await setfavoritePett(choosenPet);
        // console.log('favorite ', favoritePet);
        // console.log('--------------inside add fav function');

        // console.log('userrrr', user.user);
        // let petInfo = {
        //     name: favoritePet.name,
        //     image_link: favoritePet.image_link,
        //     petOwnerName: favoritePet.petOwnerName,
        //     petOwnerEmail: favoritePet.petOwnerEmail,
        //     userPhone: favoritePet.userPhone,
        //     description: favoritePet.description,
        //     petType: favoritePet.petType,
        //     petOwnerId: favoritePet.userId,
        //     breed: favoritePet.breed,

        //     userId: user.id,
        // }
        // console.log(petInfo);
    //     console.log('token context',token);
        
    //     const addPetData = await axios.post(`http://localhost:3001/api/v2/favpets`, petInfo,
    //         {
    //             headers: {
    //                 authorization: `Bearer ${token}`,
    //             },
    //         });

    //     await setallfavoritePet(addPetData.data)
    //     console.log('-------------- from add fav function');
    // }

    // console.log('allfavoritePet', allfavoritePet);

    //  ---------------------------------------------------------------------------
    // const [allFavPets, setallFavPets] = useState([]);
    // useEffect(() => {
    //     axios.get(`http://localhost:3001/api/v2/favpets`,
    //         {
    //             headers: {
    //                 authorization: `Bearer ${token}`,
    //             },
    //         }).then((res) => {
    //             setallFavPets(res.data)
    //         })
    //     console.log('allFavPets', allFavPets);
    // })


    const States = {
        allPets: allPets,
        addPet: addPet,
        deletePet: deletePet,
        updatePet: updatePet,
        updatePetInfo: updatePetInfo,
        selectedPet: selectedPet,
        // addFavPet: addFavPet,
        canDo: canDo,
        isLoggedIn: isLoggedIn,
        // allFavPets:allFavPets,

    }


    return (
        <>
            <PetsDataContext.Provider value={States}>
                {props.children}
            </PetsDataContext.Provider >
        </>

    )

}

