import React, { useState } from 'react';
import './login.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserCredential } from '../../../store/authSlice';

const Login = () => {
    const  dispatch=useDispatch()
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Email validation
        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        // Password validation
        if (!password.trim()) {
            setErrorMessage('Password cannot be empty .');
            return;
        }

     

        axios.post('http://localhost:3000/UserLogin', { email, password })
            .then((res) => {
                if (res.data.status) {
                    console.log(res.data)
                    console.log('Login successful');

                    dispatch(setUserCredential({ user: res.data.user ,accessToken:res.data.accessToken}));
                    navigate('/home');
                } else {
                    console.log('User not valid');
                    setErrorMessage('Invalid email or password.');
                }
            })
            .catch((error) => {
                console.log('Login error:', error);
                setErrorMessage('Password not match');
            });
    };

    return (
        <div className="container">
            <div className="card">
                <h3 className="text-center">Login</h3>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
