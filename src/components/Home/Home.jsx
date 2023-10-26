import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './home.module.css';
import { Link } from 'react-router-dom';
import User from '../User/User';
import { useParams } from 'react-router-dom';

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

  if (authToken) return <User username={username} />;
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
