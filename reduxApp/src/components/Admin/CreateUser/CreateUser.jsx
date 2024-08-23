import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import './CreateUser.css';

const CreateUser = () => {
     const [username,setUsername]=useState('')
     const [email,setEmail]=useState('')
     const [phone,setPhone]=useState('')
     const [password,setPassword]=useState('')

    const [errorMessages, setErrorMessages] = useState({});
    const [formTouched, setFormTouched] = useState(false);

    const validateName = (username) => /^[A-Za-z\s]{3,}$/.test(username);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
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

        // Validate Password
        if (!password.trim()) {
            errors.password = 'Password cannot be empty';
        } else if (!validatePassword(password)) {
            errors.password = 'Password must be at least 6 characters long and include both letters and numbers';
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            return;
        }

        // Proceed with form submission
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('working fetch ')
                axios.post('http://localhost:3000/CreateUser', {username,email,phone,password})
                    .then((res) => {
                        if (res.data.status) {
                            Swal.fire('Created!', 'User has been created.', 'success');

                            setUsername('')
                            setEmail('')
                            setPhone('')
                            setPassword('')
                          
                        }else if(res.status===409) {
                            console.log('useer cannot updated')
                            setErrorMessages(res.data.message)
                        }else {
                            console.log('User could not be created');
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
                <h2>Create New User</h2>
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
                    <div className="admin-form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        {errorMessages.password && <p className="text-danger">{errorMessages.password}</p>}
                    </div>
                    <button type="submit" className="admin-submit-btn">Create User</button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
