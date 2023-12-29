// ContactButton.js
import React, { useState, useEffect, useRef } from "react";
import Icon from "../../assets/Icon.png";

const ContactButton = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isIconVisible, setIconVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Tampilkan ikon ketika pengguna menggulir ke bawah lebih dari 400 piksel (sesuaikan sesuai kebutuhan)
      setIconVisible(scrollPosition > 400);

      // Tutup dropdown jika terbuka saat pengguna menggulir
      if (isDropdownVisible) {
        setDropdownVisible(false);
      }
    };

    // Tambahkan event listener saat komponen dimount
    window.addEventListener("scroll", handleScroll);

    // Hapus event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownVisible]);

  const handleIconClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:example@example.com";
  };

  return (
    <div
      className={`fixed -right-5 bottom-8 transition-opacity duration-300 ${
        isIconVisible ? "opacity-100" : "opacity-0"
      }`}
      ref={dropdownRef}
    >
      {/* Ikon untuk menampilkan tombol WhatsApp dan Email */}
      <div className="relative">
        <img
          src={Icon}
          alt="Contact"
          onClick={handleIconClick}
          className="flex items-center px-4 py-2 rounded-md cursor-pointer h-[160px] md:h-[180px] lg:h-[200px] xl:h-[250px] transition-transform duration-300 transform hover:scale-110"
        />

        {/* Dropdown tombol WhatsApp dan Email */}
        {isDropdownVisible && (
          <div className="absolute flex-col mx-auto mt-2 space-y-2 right-32 lg:top-10 lg:right-52 top-4">
            <button
              onClick={handleWhatsAppClick}
              className="flex px-4 py-2 bg-secondary  font-poppins text-green-600 border-2 border-green-500 text-[12px] lg:text-[16px] h-[35px] lg:h-[40px] w-[100px] lg:w-[150px] rounded-2xl shadow-md hover:scale-105 focus:outline-none focus:ring focus:border-blue-300"
            >
              WhatsApp
            </button>
            <button
              onClick={handleEmailClick}
              className="flex px-4 py-2 bg-secondary  font-poppins mt-2 text-blue-600 border-2 border-blue-500 text-[12px] lg:text-[16px] h-[35px] lg:h-[40px] w-[100px] lg:w-[150px] rounded-2xl shadow-md hover:scale-105 focus:outline-none focus:ring focus:border-blue-300"
            >
              Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactButton;
