import { Link } from "react-router-dom";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "@chakra-ui/react";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const generateRandomToken = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const validateForm = () => {
    let validationErrors = {};

    // Validasi First Name
    if (!registerData.firstName.trim()) {
      validationErrors.firstName = "Please enter your first name";
    }

    // Validasi Last Name
    if (!registerData.lastName.trim()) {
      validationErrors.lastName = "Please enter your last name";
    }

    // Validasi Email
    if (!registerData.email.trim()) {
      validationErrors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      validationErrors.email = "Invalid email address";
    }

    // Validasi Password
    if (!registerData.password.trim()) {
      validationErrors.password = "Please enter your password";
    } else if (registerData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(validationErrors);

    // Return true if there are no validation errors
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = generateRandomToken();
    const dataWithToken = { ...registerData, token };

    // Validate the form
    const isValid = validateForm();

    if (isValid) {
      try {
        setLoading(true);
        // Simulate a delay for demonstration purposes
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Perform the registration logic
        const response = await axios.post(
          "http://localhost:3002/users",
          dataWithToken
        );

        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            showConfirmButton: false,
            timer: 1500,
          });

          // Reset the form after successful registration
          setRegisterData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
        } else {
          // Display an error message if the registration fails
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
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
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="p-8 m-auto bg-white rounded shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block pt-3 mb-2 text-sm text-gray-600"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={registerData.firstName}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  firstName: event.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your First Name"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm text-gray-600"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={registerData.lastName}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  lastName: event.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Last Name"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={registerData.email}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  email: event.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={registerData.password}
                onChange={(event) =>
                  setRegisterData({
                    ...registerData,
                    password: event.target.value,
                  })
                }
                className="w-full p-2 pr-10 border border-gray-300 rounded"
                placeholder="Your Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <Button
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            type="submit"
            colorScheme="blue"
            size="lg"
            rounded="md"
            isLoading={loading}
            loadingText="Registering..."
          >
            Register
          </Button>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 cursor-pointer">
              Log in here
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
