import React from 'react';

function RegisterPage() {
  return (
    <div className="form-container">
      <h2>Register on CLOPICK</h2>
      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email" />
      <input type="tel" placeholder="Mobile" />
      <input type="text" placeholder="City" />
      <input type="text" placeholder="State" />
      <button>Register</button>
    </div>
  );
}

export default RegisterPage;
