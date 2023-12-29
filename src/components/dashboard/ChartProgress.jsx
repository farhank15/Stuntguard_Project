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

function ChartPerChild() {
  const [chartData, setChartData] = useState([]);

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
          acc[item.name] = acc[item.name] || {
            height: [],
            weight: [],
            month: [],
          };
          acc[item.name].height.push(parseInt(item.height));
          acc[item.name].weight.push(parseInt(item.weight));
          acc[item.name].month.push(item.month); // Assuming you have a 'month' field in the data
          return acc;
        }, {});

        // Create datasets for each child
        const charts = Object.keys(groupedData).map((childName) => {
          const heightDataset = {
            label: `${childName}'s Height`,
            data: groupedData[childName].height,
            backgroundColor: getRandomColor(),
          };

          const weightDataset = {
            label: `${childName}'s Weight`,
            data: groupedData[childName].weight,
            backgroundColor: getRandomColor(),
          };

          return (
            <div key={childName} className="mb-4 col-lg-6 col-xl-6">
              <h2 className="pt-5 pb-2 text-2xl text-center xl:text-4xl lg:text-3xl font-poppins">
                Diagram Pertumbuhan {childName}
              </h2>
              <Bar
                data={{
                  labels: groupedData[childName].month,
                  datasets: [heightDataset, weightDataset],
                }}
                options={{
                  scales: {
                    x: {
                      title: {
                        display: true,
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Value",
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                      align: "center",
                    },
                  },
                }}
              />
            </div>
          );
        });

        // Set the charts data
        setChartData(charts);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="mx-auto" id="chartProgres">
      <div className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-2">
        {chartData}
      </div>
    </div>
  );
}

export default ChartPerChild;
