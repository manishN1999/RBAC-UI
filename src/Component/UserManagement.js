import React, { useState } from "react";
import Modal from "./Modal";
import './usermanagement.css'; // Import updated CSS

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Manish", role: "Admin" },
    { id: 2, name: "Brijendra", role: "Editor" },
  ]);

  const [roles] = useState(["Admin", "Editor", "Viewer"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = (user) => {
    setUsers([...users, { ...user, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const handleEditUser = (user) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="user-management-card">
      <h2>User Management</h2>
      <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
        + Add User
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="secondary-btn"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="danger-btn"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          onSave={selectedUser ? handleEditUser : handleAddUser}
          user={selectedUser}
          roles={roles}
        />
      )}
    </div>
  );
};

export default UserManagement;
