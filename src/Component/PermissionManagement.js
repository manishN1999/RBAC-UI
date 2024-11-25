import React from "react";

const PermissionManagement = () => {
  const permissions = ["Read", "Write", "Delete"];

  return (
    <div className="card">
      <h2>Permission Management</h2>
      <ul className="list">
        {permissions.map((permission, index) => (
          <li key={index} className="list-item">
            {permission}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionManagement;
