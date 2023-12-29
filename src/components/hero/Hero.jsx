import React, { useState, useEffect } from "react";
import Bgcover from "../../assets/hero.png";
import Cookies from "js-cookie";

const Hero = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    const tokenFromCookie = Cookies.get("authToken");
    if (!tokenFromCookie) {
      console.error("Token not found in cookies");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/users", {
        headers: {
          Authorization: `Bearer ${tokenFromCookie}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received data:", data);

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data structure");
      }

      const userData = data.find((user) => user.token === tokenFromCookie);

      if (!userData) {
        console.error("User data with given token not found");
        setError("User data not found");
        setLoading(false);
        return;
      }

      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Run only once on component mount

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${Bgcover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <h1
          className="p-3 text-2xl text-center lg:text-5xl md:text-7xl text-secondary font-poppins"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}
        >
          {loading ? "Loading..." : user ? `Hallo ${user.firstName}` : ""}
        </h1>
        <h1
          className="p-3 text-4xl text-center lg:text-8xl md:text-7xl text-secondary font-poppins"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}
        >
          Let's ProtectTogether
        </h1>
      </div>

      <div className="mt-2  lg:w-[900px] w-[300px] mx-auto p-2 ">
        <p
          className="pb-5 text-lg font-semibold text-center text-secondary lg:text-2xl"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 10)" }}
        >
          Selamat datang di Stuntguard! Temukan informasi terkini tentang
          pencegahan stunting dan perawatan anak-anak. Dapatkan tips gizi dan
          panduan kesehatan untuk mendukung pertumbuhan optimal. Bergabunglah
          dalam upaya menciptakan masa depan sehat untuk generasi mendatang.
          Selamat membaca!
        </p>
      </div>
    </div>
  );
};

export default Hero;
