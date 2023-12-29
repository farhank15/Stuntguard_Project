import React from "react";

const ContactList = ({ contacts, onSelectContact, activeContact }) => {
  return (
    <div className="h-full overflow-auto border-2 rounded-lg">
      {contacts.map((contact, index) => (
        <div
          key={index}
          className={`p-2 hover:bg-blue-100 cursor-pointer flex items-center border-b ${
            activeContact?.name === contact.name ? "bg-blue-200" : ""
          }`}
          onClick={() => onSelectContact(contact)}
        >
          {contact.photoUrl ? (
            <img
              src={contact.photoUrl}
              alt={contact.name}
              className="w-10 h-10 mr-3 rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-10 h-10 mr-3 bg-gray-300 rounded-full">
              {contact.name.charAt(0)}
            </div>
          )}
          <div>{contact.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
