import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaImage } from "react-icons/fa";

const ChatWindow = ({ activeContact }) => {
  const [allMessages, setAllMessages] = useState({});
  const [currentMessages, setCurrentMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    if (activeContact?.name) {
      setCurrentMessages(allMessages[activeContact.name] || []);
    }
  }, [activeContact, allMessages]);

  const sendMessage = () => {
    if (newMessage.trim() || newFile) {
      const newMsg = {
        text: newMessage,
        file: newFile,
        sender: "Me",
        type: newFile ? "file" : "text",
      };

      const updatedMessages = [...(currentMessages || []), newMsg];
      setCurrentMessages(updatedMessages);

      setAllMessages((prevMessages) => ({
        ...prevMessages,
        [activeContact.name]: updatedMessages,
      }));

      setNewMessage("");
      setNewFile(null);
    }
  };

  const handleFileChange = (event) => {
    setNewFile(event.target.files[0]);
  };

  return (
    <div className="flex flex-col h-full bg-white ">
      <div className="flex items-center p-4 border-2 rounded-t-lg font-poppins text-slate-700">
        {activeContact?.photoUrl ? (
          <img
            src={activeContact.photoUrl}
            alt={activeContact.name}
            className="w-10 h-10 mr-4 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 mr-4 bg-gray-300 rounded-full"></div>
        )}
        <h2>{activeContact?.name}</h2>
      </div>

      <div className="flex-grow p-4 overflow-auto">
        {currentMessages.map((message, index) => (
          <div
            key={index}
            className={`my-2  p-2 break-words rounded max-w-72 ${
              message.sender === "Me"
                ? "bg-blue-200 ml-auto"
                : "bg-gray-100 mr-auto"
            }`}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {message.type === "text" ? (
              <p className="text-xl text-gray-800 md:text-2xl">
                {message.text}
              </p>
            ) : (
              <div className="flex items-center space-x-2">
                <a
                  href={URL.createObjectURL(message.file)}
                  className="text-blue-500 underline hover:no-underline"
                >
                  Download File
                </a>
                <span className="text-xs text-gray-500">
                  ({(message.file.size / 1024).toFixed(2)} KB)
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 border-t">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-lg"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <label htmlFor="file-upload" className="p-2 cursor-pointer">
          <FaImage />
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-upload"
        />
        <button
          onClick={sendMessage}
          className="p-2 text-white bg-blue-500 rounded-r-lg"
          style={{ width: "48px" }}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
