import React, { useEffect } from "react";
import { Teams } from "./Teams";
import AOS from "aos";
import "aos/dist/aos.css";

const Allteams = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      easing: "ease-in-out", // Fungsi penurunan nilai (cubic-bezier)
    });
  }, []);
  return (
    <div className="h-auto pb-10 ">
      <div className="pt-5 text-center font-poppins">
        <h1 className="pt-5 pb-10 text-4xl md:text-5xl">Dokter Profesional</h1>
      </div>

      <div className="flex gap-10 px-10 py-4 mx-3 overflow-x-scroll xl:overflow-hidden lg:gap-5 xl:justify-center xl:gap-14">
        {Teams.map((team, index) => (
          <div key={index} className="team-card ">
            <div
              data-aos="flip-left"
              className="max-w-md overflow-hidden  bg-white rounded-md shadow-lg w-[210px] h-[294px]"
            >
              <img
                className="object-cover w-full"
                src={team.image}
                alt={team.name}
              />
            </div>
            <div className="flex-shrink-0 w-[180px] h-20 p-2 ml-4 -mt-10 transform bg-white border-2 rounded-lg shadow-lg border-slate-300 ">
              <div
                data-aos="zoom-in-up"
                className="mb-2 font-bold text-md font-poppins w-52"
              >
                {team.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allteams;
