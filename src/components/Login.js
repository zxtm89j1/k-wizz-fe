import axios from "axios";
import yoon from "../images/yoon.webp";
import { useState } from "react";
import { GlobalLoading, show, hide } from "react-global-loading";
import Swal from "sweetalert2";

const Login = () => {
  let token;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      show();
      let response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        token = response.data.access_token;

        localStorage.setItem("authTokenJWT", token);

        let accountTypeResponse = await axios.get(
          "http://127.0.0.1:8000/api/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let account_type = await localStorage.setItem(
          "account_type",
          accountTypeResponse.data.account_type
        );

        let user_id = await localStorage.setItem(
          "user_id",
          accountTypeResponse.data.id
        );

        await Swal.fire({
          title: "Success!",
          text: "Logged in successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });

        hide();

        const previousPageUrl = document.referrer;

        if (previousPageUrl === "http://localhost:3000/play") {
          window.location.href = "/play";
        } else {
          window.location.href = "/";
        }
      }
    } catch (error) {
      if (error.response.request.status === 401) {
        console.log(error);
        await Swal.fire({
          title: "Error!",
          text: error.response.data.error,
          icon: "error",
          confirmButtonText: "Ok",
        });

        hide();
        console.log(error);
      } else {
        await Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        hide();
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-purple-300 flex justify-center items-center relative">
      <GlobalLoading />
      <form
        className="p-5 bg-white rounded-lg shadow-lg md:w-96 sm:w-80 xs:w-72 z-20"
        onSubmit={handleSubmit}
      >
        <div className="self-start font-fredoka text-gray-800 sm:text-2xl mb-4">
          Login
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-800 text-sm sm:text-base mb-1 font-poppins"
          >
            Email:
          </label>
          <input
            className="w-full border-2 rounded-md px-1 py-0.5 sm:px-2 sm:py-1 border-pink-500/50 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-800 text-sm sm:text-base mb-1 font-poppins"
          >
            Password:
          </label>
          <input
            className="w-full border-2 border-pink-500/50 rounded-md px-1 py-0.5 sm:px-2 sm:py-1 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="w-full md:w-3/4 bg-pink-500 text-white rounded-md py-2 px-4 hover:bg-pink-600 transition duration-300 font-fredoka"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

      <img
        src={yoon}
        alt="kyler"
        className="h-[30rem] md:h-[40rem] lg:h-[60rem] absolute bottom-0 right-0 z-10"
      />
    </div>
  );
};

export default Login;
