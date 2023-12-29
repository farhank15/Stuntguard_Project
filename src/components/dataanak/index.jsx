import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import Cookies from "js-cookie";
import DisplayData from "./DisplayData";

const apiUrl = "http://localhost:3001/anak";

const App = () => {
  const [groupedData, setGroupedData] = useState({});
  const [selectedChild, setSelectedChild] = useState([]);
  const [editingChild, setEditingChild] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = Cookies.get("authToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(apiUrl);
      const filteredData = response.data.filter((item) => item.token === token);
      setGroupedData(groupDataByName(filteredData));
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const groupDataByName = (data) => {
    return data.reduce((grouped, item) => {
      const { name } = item;
      grouped[name] = grouped[name] || [];
      grouped[name].push(item);
      return grouped;
    }, {});
  };

  const handleViewData = (name) => {
    setSelectedChild(groupedData[name]);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchData();
      setAlertMessage("Data berhasil dihapus!");
      setTimeout(() => setAlertMessage(null), 3000);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  const handleUpdate = (id) => {
    const childToEdit = selectedChild.find((child) => child.id === id);
    console.log("Child to edit:", childToEdit);
    setEditingChild(childToEdit);
  };

  const resetEditingChild = () => {
    setEditingChild(null);
    fetchData();
  };

  const closeModal = () => {
    setSelectedChild([]);
    setIsModalOpen(false);
  };

  return (
    <div className="container px-4 mx-auto mt-8">
      <Form
        setGroupedData={setGroupedData}
        editingChild={editingChild}
        resetEditingChild={resetEditingChild}
      />
      <DisplayData groupedData={groupedData} handleViewData={handleViewData} />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative p-6 bg-white rounded-md">
            <button
              onClick={closeModal}
              className="absolute text-2xl text-red-600 cursor-pointer font-poppins top-1 right-3 hover:text-gray-800"
            >
              X
            </button>
            <h2 className="mb-4 text-2xl font-semibold">Semua Data Anak</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border">Umur</th>
                  <th className="p-2 border">Tinggi</th>
                  <th className="p-2 border">Berat</th>
                  <th className="p-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {selectedChild.map((data) => (
                  <tr key={data.id} className="border">
                    <td className="p-2 border">{data.age} tahun</td>
                    <td className="p-2 border">{data.height} cm</td>
                    <td className="p-2 border">{data.weight} kg</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(data.id)}
                        className="p-1 text-red-500 font-poppins"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => handleUpdate(data.id)}
                        className="p-1 text-green-500 font-poppins"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {alertMessage && (
        <div className="absolute p-4 text-white bg-green-500 font-poppins top-10 right-5">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default App;
