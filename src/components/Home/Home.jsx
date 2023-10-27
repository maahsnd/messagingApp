import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './home.module.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Messages from '../Messages/Messages';

function Home() {
  const [authToken, setAuthToken] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      setAuthToken(token);
    }
    return;
  }, []);

  if (authToken)
    return (
      <>
        <Link to={`/${username}/edit`}>{username}</Link>
        <Messages />
      </>
    );
  else {
    return (
      <div>
        <Link to="/log-in">Log in</Link>
        <p>or</p>
        <Link to="/sign-up">Sign up</Link>
      </div>
    );
  }
}
export default Home;
