// StuntingCalculator.js
import React, { useState } from "react";
import maleData from "./maleData";
import femaleData from "./femaleData";

const StuntingCalculator = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [analysisResult, setAnalysisResult] = useState(null);

  //  button reset
  const handleReset = () => {
    setGender("");
    setAge("");
    setHeight("");
    setWeight("");
    setAnalysisResult(null);
  };

  const handleCalculate = () => {
    const errors = {};

    // Validasi input
    if (!gender) {
      errors.gender = "Jenis Kelamin harus dipilih";
    }
    if (!age) {
      errors.age = "Usia harus diisi";
    }
    if (!height) {
      errors.height = "Tinggi badan harus diisi";
    }
    if (!weight) {
      errors.weight = "Berat badan harus diisi";
    }

    if (Object.keys(errors).length > 0) {
      // Terdapat error validasi, tampilkan pesan kesalahan
      setValidationErrors(errors);
      setAnalysisResult(null);
      return;
    }

    // Logika deteksi stunting

    const ageInt = parseInt(age);
    const result = checkStunting(ageInt, height, weight, gender);

    // Tampilkan feedback
    setValidationErrors({
      gender: "",
      age: "",
      height: "",
      weight: "",
    });
    setAnalysisResult(result);
  };

  const checkStunting = (age, height, weight, gender) => {
    const data = gender === "male" ? maleData : femaleData;
    const range = data.find((item) => item.age === age);
    const tbBbRatio = height / weight;

    if (weight < range.weight.min && height < range.height.min) {
      return {
        isStunting: true,
        tbBbRatio,
        message: "Anak mengalami stunting",
        heightRange: "Kurang",
        weightRange: "Kurang",
        clustering: "Golongan 4",
      };
    } else if (weight < range.weight.min && height > range.height.max) {
      return {
        isStunting: true,
        tbBbRatio,
        message:
          "mungkin anak kurang gizi, Tinggi badan anak di atas rata-rata tapi berat badan anak kurang. ",
        heightRange: "Lebih",
        weightRange: "Kurang",
        clustering: "Golongan 2",
      };
    } else if (weight > range.weight.max && height < range.height.min) {
      return {
        isStunting: true,
        tbBbRatio,
        message:
          "Tinggi badan dan berat badan anak tidak ideal mungkin anak mengalami stunting, segera konsulasikan ke dokter. ",
        heightRange: "Kurang",
        weightRange: "Lebih",
        clustering: "Golongan 4",
      };
    } else if (weight > range.weight.max && height > range.height.max) {
      return {
        isStunting: true,
        tbBbRatio,
        message:
          "Anak tumbuh normal tinggi anak di atas rata-rata tapi berat badan anak sedikit berlebihan. ",
        heightRange: "Lebih",
        weightRange: "Lebih",
        clustering: "Golongan 2",
      };
    } else if (height < range.height.min) {
      return {
        isStunting: true,
        tbBbRatio,
        message:
          "Anak mungkin mengalami stunting, berat badan anak ideal tapi tinggi anak kurang",
        heightRange: "Kurang",
        weightRange: "Normal",
        clustering: "Golongan 3",
      };
    } else if (weight < range.weight.min) {
      return {
        isStunting: true,
        tbBbRatio,
        message:
          "Anak mungkin mengalami stunting, tinggi badan anak ideal tapi berat anak kurang",
        heightRange: "Normal",
        weightRange: "Kurang",
        clustering: "Golongan 2",
      };
    } else if (weight > range.weight.max) {
      return {
        isStunting: true,
        tbBbRatio,
        message: "Anak tumbuh normal, berat badan anak berlebihan",
        heightRange: "Normal",
        weightRange: "Lebih",
        clustering: "Golongan 2",
      };
    } else if (height > range.height.max) {
      return {
        isStunting: true,
        tbBbRatio,
        message: "Anak tumbuh normal, tinggi badan anak diatas rata-rata",
        heightRange: "Lebih",
        weightRange: "Normal",
        clustering: "Golongan 1",
      };
    } else if (
      height >= range.height.min &&
      height <= range.height.max &&
      weight >= range.weight.min &&
      weight <= range.weight.max
    ) {
      // Jika tinggi dan berat badan anak berada dalam rentang normal
      return {
        isStunting: false,
        tbBbRatio,
        message: "Anak tumbuh dengan Normal",
        heightRange: "Normal",
        weightRange: "Normal",
        clustering: "Golongan 1",
      };
    } else {
      // Jika tinggi atau berat badan anak di luar rentang normal
      return {
        isStunting: true,
        tbBbRatio,
        message: "Anak mengalami stunting",
        heightRange: "Tidak Diketahui",
        weightRange: "Tidak Diketahui",
        clustering: "Golongan 4",
      };
    }
  };

  return (
    <div className="grid items-center justify-center grid-cols-1 p-10 px-5 md:grid-cols-2 bg-secondary">
      <div className="w-full h-[600px] p-8 bg-white border rounded shadow-md font-poppins">
        <h2 className="mb-4 text-2xl font-bold">Deteksi Stunting</h2>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="gender"
          >
            Jenis Kelamin
          </label>
          <select
            className={`w-full p-2 border rounded cursor-pointer ${
              validationErrors.gender ? "border-red-500" : ""
            }`}
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Pilih Jenis Kelamin</option>
            <option value="male" className="cursor-pointer">
              Laki-laki
            </option>
            <option value="female" className="cursor-pointer">
              Perempuan
            </option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="age"
          >
            Usia (tahun)
          </label>
          <input
            type="number"
            id="age"
            className="w-full p-2 border rounded"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        {validationErrors.age && (
          <p className="mb-3 -mt-3 font-mono text-sm text-red-500">
            {validationErrors.age}
          </p>
        )}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="height"
          >
            Tinggi (cm)
          </label>
          <input
            type="number"
            id="height"
            className="w-full p-2 border rounded"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        {validationErrors.height && (
          <p className="mb-3 -mt-3 font-mono text-sm text-red-500">
            {validationErrors.height}
          </p>
        )}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="weight"
          >
            Berat (kg)
          </label>
          <input
            type="number"
            id="weight"
            className="w-full p-2 border rounded"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        {validationErrors.weight && (
          <p className="mb-3 -mt-3 font-mono text-sm text-red-500">
            {validationErrors.weight}
          </p>
        )}
        <div className="flex justify-between">
          <button
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleCalculate}
          >
            Deteksi
          </button>
          <button
            className="p-2 px-4 text-white bg-red-500 rounded hover:bg-red-700"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {/* form hasil analisis */}
      <div className="w-full p-8 h-[600px] bg-white border rounded shadow-md font-poppins">
        <h2 className="mb-4 text-2xl font-bold">Hasil Analisis</h2>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="age"
          >
            Tinggi badan menurut umur
          </label>
          <p className="h-10 p-2 my-auto border-2 rounded-md">
            {analysisResult ? analysisResult.heightRange : ""}
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="age"
          >
            Berat badan menurut umur
          </label>
          <p className="h-10 p-2 my-auto border-2 rounded-md">
            {analysisResult ? analysisResult.weightRange : ""}
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="height"
          >
            Rasio tinggi badan / Berat badan
          </label>
          <p className="h-10 p-2 my-auto border-2 rounded-md">
            {analysisResult ? analysisResult.tbBbRatio.toFixed(2) : ""}
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="weight"
          >
            Penggolongan
          </label>
          <p className="h-10 p-2 my-auto border-2 rounded-md">
            {analysisResult ? analysisResult.clustering : ""}
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="weight"
          >
            Pesan
          </label>
          <p className="h-24 p-2 my-auto border-2 rounded-md">
            {analysisResult ? analysisResult.message : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StuntingCalculator;
