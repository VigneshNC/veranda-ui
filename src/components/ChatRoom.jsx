const ChatRoom = ({ currentUser, targetUser, token }) => {
  const { messages, sendMessage } = useChat(currentUser.id, token);
  const [text, setText] = useState("");

  const handleSend = () => {
    sendMessage(targetUser.id, text);
    setText("");
  };

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.senderId === currentUser.id ? "sent" : "received"}
          >
            {m.content}
          </div>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatRoom;