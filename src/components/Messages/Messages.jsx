import React, { useState } from 'react';
import styles from './Messages.module.css'; // Import CSS Module
import Sidebar from '../Sidebar/Sidebar';
import Thread from '../Thread/Thread';

//messages renders and contains sidebar and thread
function Messages() {
  const [selectedThread, setSelectedThread] = useState(false);
  const [newThreadForm, setNewThreadForm] = useState(false)
  const dummyThread = ['hey', 'hi', 'hoo'];
  const handleThreadSelect = (thread) => {
    setSelectedThread(thread);
  };
  const handleNewThreadClick = () => {
    setNewThreadForm(true);
  }

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
