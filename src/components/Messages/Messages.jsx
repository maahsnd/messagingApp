import React, { useState } from 'react';
import styles from './Messages.module.css'; // Import CSS Module
import Sidebar from '../Sidebar/Sidebar';
import Thread from '../Thread/Thread';

//messages renders and contains sidebar and thread
function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const conversations = ['hey', 'hi', 'hoo'];
  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className={styles.messagesContainer}>
      <Sidebar
        onConversationSelect={handleConversationSelect}
        conversations={conversations}
      />
      <Thread newThread={[{username:'j'}, {username: 'k'}]} />
    </div>
  );
}

export default Messages;
