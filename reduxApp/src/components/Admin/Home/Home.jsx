import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import UserList from "../UserList/UserList";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUsers } from "../../../store/authSlice";

const AdminHome = () => {
    const dispatch=useDispatch()
  const naviagate = useNavigate();
  const { users } = useSelector((state) => state.auth);
  console.log('State data : ',users)
  const [users1, setUsers] = useState([]);
  let userId = 0;

  useEffect(() => {
    axios
      .get("http://localhost:3000/AdminHomeGet")
      .then((res) => {
        console.log("working fetch adminHome");
        if (res.data.status) {
            
          const userData = res.data.userData;

          console.log("usee data is  id is" + userData);
          setUsers(userData);
        }
      })
      .catch((error) => {
        console.log("error occur" + error);
      });
  }, []);

  const handleEditUser = (id) => {
    console.log("edit is working");
    console.log(`Edit user with ID: ${id}`);


    axios.get(`http://localhost:3000/EditGet/${id}`)
    .then((res)=>{
         if(res.data.status){
            console.log('eidt user dadta is '+ res.data.userData)
            dispatch(editUsers(res.data.userData))
            console.log('working dispatch')
            naviagate("/editUser")
         }
    }).catch((error)=>{
        console.log('fetching error'+ error)
    })
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this user? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get(`http://localhost:3000/DeleteUser/${id}`)
          .then((res) => {
            if (res.data.status) {
              console.log("User deleted successfully");
              setUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== id)
              );
              Swal.fire("Deleted!", "The user has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.log("Error deleting user: " + error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The user was not deleted.", "error");
      }
    });
  };

  const handleCreateUser = () => {
    naviagate("/CreateUser");
    console.log("Create a new user");
  };

  return (
    <div className="homepage-container1 d-flex flex-column vh-100 backgroud-colour-yellow">
      <Navbar />
      <UserList
        users={users.length > 0 ? users : users1}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onCreate={handleCreateUser}
      />
    </div>
  );
};

export default AdminHome;
