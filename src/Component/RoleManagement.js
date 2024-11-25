import React, { useState } from "react";

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  ]);

  const [newRole, setNewRole] = useState("");

  const handleAddRole = () => {
    if (newRole.trim()) {
      setRoles([...roles, { id: Date.now(), name: newRole, permissions: [] }]);
      setNewRole("");
    }
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="card">
      <h2>Role Management</h2>
      <input
        type="text"
        placeholder="Enter new role"
        className="input-field"
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
      />
      <button className="primary-btn" onClick={handleAddRole}>
        + Add Role
      </button>
      <ul className="list">
        {roles.map((role) => (
          <li key={role.id} className="list-item">
            {role.name}
            <button
              className="danger-btn"
              onClick={() => handleDeleteRole(role.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
