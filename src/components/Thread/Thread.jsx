import React from 'react';
import styles from './thread.module.css';

function Thread({ selectedthread }) {
  return (
    <div className={styles.thread}>
      {selectedthread ? (
        <div className={styles.messages}>
          {/* Display messages for the selected thread */}
        </div>
      ) : (
        <div className={styles.placeholder}>
          Select a thread or create a new thread.
        </div>
      )}
    </div>
  );
}

export default Thread;
