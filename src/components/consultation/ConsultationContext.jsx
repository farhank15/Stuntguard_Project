// ContactButton.js
import React from "react";

const ContactButton = () => {
  // Fungsi untuk menangani klik tombol WhatsApp
  const handleWhatsAppClick = () => {
    // Ganti "1234567890" dengan nomor WhatsApp yang sesuai
    window.open("https://wa.me/1234567890", "_blank");
  };

  // Fungsi untuk menangani klik tombol Email
  const handleEmailClick = () => {
    // Ganti "example@example.com" dengan alamat email yang sesuai
    window.location.href = "mailto:example@example.com";
  };

  return (
    <div className="fixed flex flex-col space-y-4 bottom-8 right-8">
      {/* Tombol WhatsApp */}
      <button
        onClick={handleWhatsAppClick}
        className="px-4 py-2 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        WhatsApp
      </button>

      {/* Tombol Email */}
      <button
        onClick={handleEmailClick}
        className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Email
      </button>
    </div>
  );
};

export default ContactButton;
