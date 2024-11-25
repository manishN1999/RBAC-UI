import React, { useState } from "react";

const Modal = ({ onClose, onSave, user, roles }) => {
  const [formData, setFormData] = useState(
    user || { name: "", role: roles[0], status: "Active" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData); // Pass the form data back to the parent component
      onClose(); // Close the modal after saving
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{user ? "Edit User" : "Add User"}</h3>
        <input
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button className="save" onClick={handleSave}>
          Save
        </button>
        <button className="cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
