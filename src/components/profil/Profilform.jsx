import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Profile = () => {
  const [formData, setFormData] = useState({
    token: "",
    name: "",
    address: "",
    nik: "", // Change to NIK
    children: [{ childName: "", childNik: "" }], // Change to childNik
  });

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = Cookies.get("authToken");

    if (!authToken) {
      console.error("Authentication token not available");
      setLoading(false);
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      token: authToken,
    }));

    fetch("http://localhost:3003/profil", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "childName" || name === "childNik") {
      const newChildren = [...formData.children];
      newChildren[index][name] = value;

      setFormData((prevFormData) => ({
        ...prevFormData,
        children: newChildren,
      }));
    } else if (name === "nik") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        nik: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleAddChild = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      children: [...prevFormData.children, { childName: "", childNik: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const authToken = formData.token;

    if (!authToken) {
      console.error("Authentication token not available");
      return;
    }

    fetch("http://localhost:3003/profil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfiles([...profiles, data]);
        setFormData({
          token: authToken,
          name: "",
          address: "",
          nik: "", // Reset NIK
          children: [{ childName: "", childNik: "" }],
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Formulir berhasil dikirim!",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/dashboard";
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="max-w-4xl p-8 mx-auto mt-8 border-2 rounded-lg shadow-lg border-slate-300 bg-secondary">
      <h2 className="mb-6 text-3xl font-semibold">Profil Stunting</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Nama Ibu/Orangtua
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Alamat
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) => handleChange(e)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="nik"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            NIK
          </label>
          <input
            type="text"
            id="nik"
            name="nik"
            value={formData.nik}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Data Anak
          </label>
          {formData.children.map((child, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                name="childName"
                value={child.childName}
                onChange={(e) => handleChange(e, index)}
                placeholder="Nama Anak"
                className="w-1/2 px-4 py-2 mr-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="childNik"
                value={child.childNik}
                onChange={(e) => handleChange(e, index)}
                placeholder="NIK Anak"
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddChild}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Tambah Anak
          </button>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Simpan Profil
        </button>
      </form>
    </div>
  );
};

export default Profile;
