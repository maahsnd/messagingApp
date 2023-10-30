import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './Messages.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Thread from '../Thread/Thread';

//messages renders and contains sidebar and thread
function Messages() {
  const [selectedThread, setSelectedThread] = useState(false);
  const [newThreadForm, setNewThreadForm] = useState(false);
  const [threads, setThreads] = useState([]);
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
        if (response.ok) {
          setThreads(data);

          return;
        } else {
          // Handle authentication error
          console.error('Authentication failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchThreads();
  }, []);
  const handleThreadSelect = (thread) => {
    setSelectedThread(thread);
    setNewThreadForm(false);
  };
  const handleNewThreadClick = () => {
    setNewThreadForm(true);
    setSelectedThread(false);
  };

  return (
    <div className={styles.messagesContainer}>
      <Sidebar
        onThreadClick={handleThreadSelect}
        threads={threads}
        handleNewThreadClick={handleNewThreadClick}
      />
      <Thread newThreadForm={newThreadForm} selectedThread={selectedThread} />
    </div>
  );
}

export default Messages;
