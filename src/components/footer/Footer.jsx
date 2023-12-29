import React from "react";
import { Link } from "react-scroll";
import Logo from "../../assets/stuntguard f.png";

const Footer = () => {
  return (
    <footer className="px-4 py-20 text-gray-400 ug-secondary font-poppins">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 mb-3 md:grid-cols-5">
          <Link
            to="hero"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="w-32 col-span-2 mb-12 cursor-pointer md:col-span-1"
          >
            <img src={Logo} alt="Logo" className="w-32 -mt-10" />
          </Link>

          <nav className="mb-8">
            <p className="mb-3 text-xs font-bold tracking-wider uppercase text-black1">
              Tech
            </p>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Kutty
            </a>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Tailwind
            </a>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              React js
            </a>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Github
            </a>
          </nav>
          <nav className="mb-8">
            <p className="mb-3 text-xs font-bold tracking-wider uppercase text-black1">
              Contact
            </p>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Twitter
            </a>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Instagram
            </a>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Email
            </a>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Advertising
            </a>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Chat
            </a>
          </nav>
          <nav className="mb-8">
            <p className="mb-3 text-xs font-bold tracking-wider uppercase text-black1">
              Team
            </p>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Ahmad Farhan Kholik
            </a>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Hanifah Eka Cahyani
            </a>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Hesti Lusiati
            </a>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Moch Dapa Adhari
            </a>
            <a
              href="#"
              className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-primary"
            >
              Renaldy Baleano Yohzain
            </a>
          </nav>
        </div>
        <p className="text-sm font-medium text-left text-gray-600 md:text-center">
          © Copyright 2023 Vocasia, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
