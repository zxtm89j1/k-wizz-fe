import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { GlobalLoading, show, hide } from "react-global-loading";
import rv from "../images/rv.webp";

const AddQuestion = () => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("account_type"));
  const token = localStorage.getItem("authTokenJWT");

  if (isAdmin !== "admin") {
    window.location.href = "/";
  }

  const [question, setQuestion] = useState({
    question_text: "",
    correct_answer: "",
    user_id: localStorage.getItem("user_id"),
    choices: [
      { value_in_frontend: "", choice_text: "" },
      { value_in_frontend: "", choice_text: "" },
      { value_in_frontend: "", choice_text: "" },
      { value_in_frontend: "", choice_text: "" },
    ],
  });

  const handleChangeQuestion = (e) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeChoices = (e, index) => {
    const { name, value, dataset } = e.target;

    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      choices: prevQuestion.choices.map((choice, i) =>
        i === index
          ? {
              ...choice,
              value_in_frontend: dataset.front_end_value,
              choice_text: value,
            }
          : choice
      ),
    }));
  };

  const handleSubmit = async (e) => {
    show();
    e.preventDefault();
    console.log(question);

    try {
      let response = await axios.post(
        "http://localhost:8000/api/auth/addquestion",
        question,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        await Swal.fire({
          title: "Success!",
          text: "Question saved successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });

        await hide();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      if (typeof error.response.data.message === "string") {
        console.log(error);
        await Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        await Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }

      hide();
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-[100vh] px-2 bg-gradient-to-tr from-pink-500 via-white to-purple-300 relative overflow-hidden">
      <img
        src={rv}
        alt="irene_red velvet"
        className="absolute right-0 bottom-0"
      />
      <GlobalLoading />
      <h2 className="text-2xl font-bold mb-4 text-pink-600 z-20 ">
        Save a Question
      </h2>
      <form onSubmit={handleSubmit} className="max-w-md w-full z-20">
        <input
          className="w-full border-2 border-pink-500/50 rounded-md px-4 py-2 mb-4 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
          type="text"
          onChange={handleChangeQuestion}
          name="question_text"
          placeholder="Question Text"
          required
        />

        <p className="text-sm text-gray-600 mb-4 text-center">
          Please click at least one radio button to identify the correct answer.
        </p>

        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="mb-4">
            <input
              type="radio"
              value={index}
              name="correct_answer"
              onChange={handleChangeQuestion}
              className="appearance-none border-2 border-pink-500/50 rounded-full w-6 h-6 checked:bg-pink-500 checked:border-transparent focus:outline-none"
              required
            />
            <input
              name={`choice${index}`}
              className="w-full border-2 border-pink-500/50 rounded-md px-4 py-2 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
              type="text"
              data-front_end_value={index}
              onChange={(e) => handleChangeChoices(e, index - 1)}
              placeholder={`Choice ${index}`}
              required
            />
          </div>
        ))}

        <button
          className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 focus:border-pink-700 focus:outline-none focus:ring-0 w-[100%]"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
