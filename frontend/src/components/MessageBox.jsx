import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import axios from 'axios';
import { Card } from '@material-tailwind/react';

export function MessageBox({ sendMessage }) {
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(message)
      setMessage('')
    }
  }

  return (
    <div className=" bottom-0 w-full bg-white p-4 shadow-lg px-40 border">
      <div className='flex flex-row justify-between items-center p-0'>
        <textarea
          name="message"
          id="message"
          placeholder="Ask something about your document"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage()
            }
          }}
          className="w-8/12 h-16 border border-gray-300 p-5 min-h-10  overflow-y-scroll y-grow no-scrollbar"
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
      </div>
    </div>
  );
}