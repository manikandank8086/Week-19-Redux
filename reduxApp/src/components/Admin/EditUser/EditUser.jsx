import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import './EditUser.css';
import { useSelector } from 'react-redux';

const CreateUser = () => {

     const {ediUser}= useSelector((state)=>state.auth)
     console.log("user is /createUser "+ediUser)
     const userId=ediUser._id
     console.log('useeId '+ userId)

  
     console.log('edi page location'+ ediUser.username)

     const [username,setUsername]=useState(ediUser.username ||'')
     const [email,setEmail]=useState(ediUser.email ||'' )
     const [phone,setPhone]=useState(ediUser.phoneNumber || '')

    const [errorMessages, setErrorMessages] = useState({});
    const [formTouched, setFormTouched] = useState(false);

    const validateName = (username) => /^[A-Za-z\s]{3,}$/.test(username);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s]{3,10}$/.test(phone);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormTouched(true);
        setErrorMessages({});

        let errors = {};

        // Validate Username
        if (!username.trim()) {
            errors.username = 'Username cannot be empty';
        } else if (!validateName(username)) {
            errors.username = 'Please enter a valid username';
        }

        // Validate Email
        if (!email.trim()) {
            errors.email = 'Email cannot be empty';
        } else if (!validateEmail(email)) {
            errors.email = 'Please enter a valid email';
        }

        // Validate Phone
        if (!phone.trim()) {
            errors.phone = 'Phone number cannot be empty';
        } else if (!validatePhone(phone)) {
            errors.phone = 'Incorrect Phone Number format';
        }


        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            return;
        }

        // Proceed with form submission
        Swal.fire({
            title: 'Are you sure?',
            text: "You want Edit this User!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Edited!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('working fetch ')
                axios.post(`http://localhost:3000/EditUpdate/${userId}`, {username,email,phone})
                    .then((res) => {
                        if (res.data.status) {
                            Swal.fire('Edited!', 'User has been edited.', 'success');
                          
                        }else if(res.status===409) {
                            console.log('useer cannot updated')
                            setErrorMessages(res.data.message)
                        }else {
                            console.log('User could not be edited');
                            setErrorMessages('An error occurred while creating the user');
                        }
                    }).catch((error) => {
                        console.error('Error:', error);
                    });
            }
        });
    };


    console.log('username'+ username)

    return (
        <div>
            <Navbar />
            <div className="admin-create-user-container">
                <h2>Edit User</h2>
                <form className="admin-create-user-form" onSubmit={handleSubmit}>
                    <div className="admin-form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        {errorMessages.username && <p className="text-danger">{errorMessages.username}</p>}
                    </div>
                    <div className="admin-form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        {errorMessages.email && <p className="text-danger">{errorMessages.email}</p>}
                    </div>
                    <div className="admin-form-group">
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                        />
                        {errorMessages.phone && <p className="text-danger">{errorMessages.phone}</p>}
                    </div>
                    <button type="submit" className="admin-submit-btn"> Update </button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
