import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './user.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function User() {
  const [user, setUser] = useState({ username: '' });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    async function getUser() {
      const response = await fetch(`https://messagingapi-production.up.railway.app/users/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
      if (!response.ok) {
        console.error('Error fetching user');
      }
      const data = await response.json();
      setUser(data);
    }
    getUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('jwt_token');

    try {
      const response = await fetch('https://messagingapi-production.up.railway.app/users/' + username, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      if (response.ok) {
        //navigate to new username page
        navigate('/' + data.username + '/edit');
        return;
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Edit username</label>

          <input
            type="text"
            name="username"
            id="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit"> Submit</button>
      </form>
      {errors && (
        <div>
          {errors.map((error) => (
            <h4 key={error.path}>{error.msg}</h4>
          ))}
        </div>
      )}
    </div>
  );
}
export default User;
