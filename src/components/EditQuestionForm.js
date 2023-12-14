import axios from "axios";
import { GlobalLoading, show, hide } from "react-global-loading";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditQuestionForm = (props) => {
  let question = props.question;
  let token = localStorage.getItem("authTokenJWT");
  const handleCancel = () => {
    // Call the function to set setIsEditing to false
    props.onCancel();
  };

  const [questionToSubmit, setQuestionToSubmit] = useState({
    id: question.id,
    question_text: question.question_text,
    correct_answer: question.correct_answer,
    choices: question.choices,
  });

  const questionCopy = JSON.parse(JSON.stringify(question));

  const [questionNewCopy, setQuestionNewCopy] = useState(questionCopy);

  const [selectedChoice, setSelectedChoice] = useState(question.correct_answer);

  const handleRadioChange = async (e) => {
    await setSelectedChoice((prevSelectedChoice) => e.target.value);

    setQuestionNewCopy((prevQuestionNewCopy) => ({
      ...prevQuestionNewCopy,
      correct_answer: Number(e.target.value),
    }));
  };

  const handleQuestionText = (e) => {
    setQuestionNewCopy((prevQuestionNewCopy) => ({
      ...prevQuestionNewCopy,
      question_text: e.target.value,
    }));
  };

  const handleChoicesChange = async (e, index) => {
    const newChoices = [...questionNewCopy.choices];

    newChoices[index].choice_text = e.target.value;

    await setQuestionNewCopy((prevQuestionNewCopy) => ({
      ...prevQuestionNewCopy,
      choices: newChoices,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    show();

    console.log(questionNewCopy);

    try {
      let response = await axios.patch(
        `http://localhost:8000/api/auth/editquestion/${props.question.id}`,
        questionNewCopy,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        await console.log(response);
        await Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });

        await hide();
        window.location.reload();
      }
    } catch (error) {
      if (error.response.data.error) {
        await Swal.fire({
          title: "Error!",
          text: error.response.data.error,
          icon: "error",
          confirmButtonText: "Ok",
        });
        hide();
      } else {
        await Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        hide();
      }
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-[100vh] fixed top-0 bottom-0 left-0 right-0 bg-gray-500 bg-opacity-60">
      <GlobalLoading />
      <form
        className="max-w-md w-full bg-white z-20 p-5 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2
          className="text-2xl font-bold text-right text-pink-600 z-20 cursor-pointer"
          onClick={handleCancel}
        >
          X
        </h2>
        <h2 className="text-2xl text-center font-bold mb-4 text-pink-600 z-20 ">
          Edit a Question
        </h2>
        <input
          className="w-full border-2 border-pink-500/50 rounded-md px-4 py-2 mb-4 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
          type="text"
          name="question_text"
          placeholder="Question Text"
          required
          value={questionNewCopy.question_text}
          onChange={handleQuestionText}
        />

        <p className="text-sm mb-4">
          Please click at least one radio button to identify the correct answer.
        </p>

        {questionToSubmit.choices ? (
          questionToSubmit.choices.map((choice, index) => (
            <div className="mb-4">
              <input
                type="radio"
                name="correct_answer"
                className="appearance-none border-2 border-pink-500/50 rounded-full w-6 h-6 checked:bg-pink-500 checked:border-transparent focus:outline-none"
                required
                checked={
                  Number(selectedChoice) === Number(choice.value_in_frontend)
                }
                onChange={handleRadioChange}
                value={choice.value_in_frontend}
              />
              <input
                className="w-full border-2 border-pink-500/50 rounded-md px-4 py-2 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
                type="text"
                required
                value={questionNewCopy.choices[index].choice_text}
                onChange={(e) => handleChoicesChange(e, index)}
              />
            </div>
          ))
        ) : (
          <></>
        )}

        <button
          className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 focus:border-pink-700 focus:outline-none focus:ring-0"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditQuestionForm;
