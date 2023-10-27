import React from 'react';
import styles from './thread.module.css';

function Thread({ selectedThread, newThread }) {
  return (
    <div className={styles.thread}>
      {selectedThread && 
        <div className={styles.messages}>
          {/* Display messages for the selected thread */}
        </div>
       }
      {newThread && 
      <div className={styles.threadForm}>
        <form >
          <div className={styles.contactField}>
            <label htmlFor="contactSelect">Select recipient/s</label>
            <select name="contactSelect" id="contactSelect">
              {newThread.map((user) => (
                <option value={user.username} key={user.username}>{user.username}</option>
              ))}
            </select>
          </div>
        </form>
      </div>}
    </div>
  );
}

export default Thread;
