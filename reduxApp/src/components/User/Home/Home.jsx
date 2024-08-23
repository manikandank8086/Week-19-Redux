import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserCredential } from '../../../store/authSlice';
import axios from 'axios';

import './Home.css'; // Updated CSS file name

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((store) => store.auth.userInfo);
    const userId =user._id
    const [profileImage,setProfileImage] = useState("https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg") 


    // useEffect(()=>{
         console.log('working useEffect Home')
         axios.post('http://localhost:3000/HomeProfileFetch', { userId }, {
            headers:{
                'Content-Type':'application/json',
            },
        }).then((res)=>{
             if(res.data.status){
                console.log('Data fetched successfully hOme');
                const userData = res.data.userData;
                console.log("userData is conso"+userData)
                if (userData?.image?.url) {
                    setProfileImage(userData.image.url)
                    // profileImage = userData[0].image.url;
                    console.log('sucessfull:', profileImage);
                    
                }
            
             }
        })

    // },[])

    
    const userName= user.username
    const logout = () => {
        console.log('working logout');
        dispatch(removeUserCredential());
        navigate('/');
    };

    return (
        <div className="homepage-container d-flex flex-column justify-content-center align-items-center vh-100">
            <nav className="homepage-navbar navbar navbar-expand-lg navbar-light bg-warning fixed-top">
                <div className="container-fluid">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">
                                <img src={profileImage} alt={userName} className="rounded-circle homepage-profile-image" />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={logout} className="btn btn-link nav-link">Logout</button>
                        </li>
                        
                    </ul>
                </div>
            </nav>
            <h1 className="homepage-heading mt-5 pt-5">Welcome {userName}</h1>
            <Link to="/profile" className="btn btn-primary mt-3">Go to User Profile</Link>
        </div>
    );
};

export default HomePage;
