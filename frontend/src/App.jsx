import { StickyNavbar as NavBar } from "./components/NavBar";
import { Dialog } from "./components/Dialog";
import { Messages } from "./components/Messages";
import { MessageBox } from "./components/MessageBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { messages as mockMessages} from "./mock/Data";
import Swal from 'sweetalert2';

export default function App() {
  const [newChat, setNewChat] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Verify localStorage for new chat
    const chat = localStorage.getItem("chat-id");
    if (chat) {
      // Mock implementation
      const chat_id = 'chat-812js9182h'
      localStorage.setItem("chat-id", chat_id);
      const chat = mockMessages.find(chat => chat.id === chat_id)
      setMessages(chat.messages);

      // Implementation with backend
      // axios.get(`/api/messages/${chat_id}`)
      //   .then(response => {
      //     setMessages(response.data.messages);
      //     localStorage.setItem("chat-id", response.data.id);
      //   })
      //   .catch(error => {
      //     console.error('Error fetching messages:', error);
      //   });
    } else {
      setNewChat(true);
    }
  }, []);

  const clearChat = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("chat-id");
        setNewChat(true);
        setMessages([]);
        Swal.fire(
          'Cleared!',
          'Chat has been cleared.',
          'success'
        )
      }
    })
  }

  const sendMessage = (message) => {
    // Mock implementation

    // User
    const userMessage = {
      id: `msg-${messages.length + 1}`,
      text: message,
      timestamp: new Date().toISOString(),
      sender: 'user'
    }
    setMessages([...messages, userMessage]);

    // Bot
    setTimeout(() => {
      const botResponse = {
        id: `msg-${messages.length + 1}`,
        text: 'I am a bot',
        timestamp: new Date().toISOString(),
        sender: 'bot'
      }
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
      

    // Implementation with backend
    // axios.post(`/api/messages/${chat_id}`, { message })
    //   .then(response => {
    //     console.log('Message sent:', response.data);
    //     setMessages([...messages, response.data]);
    //   })
    //   .catch(error => {
    //     console.error('Error sending message:', error);
    //   });
  }

  useEffect(() => {
    console.log({messages});
  }, [messages]);

  return (
    <div>
      <nav>
        <NavBar clearChat={clearChat} />
      </nav>
      <main>
        {newChat && <Dialog />}
        {!newChat && <Messages messages={messages} />}
      </main>
      <footer>
        <MessageBox sendMessage={sendMessage} />
      </footer>
    </div>
  );
}
