"use client";

import { useState, useEffect } from "react";
import styles from "./chat.module.css";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  // TODO (FOR LATER): Load existing messages when component mounts
  /*
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/messages/');
        if (response.ok) {
          const data = await response.json();
          
          // Convert API response to Message format
          const formattedMessages: Message[] = data.map((msg: any) => ({
            id: msg.id,
            text: msg.text,
            sender: msg.sender,
            timestamp: new Date(msg.timestamp)
          }));
          
          setMessages(formattedMessages);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);
  */

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // TODO: Make API call to Django backend
    /*
    try {
      const response = await fetch('http://localhost:8000/api/send/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Add AI response to messages
        const aiMessage: Message = {
          id: Date.now() + 1,
          text: data.ai_response.text, // Adjust based on your API response structure
          sender: "ai",
          timestamp: new Date(data.ai_response.timestamp)
        };
        
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        console.error('Failed to send message');
        // Handle error - maybe show error message to user
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle network error
    }
    */
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI Chat App</h1>

      <div className={styles.chatArea}>
        {messages.length === 0 ? (
          <p className={styles.emptyState}>
            No messages yet. Start a conversation!
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${
                message.sender === "user"
                  ? styles.userMessage
                  : styles.aiMessage
              }`}
            >
              <div
                className={`${styles.messageSender} ${
                  message.sender === "user"
                    ? styles.userSender
                    : styles.aiSender
                }`}
              >
                {message.sender === "user" ? "You" : "AI"}
              </div>
              <div className={styles.messageText}>{message.text}</div>
              <div className={styles.messageTime}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className={styles.messageInput}
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
}
