 import React from 'react';
 import Login from './components/User/Login/Login';
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import Signup from './components/User/Signup/Signup';
 import UserProfile from './components/User/Profile/Profile';
 import HomePage from './components/User/Home/Home';
 import AdminLogin from './components/Admin/Login/Login'
 import AdminHomePage from './components/Admin/Home/Home'
 import ProtectRoutes from '../middleware/ProtectRoutes.jsx';
 import UserProtected from '../middleware/userProtected.jsx';
 import CreateUser from './components/Admin/CreateUser/CreateUser.jsx';
 import EditUser from './components/Admin/EditUser/EditUser.jsx';
 import AdminProtectRoutes from '../middleware/AdminProtectRoutes.jsx';
 import AdminProtect from '../middleware/AdminProtect.jsx';

 const App = () => {
  return (
     <Router>
      <Routes>
        <Route path='/' element={ <ProtectRoutes> <Login/>  </ProtectRoutes>} />
        <Route path='/signup' element={ <ProtectRoutes><Signup/>  </ProtectRoutes>  } />


        <Route path='/home' element={ <UserProtected> <HomePage/> </UserProtected> }/>
        <Route path='/profile' element={  <UserProtected> <UserProfile/>  </UserProtected> }/>
         
        <Route path='/adminLogin' element={ <AdminProtectRoutes> <AdminLogin/>   </AdminProtectRoutes>  }/>
        <Route path='/adminHome' element={   <AdminProtect> <AdminHomePage/>   </AdminProtect>  }/>
        <Route path='/createUser' element={ <AdminProtect>  <CreateUser/>  </AdminProtect>}/>
        <Route path='/editUser' element={<EditUser/>}/>






      </Routes>
     </Router>
  );
 }
 
 export default App;
 