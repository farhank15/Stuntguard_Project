import React, { useState } from "react";
import ContactList from "./DoctorSelector";
import ChatWindow from "./ChatWindow";

const App = () => {
  const [contacts] = useState([
    { name: "Dokter 1", photoUrl: "/path/ke/avatar1.jpg" },
    { name: "Dokter 2", photoUrl: "/path/ke/avatar2.jpg" },
    { name: "Dokter 3", photoUrl: "/path/ke/avatar3.jpg" },
    { name: "Dokter 4", photoUrl: "/path/ke/avatar4.jpg" },
    { name: "Dokter 5", photoUrl: "/path/ke/avatar5.jpg" },
  ]);
  const [activeContact, setActiveContact] = useState(null);

  return (
    <div className="flex h-screen xl:px-20">
      <div className="w-1/2 border-r xl:w-1/3">
        <ContactList
          contacts={contacts}
          onSelectContact={setActiveContact}
          activeContact={activeContact}
        />
      </div>
      <div className="w-3/4 xl:w-4/5">
        {activeContact ? (
          <ChatWindow activeContact={activeContact} />
        ) : (
          <div>Select a contact to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default App;
