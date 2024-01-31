// Message.jsx
import React from 'react';

const styles = {
  active: {
    fontWeight: 600,
    color: '#fff',
  },
  promptMessage: {
    width: '270px',
    backgroundColor: '#5f5e5e1f',
    fontSize: '0.8em',
    borderRadius: '5px',
  },
};

const Message = ({ header, children }) => (
  <div className='prompt-message p-4' style={styles.promptMessage}>
    <h2 style={styles.active}>{header}</h2>
    <p>{children}</p>
  </div>
);

export default Message;
