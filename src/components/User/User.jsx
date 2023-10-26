import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './user.module.css';

function User(props) {
  const [user, setUser] = useState({});
  const { username } = props;
  useEffect(() => {
    const token = Cookies.get('jwt_token');
    async function getUser() {
      const response = await fetch(`http://localhost:3000/users/${username}`, {
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

  return (
    <div>
      <p>user</p>
      <p>{user.username}</p>
    </div>
  );
}
export default User;
