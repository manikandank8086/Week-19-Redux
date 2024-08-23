import React from "react";
import "./UserList.css";

const UserList = ({ users, onEdit, onDelete, onCreate }) => {
  console.log("user is ", users);

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <button className="create-user-btn" onClick={onCreate}>
        Create User
      </button>
      {users && users.length > 0 ? (
        <table className="user-list-table">
          <thead>
            <tr>
              <th>Profile Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={
                      user?.image?.url
                        ? user.image.url
                        : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                    }
                    alt={`${user.username}'s profile`}
                    className="user-profile-image"
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: "#9c790e",
                      padding: "8px",
                      borderRadius: "7px",
                      marginRight: "5px",
                    }}
                    onClick={() => onEdit(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      backgroundColor: "#8a333d",
                      padding: "8px",
                      borderRadius: "7px",
                    }}
                    onClick={() => onDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No users</h3> // Show this message if no users are found
      )}
    </div>
  );
};

export default UserList;
