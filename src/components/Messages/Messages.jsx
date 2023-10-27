import React, { useState } from 'react';
import styles from './Messages.module.css'; // Import CSS Module
import Sidebar from '../Sidebar/Sidebar';
import Thread from '../Thread/Thread';

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
      <Thread selectedConversation={selectedConversation} />
    </div>
  );
}

export default Messages;