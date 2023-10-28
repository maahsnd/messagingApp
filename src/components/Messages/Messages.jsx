import React, { useState, useEffect } from 'react';
import styles from './Messages.module.css'; 
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
      <Thread newThreadForm={newThreadForm}  selectedThread={selectedThread} />
    </div>
  );
}

export default Messages;
