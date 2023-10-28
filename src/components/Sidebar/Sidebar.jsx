import React from 'react';
import styles from './sidebar.module.css';

function Sidebar({ onNewThreadClick, threads, onThreadClick }) {
  return (
    <div className={styles.sidebar}>
      <button onClick={onNewThreadClick}>Create New Thread</button>
      {threads.map((thread) => (
        <button
          key={thread.id}
          onClick={() => onThreadClick(thread)}
        >
          {thread.name}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
