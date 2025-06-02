import React from 'react';

function LoginPage() {
  return (
    <div className="form-container">
      <h2>Login to CLOPICK</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </div>
  );
}

export default LoginPage;
