import React from 'react';
import styles from './sidebar.module.css';

function Sidebar({ handleNewThreadClick, threads, onThreadClick }) {
  return (
    <div className={styles.sidebar}>
      <button onClick={handleNewThreadClick}>Create New Thread</button>
      {threads.map((thread) => (
        <button key={thread.id} onClick={() => onThreadClick(thread)}>
          {thread.users.map((user, index) => {
            if (index != 0) {
              return ', ' + user.username;
            }
            return `${user.username}`;
          })}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
