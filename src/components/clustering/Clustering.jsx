import { Link as ScrollLink, Element } from "react-scroll";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import imagebg from "../../assets/tipsdansaran.png";

const Clustering = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("src/api/clustering.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    // Trigger AOS refresh after changing the selected category
    AOS.refresh();
  };

  return (
    <div>
      <Hero />
      <div className="p-4 mx-auto"></div>

      <Element className="p-4 mx-auto" name="clustering">
        <div className="mb-8">
          <div className="flex justify-center space-x-3 font-poppins">
            <button
              className={`${
                selectedCategory === "Golongan 1"
                  ? "bg-blue-500"
                  : "bg-blue-300 text-slate-700"
              } text-white px-2 sm:w-24 py-2 text-[12px] rounded hover:bg-blue-500 hover:text-secondary w-20 h-16`}
              onClick={() => handleCategoryChange("Golongan 1")}
            >
              Golongan 1
            </button>
            <button
              className={`${
                selectedCategory === "Golongan 2"
                  ? "bg-blue-500"
                  : "bg-blue-300 text-slate-700"
              } text-white px-2 sm:w-24 py-2 text-[12px] rounded hover:bg-blue-500 hover:text-secondary w-20 h-16`}
              onClick={() => handleCategoryChange("Golongan 2")}
            >
              Golongan 2
            </button>
            <button
              className={`${
                selectedCategory === "Golongan 3"
                  ? "bg-blue-500"
                  : "bg-blue-300 text-slate-700"
              } text-white px-2 sm:w-24 py-2 text-[12px] rounded hover:bg-blue-500 hover:text-secondary w-20 h-16`}
              onClick={() => handleCategoryChange("Golongan 3")}
            >
              Golongan 3
            </button>
            <button
              className={`${
                selectedCategory === "Golongan 4"
                  ? "bg-blue-500"
                  : "bg-blue-300 text-slate-700"
              } text-white px-2 sm:w-24 py-2 text-[12px] rounded hover:bg-blue-500 hover:text-secondary w-20 h-16`}
              onClick={() => handleCategoryChange("Golongan 4")}
            >
              Golongan 4
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {data.map((golongan, index) => (
            <div
              key={index}
              className="w-full mx-2 mb-8 text-justify"
              data-aos="fade-up"
            >
              {Object.keys(golongan).map((golonganKey) => (
                <div key={golonganKey} className="mb-6">
                  {(!selectedCategory || selectedCategory === golonganKey) && (
                    <div>
                      <h2 className="pb-2 mb-3 text-3xl font-bold text-center text-blue-500 border-b-2 border-blue-500">
                        {golonganKey}
                      </h2>
                      {golongan[golonganKey].map((item, itemIndex) => (
                        <div key={itemIndex} className="mb-8">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={`Image for ${item.kategori}`}
                              className="mx-auto mb-6 rounded-lg h-[400px] xl:w-[60%] object-cover"
                            />
                          )}

                          <h3 className="mb-2 text-2xl font-semibold text-blue-500">
                            {item.kategori}
                          </h3>
                          <div className="p-4 border-2 border-slate-800 rounded-xl">
                            <ul className="pl-6 mb-4 text-lg list-disc sm:text-xl">
                              {item.saran_orang_tua.map((saran, saranIndex) => (
                                <li key={saranIndex}>{saran}</li>
                              ))}
                            </ul>
                          </div>
                          <p className="mb-2 text-lg md:text-xl">
                            {item.pembahasan}
                          </p>
                          <p className="mb-2 text-lg md:text-xl">
                            {item.tambahan_pembahasan}
                          </p>
                          <p className="mb-2 text-lg md:text-xl">
                            {item.kesimpulan}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Element>
    </div>
  );
};

export default Clustering;

const Hero = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen "
      style={{
        backgroundImage: `url(${imagebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <div>
        <h1
          className="p-3 text-6xl text-center lg:text-9xl md:text-8xl text-secondary font-poppins"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 10)" }}
        >
          Tips & Saran
        </h1>
      </div>

      <div className="mt-2 w-[300px] xl:w-[900px] md:w-[700px] mx-auto p-2">
        <p
          className="font-sans text-center text-md text-secondary lg:text-xl"
          style={{
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.9)",
          }}
        >
          Kumpulan tips dan saran berdasarkan penggolongan kondisi anak ini
          merupakan langkah awal untuk memantau dalam pencegahan stunting pada
          anak, tetap konsultasikan pada dokter profesional.
        </p>
      </div>
      <div
        className="flex justify-between space-x-4 font-poppins"
        style={{
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.9)",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.9)",
        }}
      >
        <ScrollLink
          to="clustering"
          smooth={true}
          duration={500}
          className="px-3 py-2 border-2 rounded-md cursor-pointer text-secondary hover:scale-110"
        >
          Baca sekarang
        </ScrollLink>
      </div>
    </div>
  );
};
