import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import your custom CSS
import axios from 'axios';
import { removeAdminCredential, updateUsers } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';


const Navbar = ({ showLogout = true }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    console.log('search')
    setSearchQuery(e.target.value);
    console.log(searchQuery)
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    axios.get(`http://localhost:3000/SearchUser/${searchQuery}`)
    .then((res)=>{
      console.log('seache working fetch')
        if(res.data.status){
          console.log('result is '+ res.data.result)
          
          dispatch(updateUsers(res.data.result))  
        }else{
          console.log('user not found')
          dispatch(updateUsers([]))

        }
     
    }).catch((error)=>{
      console.log('error showwww'+error)
    })
  };

  const onLogout = () => {
    dispatch(removeAdminCredential())

    navigate('/adminLogin');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand">
        <Link to="/">AdminPanel</Link>
      </div>

      <div className="admin-navbar-search">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="admin-search-input"
          />
          <button type="submit" className="admin-search-btn">Search</button>
        </form>
      </div>

      {showLogout && (
        <div className="admin-nav-item">
          <button onClick={onLogout} className="admin-btn btn-link nav-link">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
