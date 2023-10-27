import React from 'react';
import styles from './sidebar.module.css';

function Sidebar({ onNewThreadClick, conversations, onConversationClick }) {
  return (
    <div className={styles.sidebar}>
      <button onClick={onNewThreadClick}>Create New Thread</button>
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onConversationClick(conversation)}
        >
          {conversation.name}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
