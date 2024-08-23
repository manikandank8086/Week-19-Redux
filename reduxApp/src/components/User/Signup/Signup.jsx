import React, { useState } from 'react';
import './signup.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserCredential } from '../../../store/authSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessages, setErrorMessages] = useState({});
    const [formTouched, setFormTouched] = useState(false);

    const validateName = (name) => /^[A-Za-z\s]{3,}$/.test(name);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
    const validatePhoneNumber = (phoneNumber) => /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s]{3,10}$/.test(phoneNumber);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormTouched(true);
        setErrorMessages({});

        let errors = {};

        // Validate Name
        if (!name.trim()) {
            errors.name = 'Name cannot be empty ';
        } else if (!validateName(name)) {
            errors.name = 'Please enter a valid name';
        }

        // Validate Email
        if (!email.trim()) {
            errors.email = 'Email cannot be empty ';
        } else if (!validateEmail(email)) {
            errors.email = 'Please enter a valid email ';
        }

        // Validate Password
        if (!password.trim()) {
            errors.password = 'Password cannot be empty ';
        } else if (!validatePassword(password)) {
            errors.password = 'Password must be at least 6 characters long and include both letters and numbers';
        }

        // Validate Phone Number
        if (!phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number cannot be empty';
        } else if (!validatePhoneNumber(phoneNumber)) {
            errors.phoneNumber = 'Incorrect Phone Number format';
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            return;
        }

        // Proceed with form submission
        axios.post('http://localhost:3000/UserRegister', { name, email, password, phoneNumber })
            .then((res) => {
                alert(res.data.status);
                if (res.data.status) {
                    dispatch(setUserCredential({ user: res.data.user, accessToken: res.data.accessToken }));
                    navigate('/home');
                } else {
                    setErrorMessages({ general: 'User registration failed.' });
                }
            })
            .catch((error) => {
                setErrorMessages({ general: 'User already exist' });
                console.error(error);
            });
    };

    return (
        <div className="container">
            <div className="card">
                <h3 className="text-center">Sign Up</h3>
                {errorMessages.general && <p className="text-danger text-center">{errorMessages.general}</p>}
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (formTouched) {
                                    setErrorMessages((prev) => ({ ...prev, name: '' }));
                                }
                            }}
                            className="form-control" 
                            id="username" 
                            placeholder="Enter your username" 
                        />
                        {errorMessages.name && <p className="text-danger">{errorMessages.name}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (formTouched) {
                                    setErrorMessages((prev) => ({ ...prev, email: '' }));
                                }
                            }}
                            className="form-control" 
                            id="email" 
                            placeholder="Enter your email" 
                        />
                        {errorMessages.email && <p className="text-danger">{errorMessages.email}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (formTouched) {
                                    setErrorMessages((prev) => ({ ...prev, password: '' }));
                                }
                            }}
                            className="form-control" 
                            id="password" 
                            placeholder="Enter your password" 
                        />
                        {errorMessages.password && <p className="text-danger">{errorMessages.password}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input 
                            type="tel" 
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                if (formTouched) {
                                    setErrorMessages((prev) => ({ ...prev, phoneNumber: '' }));
                                }
                            }}
                            className="form-control" 
                            id="phoneNumber" 
                            placeholder="Enter your phone number" 
                        />
                        {errorMessages.phoneNumber && <p className="text-danger">{errorMessages.phoneNumber}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Sign Up
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
