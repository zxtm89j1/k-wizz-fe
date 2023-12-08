// MyQuestions.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { GlobalLoading, show, hide } from "react-global-loading";
import Choices from "./Choices";
import Swal from "sweetalert2";
import EditQuestionForm from "../components/EditQuestionForm";

const MyQuestions = () => {
  const [questions, setQuestions] = useState();
  let userId = localStorage.getItem("user_id");
  let token = localStorage.getItem("authTokenJWT");

  if (!token) {
    window.location.href = "/";
  }

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let getQuestions = async () => {
      show();

      try {
        let response = await axios.get(
          "http://localhost:8000/api/auth/myquestions/" + userId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setQuestions((prevQuestions) => response.data.success);
        }
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Ok",
        });

        hide();
      }
    };

    getQuestions();
  }, [token, userId]);

  const handleQuestionDelete = async (e, id) => {
    e.preventDefault();
    alert("This question with id: " + id + " " + "will be deleted!!!");
  };

  const [questionToEdit, setQuestionToEdit] = useState();

  const handleQuestionEdit = async (e, question) => {
    e.preventDefault();

    await setQuestionToEdit((prevQuestionToEdit) => question);
    await setIsEditing((prevIsEditing) => true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-r from-pink-300 to-purple-500 py-10 min-h-screen">
      <h1 className="text-4xl text-center font-bold mb-6 text-pink-800">
        Your Questions
      </h1>
      <div className="flex justify-center items-center flex-col">
        <GlobalLoading />

        {isEditing ? (
          <EditQuestionForm
            question={questionToEdit}
            onCancel={handleCancelEdit}
          />
        ) : (
          <></>
        )}

        {questions ? hide() : <></>}

        {questions ? (
          questions.map((question, index) => (
            <div
              key={question.id}
              className="border border-pink-500/50 p-4 m-4 rounded-md bg-pink-200 flex justify-between items-center w-[70rem]"
            >
              <div>
                <div className="text-lg font-bold mb-2 w-[50rem]">
                  {index + 1 + ". " + question.question_text}

                  <Choices
                    key={question.id}
                    id={question.id}
                    choices={question.choices}
                  />
                </div>
              </div>

              <div className="w-[15rem] flex justify-between">
                <button
                  onClick={(e) => handleQuestionEdit(e, question)}
                  className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 w-[5rem]"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => handleQuestionDelete(e, question.id)}
                  className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 w-[5rem]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No questions. Please add some!</div>
        )}
      </div>
    </div>
  );
};

export default MyQuestions;
