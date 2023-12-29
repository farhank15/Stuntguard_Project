import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@chakra-ui/react";
import femaleData from "../../components/calculate/femaleData";
import maleData from "../../components/calculate/maleData";

const EditChildForm = () => {
  const { id } = useParams(); // Get the child ID from the URL
  const [childData, setChildData] = useState({
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/children/${id}`
        );
        setChildData(response.data);
      } catch (error) {
        console.error("Error fetching child data:", error.message);
      }
    };

    fetchChildData();
  }, [id]);

  const validateForm = () => {
    let validationErrors = {};

    for (const field in childData) {
      if (typeof childData[field] === "string" && !childData[field].trim()) {
        validationErrors[field] = `Please enter the ${field}`;
      } else if (
        (field === "age" || field === "height" || field === "weight") &&
        isNaN(childData[field])
      ) {
        validationErrors[field] = `Please enter a valid ${field}`;
      }
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const checkStunting = (age, height, weight, gender) => {
    const data = gender.toLowerCase() === "male" ? maleData : femaleData;
    const range = data.find((item) => item.age === age);
    const tbBbRatio = height / weight;

    if (weight < range.weight.min && height < range.height.min) {
      return {
        isStunting: true,
        tbBbRatio,
        message:
          "Anak mengalami stunting. Berat dan tinggi anak kurang dari batas normal.",
      };
    } else if (weight < range.weight.min && height > range.height.max) {
      return {
        isStunting: true,
        tbBbRatio,
        message:
          "Anak mungkin kurang gizi. Tinggi anak di atas rata-rata, tapi berat anak kurang.",
      };
    } else if (weight > range.weight.max && height < range.height.min) {
      return {
        isStunting: true,
        tbBbRatio,
        message:
          "Anak mengalami stunting. Tinggi dan berat badan anak tidak ideal.",
      };
    } else if (weight > range.weight.max && height > range.height.max) {
      return {
        isStunting: true,
        tbBbRatio,
        message:
          "Anak tumbuh normal. Tinggi anak di atas rata-rata, tapi berat anak sedikit berlebihan.",
      };
    } else if (height < range.height.min) {
      return {
        isStunting: true,
        tbBbRatio,
        message:
          "Anak mungkin mengalami stunting. Berat badan anak ideal, tapi tinggi anak kurang.",
      };
    } else if (weight < range.weight.min) {
      return {
        isStunting: true,
        tbBbRatio,
        message:
          "Anak mungkin mengalami stunting. Tinggi badan anak ideal, tapi berat anak kurang.",
      };
    } else if (weight > range.weight.max) {
      return {
        isStunting: true,
        tbBbRatio,
        message: "Anak tumbuh normal. Berat badan anak berlebihan.",
      };
    } else if (height > range.height.max) {
      return {
        isStunting: true,
        tbBbRatio,
        message: "Anak tumbuh normal. Tinggi anak di atas rata-rata.",
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
        message: "Anak tumbuh dengan normal.",
      };
    } else {
      // Jika tinggi atau berat badan anak di luar rentang normal
      return {
        isStunting: true,
        tbBbRatio,
        message: "Anak mengalami stunting.",
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        setLoading(true);

        // Perform the edit logic and check stunting
        const stuntingResult = checkStunting(
          parseInt(childData.age),
          parseFloat(childData.height),
          parseFloat(childData.weight),
          childData.gender
        );

        // Extract the message from stuntingResult
        const { message, tbBbRatio } = stuntingResult;

        // Round TB ratio to three decimal places
        const roundedTbRatio = Number(tbBbRatio.toFixed(3));

        // Send a PUT request to update child data
        const response = await axios.put(
          `http://localhost:3000/children/${id}`,
          {
            name: childData.name,
            gender: childData.gender === "Male" ? "Laki-Laki" : "Perempuan",
            age: childData.age,
            height: childData.height,
            weight: childData.weight,
            result: message,
            tbRatio: roundedTbRatio,
          }
        );

        if (response.status === 200) {
          // Display success message
          Swal.fire({
            icon: "success",
            title: "Child Data Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          // Redirect to the child data page after a delay
          setTimeout(() => {
            window.location.href = "/dataanak";
          }, 2000);
        } else {
          // Display an error message if the update fails
          Swal.fire({
            icon: "error",
            title: "Failed to Update Child Data",
            text: "Please try again",
          });
        }
      } catch (error) {
        // Display an error message if an unexpected error occurs
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "An error occurred",
          text: "Please try again",
        });
      } finally {
        // Reset loading state
        setLoading(false);
      }
    }
  };

  const handleChange = (field, value) => {
    setChildData({
      ...childData,
      [field]: value,
    });
  };

  const handleCancel = () => {
    // Redirect to the monitoring page without making any changes
    window.location.href = "/dataanak";
  };

  return (
    <div className="max-w-md p-4 mx-auto mt-8 bg-gray-100 rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Edit Child Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-600"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={childData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter child's name"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Gender:
          </label>
          <div className="mt-1">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={childData.gender === "Male"}
              onChange={() => handleChange("gender", "Male")}
              className="mr-2"
              required
            />
            <label htmlFor="male" className="mr-4">
              Laki-Laki
            </label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={childData.gender === "Female"}
              onChange={() => handleChange("gender", "Female")}
              className="mr-2"
              required
            />
            <label htmlFor="female">Perempuan</label>
          </div>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-semibold text-gray-600"
          >
            Age:
          </label>
          <input
            type="number"
            id="age"
            value={childData.age}
            onChange={(event) => handleChange("age", event.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter child's age"
          />
          {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="height"
            className="block text-sm font-semibold text-gray-600"
          >
            Height (cm):
          </label>
          <input
            type="number"
            id="height"
            value={childData.height}
            onChange={(event) => handleChange("height", event.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter child's height"
          />
          {errors.height && (
            <p className="text-sm text-red-500">{errors.height}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="weight"
            className="block text-sm font-semibold text-gray-600"
          >
            Weight (kg):
          </label>
          <input
            type="number"
            id="weight"
            value={childData.weight}
            onChange={(event) => handleChange("weight", event.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter child's weight"
          />
          {errors.weight && (
            <p className="text-sm text-red-500">{errors.weight}</p>
          )}
        </div>

        <Button
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
          colorScheme="blue"
          size="lg"
          rounded="md"
          isLoading={loading}
          loadingText={
            <>
              Updating Data...
              {loading && <Spinner ml="3" color="white" size="sm" />}
            </>
          }
        >
          Update Data
        </Button>

        <Button
          className="w-full p-2 mt-3 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={handleCancel}
        >
          Batal
        </Button>
      </form>
    </div>
  );
};

export default EditChildForm;
