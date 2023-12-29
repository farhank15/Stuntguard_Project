import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const apiUrlAnak = "http://localhost:3001/anak";
const apiUrlProfil = "http://localhost:3003/profil";

const Form = ({ setGroupedData }) => {
  const [formData, setFormData] = useState({
    token: "",
    name: "",
    age: "",
    height: "",
    weight: "",
    day: "",
    month: "",
    year: "2023",
  });

  const [alertMessage, setAlertMessage] = useState(null);
  const [childNames, setChildNames] = useState([]);

  useEffect(() => {
    const fetchChildNames = async () => {
      try {
        const token = Cookies.get("authToken");
        setFormData((prevFormData) => ({ ...prevFormData, token }));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get(apiUrlProfil);

        if (Array.isArray(response.data) && response.data.length > 0) {
          const matchingProfile = response.data.find(
            (profile) => profile.token === token
          );

          if (matchingProfile) {
            const childNames = matchingProfile.children.map(
              (child) => child.childName
            );

            setChildNames(childNames);
          } else {
            console.log("No matching profile found");
          }
        } else {
          console.log("No profil data found");
        }
      } catch (error) {
        console.error("Error fetching child names:", error);
      }
    };

    fetchChildNames();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiUrlAnak, formData);
      const responseGet = await axios.get(apiUrlAnak);
      setGroupedData(responseGet.data);

      // Replace the following line
      Swal.fire({
        icon: "success",
        title: "Data berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);

      // Replace the following line
      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan data",
      });
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const generateDaysOptions = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return days;
  };

  const generateMonthsOptions = () => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return months.map((month, index) => (
      <option key={month} value={month}>
        {month}
      </option>
    ));
  };

  return (
    <div>
      <h1 className="mb-4 text-3xl font-semibold">Form Pertumbuhan Anak</h1>
      {alertMessage && (
        <div className="absolute p-4 font-semibold text-white bg-green-500 right-5 top-10">
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Nama Anak
          </label>
          <select
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border border-gray-300"
          >
            <option value="">Pilih Nama Anak</option>
            {childNames.map((childName, index) => (
              <option key={index} value={childName}>
                {childName}
              </option>
            ))}
          </select>
          {childNames.length === 0 && (
            <p className="font-sans text-[14px] text-red-500">
              Isi data dashboard terlebih dahulu!
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-600"
          >
            Umur Anak
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="height"
            className="block text-sm font-medium text-gray-600"
          >
            Tinggi Anak (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-600"
          >
            Berat Anak (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="mb-4">
            <label
              htmlFor="day"
              className="block text-sm font-medium text-gray-600"
            >
              Tanggal
            </label>
            <select
              id="day"
              name="day"
              value={formData.day}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300"
            >
              <option value="">Pilih Tanggal</option>
              {generateDaysOptions()}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-600"
            >
              Bulan
            </label>
            <select
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300"
            >
              <option value="">Pilih Bulan</option>
              {generateMonthsOptions()}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-600"
            >
              Tahun
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>
        </div>
        <button type="submit" className="p-2 text-white bg-blue-500 rounded-md">
          Simpan Data
        </button>
      </form>
    </div>
  );
};

export default Form;
