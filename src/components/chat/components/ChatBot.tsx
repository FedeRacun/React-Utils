import { useState, useEffect, useRef } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import styles from "./ChatBot.module.css";
import { isValidInput } from "../logic/validationUtils";
import { Step } from "../interfaces/step.interface";

interface Message {
  sender: "bot" | "user";
  text: string;
}

interface ChatBotProps {
  getUserData: (data: Record<string, string>) => void;
  conversationFlow: Step[];
}
export function ChatBot({ getUserData, conversationFlow }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [userData, setUserData] = useState<Record<string, string>>({});

  const lastStepIndex = conversationFlow.length - 1;

  useEffect(() => {
    if (stepIndex === lastStepIndex) {
      getUserData(userData);
    }
  }, [stepIndex]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (stepIndex < conversationFlow.length) {
      const currentStep = conversationFlow[stepIndex];
      const timeout = setTimeout(() => {
        addMessage("bot", currentStep.question);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [stepIndex]);

  const addMessage = (sender: "bot" | "user", text: string) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleUserInput = (text: string) => {
    const currentStep = conversationFlow[stepIndex];

    addMessage("user", text);
    // Validar la entrada del usuario
    if (!isValidInput(text, currentStep)) {
      setTimeout(() => {
        addMessage(
          "bot",
          currentStep.errorMessage || "Entrada inválida, por favor intente nuevamente."
        );
      }, 500);
      return;
    }
    setUserData((prev) => ({ ...prev, [currentStep.id]: text }));
    setStepIndex(stepIndex + 1);

    if (stepIndex < lastStepIndex) {
      setStepIndex(stepIndex + 1);
    }
  };

  return (
    <>
      <div className={styles.chatbotContainer}>
        <button className={styles.toggleButton} onClick={toggleChat}>
          {isOpen ? (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Asistente virutal</span>
              <div>X</div>
            </div>
          ) : (
            "Abrir Chat"
          )}
        </button>

        {isOpen && (
          <div className={styles.chatbot}>
            <div className={styles.chatWindow}>
              {messages.map((msg, index) => (
                <ChatBubble key={index} sender={msg.sender} text={msg.text} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            {stepIndex < lastStepIndex && <ChatInput onSend={handleUserInput} />}
          </div>
        )}
      </div>
    </>
  );
}
