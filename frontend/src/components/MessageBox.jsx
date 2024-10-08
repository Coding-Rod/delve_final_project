import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import axios from 'axios';
import { Card } from '@material-tailwind/react';

export function MessageBox() {
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      console.log("Message: ", message)
      // axios.post('/api/messages', { message })
      //   .then(response => {
      //     console.log('Message sent:', response.data);
      //     setMessage('');
      //   })
      //   .catch(error => {
      //     console.error('Error sending message:', error);
      //   });
    }
  }

  return (
    <div className="fixed bottom-0 w-full bg-white p-4 shadow-lg px-40 border">
      <Card className='flex flex-row justify-between items-center border border-black rounded-full px-30'>
        <textarea
          name="message"
          id="message"
          placeholder="Ask something about your document to [App name]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="ml-10 my-6 w-8/12 h-16 border border-gray-300 p-5 min-h-10 rounded-full overflow-y-scroll y-grow no-scrollbar"
        />
        <div
          className="w-2/12"
        >
          <button
            className="rounded-full bg-warning text-white h-20 w-20"
            onClick={handleSendMessage}
          >
            <SendIcon />
          </button>
        </div>
      </Card>
    </div>
  );
}