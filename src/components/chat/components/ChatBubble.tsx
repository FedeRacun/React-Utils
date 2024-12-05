import React from "react";
import styles from "./ChatBubble.module.css";

interface ChatBubbleProps {
  sender: "bot" | "user";
  text: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, text }) => {
  if (sender === "bot") {
    return (
      <div className={`${styles.bubble} ${styles.bot}`}>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    );
  } else {
    return <div className={`${styles.bubble} ${styles.user}`}>{text}</div>;
  }
};
