import React, {useState, useEffect} from 'react';
import styles from './thread.module.css';
import Cookies from 'js-cookie';

function Thread({  newThreadForm, selectedThread }) {
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState('')
  const [contacts, setContacts] = useState([]);

  useEffect(()=> {
    const fetchContacts = async() => {
      const token = Cookies.get('jwt_token');
      const response = await fetch(`http://localhost:3000/users/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
      if (!response.ok) {
        console.error('Error fetching contacts');
      }
      const data = await response.json();
      setContacts(data);}
    fetchContacts()
  },[])

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
              {contacts.map((user) => (
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
