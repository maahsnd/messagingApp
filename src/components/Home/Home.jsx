import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './home.module.css';
import { Link } from 'react-router-dom';

function Home() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      setAuthToken(token);
    }
    return;
  }, []);

  if (authToken)
    return (
      <div>
        <p>messages</p>
      </div>
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
