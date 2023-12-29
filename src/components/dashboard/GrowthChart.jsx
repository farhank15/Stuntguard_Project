import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Cookies from "js-cookie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve token from cookie
        const token = Cookies.get("authToken");

        // Set token in axios defaults
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Fetch data with the authorized request
        const response = await axios.get("http://localhost:3001/anak");
        const data = response.data;

        // Filter data based on the token
        const filteredData = data.filter((anak) => anak.token === token);

        // Mengelompokkan data berdasarkan nama
        const groupedData = filteredData.reduce((acc, item) => {
          acc[item.name] = acc[item.name] || { height: [], weight: [] };
          acc[item.name].height.push(parseInt(item.height));
          acc[item.name].weight.push(parseInt(item.weight));
          return acc;
        }, {});

        // Check if there is data to display
        if (Object.keys(groupedData).length > 0) {
          // Menghitung rata-rata untuk setiap anak
          const newChartData = {
            labels: Object.keys(groupedData),
            datasets: [
              {
                label: "Average Height",
                data: Object.values(groupedData).map((item) =>
                  average(item.height)
                ),
                backgroundColor: "rgba(75, 192, 192, 0.5)",
              },
              {
                label: "Average Weight",
                data: Object.values(groupedData).map((item) =>
                  average(item.weight)
                ),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          };

          setChartData(newChartData);
        } else {
          // No data available, set chartData to null
          setChartData(null);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const average = (arr) =>
    arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div id="chart">
      <h2 className="px-3 pt-5 pb-2 text-2xl text-center xl:text-4xl font-poppins">
        Diagram Rata-Rata Tinggi badan dan Berat Badan Anak
      </h2>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
}

export default App;
