import { useEffect, useState } from "react";
import kyler from "../images/kyler.webp";
import axios from "axios";
import {
  GlobalLoading,
  showLoading,
  globalLoading,
  show,
  hide,
} from "react-global-loading";
import Swal from "sweetalert2";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    account_type: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [inputName]: inputValue,
    }));
  };

  const submitData = async (e) => {
    e.preventDefault();

    show();

    try {
      let response = await axios.post("http://localhost:8000/signup", formData);

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "Ok",
        })
          .then(hide())
          .then(() => {
            window.location.reload();
          });

        await console.log(response);
      }

      // alert(message);

      console.log(response);
    } catch (error) {
      if (error.response.data.errors) {
        let errorObject = await error.response.data.errors;

        let errorMessages = {
          title: "Error!",
          messages: [],
          icon: "error",
          confirmButtonText: "Ok",
        };

        let errorMessageText = "";
        // Using Object.entries to get key-value pairs and then iterating over them
        for (let [index, [key, messages]] of Object.entries(
          errorObject
        ).entries()) {
          for (let i = 0; i < messages.length; i++) {
            errorMessages.messages.push(`${messages[i]}`);
          }
        }

        errorMessageText += errorMessages.messages.join("\r\n");

        errorMessages.text = errorMessageText;

        delete errorMessages.messages;

        await Swal.fire(errorMessages);
        await hide();
      } else {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Ok",
        });

        await hide();
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-purple-300 flex justify-center items-center relative">
      <GlobalLoading />
      <form
        className="p-5 bg-white rounded-lg shadow-lg md:w-96 sm:w-80 xs:w-72 z-20"
        onSubmit={submitData}
      >
        <div className="self-start font-fredoka text-gray-800 sm:text-2xl mb-4">
          Sign Up
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
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-800 text-sm sm:text-base mb-1 font-poppins"
          >
            Username:
          </label>
          <input
            className="w-full border-2 rounded-md px-1 py-0.5 sm:px-2 sm:py-1 border-pink-500/50 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="account_type"
            className="block text-gray-800 text-sm sm:text-base mb-1 font-poppins"
          >
            Account Type:
          </label>
          <select
            className="w-full border-2 border-pink-500/50 focus:border-pink-700 focus:outline-none focus:ring-0 rounded-md px-1 py-0.5 sm:px-2 sm:py-1 font-fredoka"
            name="account_type"
            onChange={handleChange}
            value={formData.accountType}
          >
            <option value=""></option>
            <option value="admin" className="font-fredoka">
              Admin
            </option>
            <option value="player" className="font-fredoka">
              Player
            </option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="block text-gray-800 text-sm sm:text-base mb-1 font-poppins"
          >
            First Name:
          </label>
          <input
            className="w-full border-2 border-pink-500/50 rounded-md px-1 py-0.5 sm:px-2 sm:py-1 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
            type="text"
            name="first_name"
            onChange={handleChange}
            value={formData.fname}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="last_name"
            className="block text-gray-800 text-sm sm:text-base mb-1 font-poppins"
          >
            Last Name:
          </label>
          <input
            className="w-full border-2 border-pink-500/50 rounded-md px-1 py-0.5 sm:px-2 sm:py-1 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
            type="text"
            name="last_name"
            onChange={handleChange}
            value={formData.lname}
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
            value={formData.password}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirm_password"
            className="block text-gray-800 text-sm sm:text-base mb-1 font-poppins"
          >
            Confirm Password:
          </label>
          <input
            className="w-full border-2 border-pink-500/50 rounded-md px-1 py-0.5 sm:px-2 sm:py-1 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
            type="password"
            name="confirm_password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="w-full md:w-3/4 bg-pink-500 text-white rounded-md py-2 px-4 hover:bg-pink-600 transition duration-300 font-fredoka"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>

      <img
        src={kyler}
        alt="kyler"
        className="h-[30rem] md:h-[40rem] lg:h-[50rem] absolute bottom-0 right-0 z-10"
      />
    </div>
  );
};

export default Signup;
