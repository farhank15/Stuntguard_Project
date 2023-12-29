import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const EditProfil = () => {
  const [formData, setFormData] = useState({
    id: "",
    token: "",
    name: "",
    address: "",
    nik: "",
    children: [{ childName: "", childNik: "" }],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = Cookies.get("authToken");

    if (!authToken) {
      console.error("Token otentikasi tidak tersedia");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3003/profil`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Mencari profil dengan token yang cocok
        const matchingProfile = data.find(
          (profile) => profile.token === authToken
        );

        if (matchingProfile) {
          setFormData({
            id: matchingProfile.id || "",
            token: matchingProfile.token,
            name: matchingProfile.name || "",
            address: matchingProfile.address || "",
            nik: matchingProfile.nik || "",
            children:
              matchingProfile.children.map((child) => ({
                childName: child.childName || "",
                childNik: child.childNik || "",
              })) || [],
          });
        } else {
          console.error("Profil dengan token yang cocok tidak ditemukan");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "childName" || name === "childNik") {
      const newChildren = [...formData.children];
      newChildren[index] = {
        ...newChildren[index],
        [name]: value,
      };

      setFormData((prevFormData) => ({
        ...prevFormData,
        children: newChildren,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const authToken = formData.token;

    if (!authToken) {
      console.error("Token otentikasi tidak tersedia");
      return;
    }

    fetch(`http://localhost:3003/profil/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data berhasil diperbarui!",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/dashboard";
        });
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleAddChild = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      children: [...prevFormData.children, { childName: "", childNik: "" }],
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl p-8 mx-auto mt-8 border-2 rounded-lg shadow-lg border-slate-300 bg-secondary">
      <h2 className="mb-6 text-3xl font-semibold">Edit Profil</h2>
      <form onSubmit={handleUpdate} className="mb-8">
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

export default EditProfil;
