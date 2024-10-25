export function Messages({messages}) {
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
          </div>
        </div>
      ))}
    </div>
  );
}