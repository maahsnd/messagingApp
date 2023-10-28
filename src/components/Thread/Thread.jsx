import React, {useState} from 'react';
import styles from './thread.module.css';

function Thread({ newThreadContacts, newThreadForm, selectedThread }) {
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState(null)
  const selectRecipient = (e) => {
    e.preventDefault()
    setRecipients([...recipients, e.target.value])
  } 
  const messageChange = () => {
    setMessage(e.target.value)
  }
  const removeRecipient = (e) => {
    const filtered = recipients.filter((recipient) => recipient != e.target.value);
    setRecipients(filtered);
  }
  return (
    /* SELECTED THREAD*/
    <div className={styles.thread}>
      {selectedThread && 
        <div className={styles.messages}>
          {/* Display messages for the selected thread */}
        </div>
       }
    {/* NEW THREAD*/}
      {newThreadForm && 
      <div className={styles.threadForm}>
        <form >
          <div className={styles.contactField}>
            <label htmlFor="contactSelect">Select recipient/s</label>
            <select name="contactSelect" id="contactSelect" onChange={selectRecipient}>
              {newThreadContacts.map((user) => (
                <option value={user.username} key={user.username}>{user.username}</option>
              ))}
            </select>
          </div>
          <div className={styles.recipientsContainer}>
            <h4>Recipients:</h4>
                {recipients.map((recipient) => (
                  <div className={styles.recipient} key={recipient}>
                    <p>{recipient}</p>
                    <button value={recipient} onClick={removeRecipient}>x</button>
                    </div>
                ))}
          </div>
          <div className={styles.messageField}>
            <textarea value={message} onChange={messageChange} name="messageText" id="messageText" cols="30" rows="10"></textarea>
          </div>
          <div className={styles.submitButton}>
                  <button>Send</button>
          </div>
        </form>
      </div>}
    </div>
  );
}

export default Thread;
