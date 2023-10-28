import React, { useState } from 'react';
import styles from './Messages.module.css'; // Import CSS Module
import Sidebar from '../Sidebar/Sidebar';
import Thread from '../Thread/Thread';

//messages renders and contains sidebar and thread
function Messages() {
  const [selectedThread, setSelectedThread] = useState(null);
  const dummyThread = ['hey', 'hi', 'hoo'];
  const handleThreadSelect = (thread) => {
    setSelectedThread(thread);
  };

  return (
    <div className={styles.messagesContainer}>
      <Sidebar
        onConversationSelect={handleThreadSelect}
        threads={dummyThread}
      />
      <Thread newThread={[{username:'j'}, {username: 'k'}]} />
    </div>
  );
}

export default Messages;
