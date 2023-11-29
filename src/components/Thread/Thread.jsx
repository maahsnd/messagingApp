import React, { useState, useEffect } from 'react';
import styles from './thread.module.css';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Tooltip } from '@mui/material';
import '@emotion/styled';

function Thread({ newThreadForm, selectedThread, handleThreadSelect, setUpdateThreads }) {
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  const { username } = useParams();
  const userId = Cookies.get('user_id');
  //fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
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
      setContacts(data);
    };
    fetchContacts();
  }, []);

  //submit new thread & message
  const submitNewThread = async (e) => {
    e.preventDefault();
    const token = Cookies.get('jwt_token');

    const recipientIds = recipients.map(
      (recipient) => (recipient = recipient._id)
    );
    const body = {
      text: message,
      from: userId,
      to: recipientIds
    };
    const response = await fetch(
      `http://localhost:3000/users/${username}/threads`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(body)
      }
    );
    if (!response.ok) {
      console.error('Error sending new message');
    }
    const data = await response.json();
    setUpdateThreads(true)
    setMessage('')
  };

  const newMessage = async (e) => {
    e.preventDefault();
    const token = Cookies.get('jwt_token');
    const userId = Cookies.get('user_id');
    const body = {
      text: message,
      from: userId,
      to: selectedThread.users,
      thread: selectedThread._id
    };
    const response = await fetch(
      `http://localhost:3000/users/${username}/threads/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(body)
      }
    );
    if (!response.ok) {
      console.error('Error sending new message');
    }
    const data = await response.json();
    setUpdateThreads(true)
    setMessage('');
    handleThreadSelect(data);
  };

  const selectRecipient = (e) => {
    const selectedRecipient = contacts.find(
      (contact) => contact.username === e.target.value
    );
    if (!recipients.includes(selectedRecipient)) {
      setRecipients([...recipients, selectedRecipient]);
    }
    setTimeout(()=> {e.target.selectedIndex = 0}, 500)
   
  };
  const messageChange = (e) => {
    setMessage(e.target.value);
  };
  const removeRecipient = (e) => {
    const filtered = recipients.filter(
      (recipient) => recipient.username != e.target.value
    );
    setRecipients(filtered);
  };

  return (
    <div className={styles.threadContainer}>
      {selectedThread && (
        <div className={styles.thread}>
          {selectedThread.messages.map((message) => (
            <Tooltip
              title={dayjs(message.timestamp).format('MM-DD-YY HH:mm a')}
              placement='left'
              key={message._id}
            >
              <div className={styles.messageWrap} >
                {/* show user icon in group convos for recieved messages */}
                {selectedThread.users.length > 2 &&
                  message.from._id !== userId && (
                    <div className={styles.senderIcon}>
                      {message.from.username.slice(0, 1)}
                    </div>
                  )}
                <div
                  className={
                    message.from.username === username
                      ? styles.sentMsg
                      : styles.receivedMsg
                  }
                  value={message}
                >
                  <p className={styles.msgTxt}>{message.text}</p>
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      )}
      {selectedThread && (
        <form onSubmit={newMessage} className={styles.newMsgContainer}>
          <textarea
            className={styles.newMsg}
            value={message}
            onChange={messageChange}
            name="messageText"
            id="messageText"
            cols="30"
            rows="10"
          ></textarea>
          <div>
            <button className={styles.newMsgButton} type="submit">
              Send
            </button>
          </div>
        </form>
      )}
      {/* NEW THREAD*/}
      {newThreadForm && (
        <div className={styles.threadForm}>
        
          <form onSubmit={submitNewThread}>
        
            <div className={styles.contactField}>
            <h4 className={styles.newThreadTitle}>To:</h4>
              <select
              className={styles.contactSelect}
                name="contactSelect"
                id="contactSelect"
                onChange={(e)=> selectRecipient(e)}
              >
                <option default >
                  Select a recipient
                </option>
                {contacts.map((user) => (user.username !== username &&
                  <option value={user.username} key={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
              <div className={styles.recipientsContainer}>
             
             {recipients.map((recipient) => (
               <div className={styles.recipient} key={recipient.username}>
                 <p className={styles.recipientName}>{recipient.username}</p>
                 <button className={styles.removeRecipient} value={recipient.username} onClick={removeRecipient}>
                   X
                 </button>
               </div>
             ))}
           </div>
            </div>
       
            <div className={styles.messageField}>
              <textarea
              className={styles.messageText}
                value={message}
                onChange={messageChange}
                name="messageText"
                id="messageText"
                cols="30"
                rows="10"
              ></textarea>
               <button className={styles.submitButton} type="submit">Send</button>
            </div>
             
          </form>
        </div>
      )}
    </div>
  );
}

export default Thread;
