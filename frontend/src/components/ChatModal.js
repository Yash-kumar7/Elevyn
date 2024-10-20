import React, { useState, useEffect } from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person'; // User icon
import AndroidIcon from '@mui/icons-material/Android'; // Bot icon

function ChatModal({ onClose }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false); // State to track if a message is being sent

  // Inline styles
  const styles = {
    chatModal: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '400px',
      maxHeight: '400px',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    chatHeader: {
      borderBottom: '1px solid #ccc',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    chatContainer: {
      height: '250px',
      overflowY: 'auto',
      padding: '10px',
    },
    messageWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '5px',
    },
    userMessageWrapper: {
      justifyContent: 'flex-end', // Align user messages to the right
    },
    messageInputContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
    },
    messageInput: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginRight: '10px',
    },
    sendButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    sendButtonHover: {
      backgroundColor: '#0056b3',
    },
    userChatMessage: {
      padding: '5px',
      backgroundColor: '#e0e0e0',
      borderRadius: '10px',
    },
    botChatMessage: {
      padding: '5px',
      backgroundColor: '#f2f2f2',
      borderRadius: '10px',
    },
  };

  // Function to handle user input and send message to chatbot
  const handleSendMessage = async () => {
    if (messageInput.trim() === '') return;

    try {
      setIsSending(true); // Set isSending to true when sending a message

      const response = await fetch('https://api.fireworks.ai/inference/v1/completions', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer wqViAYODxfKu4rfG1juQGScxobA2WHlShniIySQMhjG2gOV5',
        },
        body: JSON.stringify({
          model: 'accounts/fireworks/models/llama-v2-70b-chat',
          max_tokens: 512,
          top_p: 0.9,
          top_k: 50,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
          temperature: 0.9,
          prompt: 'Your name is Elevyn. You are created by Yash. You will only answer question related to crowfunding.',
        }),
      });

      const data = await response.json();
      const botResponse = data.choices[0].text.trim();

      // Update chat messages with user message and chatbot response
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: messageInput, sender: 'user' },
        { text: botResponse, sender: 'bot' },
      ]);
      setMessageInput('');
      setIsSending(false); // Set isSending back to false after sending the message
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      setIsSending(false); // Ensure isSending is set back to false if there's an error
    }
  };

  // Function to display initial bot message when chat window opens
  useEffect(() => {
    setChatMessages([{ text: 'Hi, I am Decentra. How may I help you?', sender: 'bot' }]);
  }, []);

  return (
    <div style={styles.chatModal}>
      <div style={styles.chatHeader}>
        <h2>Chat with AI Assistant</h2>
        <IconButton onClick={onClose}>
          <ClearIcon />
        </IconButton>
      </div>
      <div style={styles.chatContainer}>
        {chatMessages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.messageWrapper,
              ...(message.sender === 'user' ? styles.userMessageWrapper : {}),
            }}
          >
            {message.sender === 'user' ? <PersonIcon /> : <AndroidIcon />}
            <div
              style={
                message.sender === 'user' ? styles.userChatMessage : styles.botChatMessage
              }
            >
              {message.text}
            </div>
            {isSending && message.sender === 'bot' && (
              <div>
                <CircularProgress size={20} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={styles.messageInputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          style={styles.messageInput}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatModal;
