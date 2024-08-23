import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css'; // Updated CSS file name
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SwalComponent from '../../../../SweetAlert/SwalComponent';
import { removeUserCredential, setUserCredential ,updateUserCredential} from '../../../store/authSlice';

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.auth.userInfo);
    
    const username = user.username;
    const phone=user.phoneNumber
    const userId = user._id;
    console.log('userId ' + userId);

    const token = localStorage.getItem('accesstoken');
    const accessToken = token ? JSON.parse(token) : null;

    const [profileImage, setProfileImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState(username); // New state for name
    const [phoneNumber, setPhoneNumber] = useState(phone);

    useEffect(() => {
        console.log("Fetching user data...");
        console.log(accessToken);
        axios.post('http://localhost:3000/UserProfilePic', { userId }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${accessToken}`,
            },
        })
        .then((res) => {
            if (res.data.status) {
                console.log('Data fetched successfully');
                const userData = res.data.userData;
                if (userData && userData.length > 0) {
                    const Url = userData[0].image.url;
                    console.log('Image URL:', Url);
                    setImageUrl(Url);
                }
            }
        }).catch((error) => {
            console.log('Error fetching data', error);
        });
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting changes');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('username', name);
        formData.append('phoneNumber', phoneNumber);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }
        axios.post(`http://localhost:3000/UserProfile/${user._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            console.log('Profile updated successfully');

            if(res.data.status){
                 const userData = res.data.user
                 console.log('user Data is')
                 console.log(userData)
                 console.log('user name s '+ userData.username)
                 setName(userData.username)
                 setPhoneNumber(userData.phoneNumber)
                 dispatch(updateUserCredential({user: res.data.user}))
                    // dispatch(setUserCredential({ user: res.data.user, accessToken: res.data.accessToken }));
                 console.log('value is updated successfully')
                 SwalComponent({
                    title: 'Success!',
                    text: 'Your profile has been updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        }).catch((error) => {
            console.log('Error updating profile', error);
        });
    };

    const logout = () => {
        console.log('Logging out');
        dispatch(removeUserCredential());
        navigate('/');
    };

    return (
        <div className="homepage-container d-flex flex-column justify-content-center  align-items-center vh-100">
            <nav className="userprofile-navbar">
                <div className="userprofile-right-nav">
                    <Link to="/home" className="userprofile-nav-link">Home</Link>
                    <button onClick={logout} className="userprofile-logout-button">Logout</button>
                </div>
            </nav>
            <div className="userprofile-main-container">
                <h1 className="userprofile-heading">User Profile</h1>
                <div className="userprofile-profile-container">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Profile" className="userprofile-profile-picture" />
                    ) : (
                        <div className="userprofile-placeholder">No Image</div>
                    )}
                    <input type="file" onChange={handleImageChange} className="userprofile-file-input" />
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Edit Name"
                        className="userprofile-input-field"
                    />
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="Edit Phone Number"
                        className="userprofile-input-field"
                    />
                     
                    <button onClick={onSubmit} className="userprofile-edit-button">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
