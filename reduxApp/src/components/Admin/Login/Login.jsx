import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAdminCredentials } from '../../../store/authSlice';

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onSubmit = (e) => {
        e.preventDefault(); 

        let isValid = true;

        if (email.trim() === '') {
            setEmailErrorMessage('Email cannot be empty');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailErrorMessage('Invalid email format');
            isValid = false;
        } else {
            setEmailErrorMessage('');
        }

        if (password.trim() === '') {
            setPasswordErrorMessage('Password cannot be empty');
            isValid = false;
        } else {
            setPasswordErrorMessage('');
        }

        if (isValid) {
            console.log('admin login working');
            axios.post('http://localhost:3000/AdminLogin', { email, password })
                .then((res) => {
                    if (res.data.status) {
                        console.log('isValida')
                        dispatch(setAdminCredentials({ admin: res.data.adminData ,accessToken:res.data.accessToken}))
                        console.log('working')
                        navigate('/adminHome');
                    } else {
                        setEmailErrorMessage('Wrong Email or Password');
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.error('Error Data:', error.response.data);
                        console.error('Error Status:', error.response.status);
                        console.error('Error Headers:', error.response.headers);
    
                        // Handle different error cases
                        if (error.response.data.error === 'email') {
                            setEmailErrorMessage(error.response.data.message);
                        } else if (error.response.data.error === 'password') {
                            setPasswordErrorMessage(error.response.data.message);
                        } else {
                            setEmailErrorMessage('An unexpected error occurred.');
                        }
                    } else {
                        console.error('Error Message:', error.message);
                        setEmailErrorMessage('An unexpected error occurred.');
                    }
                });
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Admin Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            placeholder="Enter your email"
                            autoComplete="email" 
                        />
                        {emailErrorMessage && <p className='errors'>{emailErrorMessage}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                        {passwordErrorMessage && <p className='errors'>{passwordErrorMessage}</p>}
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
