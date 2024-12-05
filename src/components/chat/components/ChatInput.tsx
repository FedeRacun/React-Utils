import React, { useState } from "react";
import styles from "./ChatInput.module.css";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button className={styles.sendButton} onClick={handleSend}>
        Enviar
      </button>
    </div>
  );
};
