import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './home.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Messages from '../Messages/Messages';

function Home() {
  const [authToken, setAuthToken] = useState(null);
  const [guest, setGuest] = useState(null)
  const navigate = useNavigate();
  const guestUser = async (e) => {
    e.preventDefault()
    try {
      const username = 'guest-user'
      const response = await fetch('http://localhost:3000/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password: 'guest%User1' })
      });
      const data = await response.json();
      if (response.ok) {
        // Store the JWT token in cookies
        Cookies.set('jwt_token', data.token);
        Cookies.set('user_id', data.userId);
        setGuest(true)
        navigate('/' + username);
        return;
      } else {
        // Handle authentication error
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      setAuthToken(token);
      setGuest(null)
    }
    return;
  }, [guest]);

  if (authToken)
    return (
      <>
        <Messages setAuthToken={setAuthToken} />
      </>
    );
  else {
    return (
      <div className={styles.homeContainer}> 
      <h1>MiMessage</h1>
        <Link to="/log-in" className={styles.btn}>Log in</Link>
        <Link to="/sign-up" className={styles.btn}>Sign up</Link>
        <Link to="/guest-user" className={styles.btn} onClick={guestUser}>Guest user</Link>
      </div>
    );
  }
}
export default Home;
