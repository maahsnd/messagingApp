import React, { useState } from 'react';
import Cookies from 'js-cookie';
import styles from './sign-up.module.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        // Store the JWT token in cookies
        Cookies.set('jwt_token', data.token);
        navigate('/');
        return;
      } else {
        setErrors(data.errors);
        // Handle authentication error
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.signUpForm}>
      <h2>Sign Up</h2>
      {errors && (
        <div>
          {errors.map((error) => (
            <h4 key={error.path}>{error.msg}</h4>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            value={formData.confirm_password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
