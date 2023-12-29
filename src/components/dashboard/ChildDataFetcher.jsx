import React, { useState, useEffect } from "react";
import axios from "axios";

const ChildDataFetcher = ({ onDataFetched }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/anak");

        console.log("Raw response data in ChildDataFetcher:", response.data);

        if (Array.isArray(response?.data?.anak)) {
          onDataFetched(response.data.anak);
        } else {
          setError("Child data is not in the expected format");
        }
      } catch (error) {
        setError(`Error fetching child data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [onDataFetched]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ChildDataFetcher;
