import React from "react";

const Unauthorized: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>403 - Unauthorized</h2>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default Unauthorized;