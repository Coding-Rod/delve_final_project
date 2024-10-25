export function Messages({ messages }) {
  const convertTimeFormat = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  return (
    <div className="container mx-auto my-40 px-4 sm:px-10">
      {messages.map(message => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
        >
          <div
            className={`p-4 rounded-lg shadow-md ${
              message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
            style={{ maxWidth: '90%', sm: { maxWidth: '60%' } }}
          >
            <p>{message.text}</p>
            <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>{convertTimeFormat(message.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}