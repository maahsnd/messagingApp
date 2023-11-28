import React from 'react';
import styles from './sidebar.module.css';
import { useParams } from 'react-router-dom';

function Sidebar({ handleNewThreadClick, threads, onThreadClick }) {
  const {username} = useParams()
  return (
    <div className={styles.sidebar}>
      <button className={styles.newThread} onClick={handleNewThreadClick}>
        Create New Thread
      </button>
      {threads.length > 0 && threads.map((thread) => (
        <button
          className={styles.thread}
          key={thread._id}
          onClick={() => onThreadClick(thread)}
        >
          {thread.users.map((user, index) => {
            if (user.username === username) {
              return
            }
            if (index != 0 && thread.users[index-1].username != username) {
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
