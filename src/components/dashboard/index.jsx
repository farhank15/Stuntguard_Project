import React, { useEffect, useState } from "react";
import axios from "axios";
import Profil from "../profil/ProfilCard";
import Chart from "./GrowthChart";
import ChartProgres from "./ChartProgress";

const Dashboard = () => {
  const [latestAnakData, setLatestAnakData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await axios.get("http://localhost:3001/anak");
        console.log("API Response:", response.data);

        // Create a map to store the latest data for each unique child name
        const latestDataMap = new Map();

        // Process the data to find the latest for each child name
        response.data.forEach((anak) => {
          const currentLatest = latestDataMap.get(anak.name);
          if (
            !currentLatest ||
            new Date(anak.date) > new Date(currentLatest.date)
          ) {
            latestDataMap.set(anak.name, anak);
          }
        });

        // Convert map values to an array
        const latestDataArray = Array.from(latestDataMap.values());

        setLatestAnakData(latestDataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Dependency array kosong agar fungsi hanya dijalankan sekali saat mount

  const handleSubmit = async (formData) => {
    try {
      // Submit form data
      await axios.post("http://localhost:3001/anak", formData);

      // Update the latest data immediately after submitting the form
      fetchData();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <section>
        <Profil />
        <h1 className="mb-4 text-4xl font-bold">Hiastory Data Anak</h1>
        <div className="flex flex-wrap gap-4">
          {latestAnakData.length > 0 ? (
            latestAnakData.map((anak) => (
              <article
                key={anak.id}
                className="w-full p-4 mb-4 bg-blue-100 rounded-md shadow-md f md:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <h2 className="mb-2 text-xl font-semibold text-blue-900">
                  {anak.name}
                </h2>
                <p className="text-gray-700">Umur: {anak.age} tahun</p>
                <p className="text-gray-700">Tinggi: {anak.height} cm</p>
                <p className="text-gray-700">Berat: {anak.weight} kg</p>
              </article>
            ))
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </section>
      <Chart />
      <ChartProgres />
    </div>
  );
};

export default Dashboard;
