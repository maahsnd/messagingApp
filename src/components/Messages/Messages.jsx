import React, { useState, useEffect } from 'react';
import styles from './Messages.module.css'; // Import CSS Module
import Sidebar from '../Sidebar/Sidebar';
import Thread from '../Thread/Thread';

//messages renders and contains sidebar and thread
function Messages() {
  const [selectedThread, setSelectedThread] = useState(false);
  const [newThreadForm, setNewThreadForm] = useState(false)
  const [contacts, setContacts] = useState(null);
  const dummyThread = ['hey', 'hi', 'hoo'];
  const handleThreadSelect = (thread) => {
    setSelectedThread(thread);
  };
  const handleNewThreadClick = () => {
    setNewThreadForm(true);
  }
  useEffect(()=> {
    const fetchContacts = async() => {
      const token = Cookies.get('jwt_token');
      const response = await fetch(`http://localhost:3000/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
      if (!response.ok) {
        console.error('Error fetching contacts');
      }
      const data = await response.json();
      console.log(data)
      setContacts(data);}
    fetchContacts()
  },[])

  return (
    <div className={styles.messagesContainer}>
      <Sidebar
        onConversationSelect={handleThreadSelect}
        threads={dummyThread}
        handleNewThreadClick={handleNewThreadClick}
        

      />
      <Thread newThreadForm={newThreadForm} newThreadContacts={[{username:'j'}, {username: 'k'}]} selectedThread={selectedThread} />
    </div>
  );
}

export default Messages;
