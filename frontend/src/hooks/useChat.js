import { useEffect, useState } from "react";
import { messages as mockedMessages } from "../mock/Data";

export function useChat ({ chatId }){
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Mocked data
      const actualMessages = mockedMessages.filter((message) => message.document === chatId)[0].messages;

      // const actualMessages = JSON.parse(
      //   localStorage.getItem(chatId)
      // ).filter((message) => message.document === chatId)[0].messages;
            
      if (!actualMessages) {
        throw new Error("Messages not found");
      }

      setMessages(actualMessages);
    } catch (error) {
      setError(error);
    }
  }, [chatId]);

  return { messages, error };
}