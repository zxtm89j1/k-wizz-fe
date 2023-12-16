// MyQuestions.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { GlobalLoading, show, hide } from "react-global-loading";
import Choices from "./Choices";
import Swal from "sweetalert2";
import EditQuestionForm from "../components/EditQuestionForm";
import searchIcon from "../images/searchicon.png";

const MyQuestions = () => {
  const [questions, setQuestions] = useState([]);
  let userId = localStorage.getItem("user_id");

  const [token, setToken] = useState(localStorage.getItem("authTokenJWT"));
  const [isSearching, setIsSearching] = useState(false);

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
          await setQuestions((prevQuestions) => response.data.success);

          hide();
        }
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    getQuestions();
  }, [token, userId]);

  const handleQuestionDelete = async (e, id) => {
    show();
    e.preventDefault();

    try {
      let response = await axios.delete(
        `http://localhost:8000/api/auth/deletequestion/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        await Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });

        await hide();

        window.location.reload();
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      await Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });

      hide();
    }
  };

  const [questionToEdit, setQuestionToEdit] = useState();
  const [query, setQuery] = useState([]);
  const [queryResults, setQueryResults] = useState([]);

  const handleQuestionEdit = async (e, question) => {
    e.preventDefault();

    await setQuestionToEdit((prevQuestionToEdit) => question);
    await setIsEditing((prevIsEditing) => true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleChangeQuery = async (e) => {
    if (!isSearching) {
      setIsSearching((prev) => true);
    }

    setQueryResults((prev) =>
      questions.filter((question) => {
        const hasMatchingQuestionText = question.question_text
          .toLowerCase()
          .includes(query.toLowerCase());

        const hasMatchingChoice = question.choices.some((choice) =>
          choice.choice_text.toLowerCase().includes(query.toLowerCase())
        );

        return hasMatchingQuestionText || hasMatchingChoice;
      })
    );

    await setQuery((prev) => e.target.value);
  };

  useEffect(() => {
    if (!query) {
      setIsSearching((prev) => false);
    }
  }, [query]);

  return (
    <div className="bg-gradient-to-r from-pink-300 to-purple-500 py-10 min-h-screen">
      <h1 className="text-lg md:text-4xl text-center font-bold mb-6 text-pink-800">
        Your Questions
      </h1>

      <form className="flex justify-center">
        <input
          type="text"
          className="w-[20vh] text-xs lg:text-base lg:w-[50vh] rounded-md px-1 py-0.5 sm:px-2 sm:py-1 border-pink-500/50 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
          onChange={handleChangeQuery}
          placeholder="Enter a search term here..."
        />

        <img
          className="h-[1rem] w-[1rem] md:w-[2rem] md:h-[2rem] ml-2"
          src={searchIcon}
          alt="search--v1"
        />
      </form>

      {isSearching && !queryResults.length && (
        <div className="text-center mt-10 text-xl lg:text-2xl">
          No related questions...
        </div>
      )}

      {queryResults.length && isSearching ? (
        <div className="flex justify-center items-center flex-col">
          {queryResults.map((question, index) => (
            <div
              key={question.id}
              className="border border-pink-500/50 p-4 m-4 rounded-md bg-pink-200 flex justify-between sm:items-center w-[40vh] sm:w-[60vh] lg:w-[100vh] xl:w-[75rem] flex-col sm:flex-row"
            >
              <div className="text-sm md:text-base font-bold mb-0 sm:mb-2">
                {index + 1 + ". " + question.question_text}

                <Choices
                  key={question.id}
                  id={question.id}
                  choices={question.choices}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-normal sm:ml-5">
                <button
                  onClick={(e) => handleQuestionEdit(e, question)}
                  className="bg-pink-500 text-white text-xs lg:text-sm px-4 py-2 mb-5 mt-0 rounded-md hover:bg-pink-600 w-[5rem]"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => handleQuestionDelete(e, Number(question.id))}
                  className="bg-pink-500 text-white text-xs lg:text-sm px-4 py-2 mb-5 mt-0 rounded-md hover:bg-pink-600 w-[5rem] m-0 xl:ml-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      {isEditing && (
        <EditQuestionForm
          question={questionToEdit}
          onCancel={handleCancelEdit}
        />
      )}

      {!isSearching && (
        <div>
          <div className="flex justify-center items-center flex-col">
            <GlobalLoading />

            {/* {questions.length != 0 ? hide() : <></>} */}

            {questions.length ? (
              questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border border-pink-500/50 p-4 m-4 rounded-md bg-pink-200 flex justify-between sm:items-center w-[40vh] sm:w-[60vh] lg:w-[100vh] xl:w-[75rem] flex-col sm:flex-row"
                >
                  <div className="text-sm md:text-base font-bold mb-0 sm:mb-2">
                    {index + 1 + ". " + question.question_text}

                    <Choices
                      key={question.id}
                      id={question.id}
                      choices={question.choices}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-normal sm:ml-5">
                    <button
                      onClick={(e) => handleQuestionEdit(e, question)}
                      className="bg-pink-500 text-white text-xs lg:text-sm px-4 py-2 mb-5 mt-0 rounded-md hover:bg-pink-600 w-[5rem]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) =>
                        handleQuestionDelete(e, Number(question.id))
                      }
                      className="bg-pink-500 text-white text-xs lg:text-sm px-4 py-2 mb-5 mt-0 rounded-md hover:bg-pink-600 w-[5rem] m-0 xl:ml-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-10 text-xl lg:text-2xl">
                No questions. Please add some!
              </div>
            )}
          </div>
          {isSearching && (
            <div>
              <a href="https://icons8.com/icon/132/search">Search</a> icon by{" "}
              <a href="https://icons8.com">Icons8</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyQuestions;
