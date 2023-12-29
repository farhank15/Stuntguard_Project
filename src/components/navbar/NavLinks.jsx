import React, { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./Mylinks";
import DropdownImage from "../../assets/Dropdown.png";

const NavLinks = ({ closeMobileDropdown }) => {
  const [heading, setHeading] = useState(false);
  const [subHeading, setSubHeading] = useState("");
  const [isRotated, setIsRotated] = useState(false);

  const closeMobileDropdownLocal = () => {
    setHeading(false);
    setSubHeading("");
    setIsRotated(false); // Set isRotated to false when closing dropdown
    closeMobileDropdown();
  };

  return (
    <>
      {links.map((link) => (
        <div key={link.name}>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="flex items-center justify-between pr-5 py-7 md:pr-0 group "
              onClick={() => {
                setHeading((prev) => (prev === link.name ? "" : link.name));
                setSubHeading("");
              }}
            >
              {link.name}
              <span
                className={`inline text-xl md:hidden ${
                  heading === link.name ? "group-hover:rotate-180" : ""
                }`}
              >
                <img
                  src={DropdownImage}
                  alt={heading === link.name ? "chevron-up" : "chevron-down"}
                  className="w-6 h-6 cursor-pointer "
                />
              </span>
              <span className="hidden text-xl md:mt-1 md:ml-2 md:block group-hover:rotate-180 group-hover:-mt-2">
                <img
                  src={DropdownImage}
                  alt="chevron-down"
                  className="w-6 h-6 cursor-pointer"
                />
              </span>
            </h1>
            {link.submenu && (
              <div>
                <div className="absolute z-30 hidden top-20 group-hover:md:block hover:md:block">
                  <div className="py-3">
                    <div className="absolute w-4 h-4 mt-1 rotate-45 bg-[#E9E3FF]  left-3"></div>
                  </div>
                  <div className="grid w-52 grid-cols-3 gap-10 p-3 bg-[#E9E3FF]  rounded-lg shadow-xl C border-slate-700 shadow-slate-400">
                    {link.sublinks.map((sublinkGroup, index) => (
                      <div key={index}>
                        {sublinkGroup.sublink.map((sublink, subIndex) => (
                          <li
                            key={subIndex}
                            className="text-sm w-52 hover:text-primary hover:scale-105 pl-2 text-gray-600 my-2.5"
                          >
                            <Link
                              to={sublink.link}
                              className="hover:text-primary"
                              onClick={closeMobileDropdownLocal}
                            >
                              {sublink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {link.sublinks.map((sublinkGroup, subIndex) => (
              <div key={subIndex}>
                <div>
                  <div>
                    {sublinkGroup.sublink.map((sublink, innerIndex) => (
                      <li key={innerIndex} className="py-2 pl-10">
                        <Link
                          to={sublink.link}
                          onClick={closeMobileDropdownLocal}
                        >
                          {sublink.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
