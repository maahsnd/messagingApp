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
            //display ellipse in place of 4th user
            if (index === 3) {
              return ' & ...'
            }
            //do not display beyond ellipse
            if (index > 3) {
              return
            }
            //do not display users own name
            if (user.username === username) {
              return
            }
            //add preceding comma if not users own name or first name
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
