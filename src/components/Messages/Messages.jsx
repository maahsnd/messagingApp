import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './Messages.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Thread from '../Thread/Thread';
import { Link, useParams, useNavigate } from 'react-router-dom';

//messages renders and contains sidebar and thread
function Messages(props) {
  const [selectedThread, setSelectedThread] = useState(false);
  const [newThreadForm, setNewThreadForm] = useState(false);
  const [threads, setThreads] = useState([]);
  const [updateThreads, setUpdateThreads] = useState(false)
  const { username } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const token = Cookies.get('jwt_token');
        const user_id = Cookies.get('user_id');
        const response = await fetch(
          `http://localhost:3000/users/${user_id}/threads`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
            }
          }
        );
        if (!response.ok) {
          console.error('Error fetching threads');
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          console.error(data.msg);
        }
        if (response.ok) {
          setThreads(data);
          return;
        } else {
          Cookies.remove('jwt_token', { path: '' });
          // Handle authentication error
          console.error('Authentication failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchThreads();
    setUpdateThreads(false)
  }, [updateThreads]);
  const handleThreadSelect = (thread) => {
    setSelectedThread(thread);
    newThreadForm && setNewThreadForm(false);
  };
  const handleNewThreadClick = () => {
    setNewThreadForm(true);
    setSelectedThread(false);
  };
  const logOut = () => {
    Cookies.remove('jwt_token', { path: '' });
    props.setAuthToken();
    navigate('/');
  };
  return (
    <div className={styles.frame}>
          <div className={styles.messagesContainer}>
      <header>
        <button className={styles.dashBtn}>
          {' '}
          <Link className={styles.dashLink} to={`/${username}/edit`}>Settings</Link>
        </button>
        <button className={styles.dashBtn} onClick={logOut}>
          Log Out
        </button>
      </header>
      <div className={styles.content}>
        <Sidebar
          onThreadClick={handleThreadSelect}
          threads={threads}
          handleNewThreadClick={handleNewThreadClick}
          selectedThread={selectedThread}
          newThreadForm={newThreadForm}
        />
        <Thread
          handleThreadSelect={handleThreadSelect}
          newThreadForm={newThreadForm}
          selectedThread={selectedThread}
          setUpdateThreads={setUpdateThreads}
        />
      </div>
    </div>
    </div>

  );
}

export default Messages;
