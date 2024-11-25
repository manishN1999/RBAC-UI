import React, { useState } from "react";
import "./Dashboard.css";
import { FaUsers, FaUserShield, FaCog } from "react-icons/fa";
import Modal from "./Modal";

const Dashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Vishal", role: "Admin", status: "Active" },
    { id: 2, name: "Vivan", role: "Editor", status: "Inactive" },
    { id: 3, name: "Shiv", role: "Viewer", status: "Active" },
  ]);

  const [roles] = useState(["Admin", "Editor", "Viewer"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = (user) => {
    setUsers([...users, { ...user, id: Date.now() }]);
  };

  const handleEditUser = (user) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const openModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Role Based Access Control</h1>

      <div className="nav-bar">
        <button className="nav-btn">Manage Users</button>
        <button className="nav-btn">Manage Roles</button>
        <button className="nav-btn">Settings</button>
      </div>

      <div className="content">
        <div className="card">
          <FaUsers size={40} className="card-icon" />
          <h2>{users.length} Users</h2>
          <p>Manage user accounts and roles</p>
        </div>

        <div className="card">
          <FaUserShield size={40} className="card-icon" />
          <h2>{roles.length} Roles</h2>
          <p>Define and assign roles with permissions</p>
        </div>

        <div className="card">
          <FaCog size={40} className="card-icon" />
          <h2>Settings</h2>
          <p>Configure system preferences and security</p>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h2>User Management</h2>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button className="add-btn" onClick={() => openModal()}>
            + Add User
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => openModal(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="no-results">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onSave={selectedUser ? handleEditUser : handleAddUser}
          user={selectedUser}
          roles={roles}
        />
      )}
    </div>
  );
};

export default Dashboard;
