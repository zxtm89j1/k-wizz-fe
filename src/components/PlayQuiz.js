import Swal from "sweetalert2";
import { GlobalLoading, show, hide } from "react-global-loading";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import trophy2 from "../images/trophy2.webp";
import wonyoung from "../images/wony.webp";
import welcomeTone from "../audio/welcome.wav";
import correct from "../audio/correct.wav";
import wrong from "../audio/wrong.wav";
import tick from "../audio/tick.wav";
import success from "../audio/success.wav";
import fail from "../audio/fail.wav";

import CurrentQuestion from "./CurrentQuestion";

const PlayQuiz = () => {
  const [token, setToken] = useState(localStorage.getItem("authTokenJWT"));
  const [questions, setQuestions] = useState();
  const [start, setStart] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [next, setNext] = useState(false);

  const [scoreOverall, setScoreOverall] = useState(0);
  const [end, setEnd] = useState(false);

  if (!token) {
    window.location.href = "/login";
  }

  let welcomeAudio = new Audio(welcomeTone);
  let correctAudio = new Audio(correct);
  let wrongAudio = new Audio(wrong);
  let successAudio = new Audio(success);
  let failAudio = new Audio(fail);

  const recordScore = async () => {
    // console.log(scoreData);

    let timerInterval;
    await Swal.fire({
      title: "Recording score...",
      html: "I will close in <b></b> milliseconds. ",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });

    show();

    try {
      console.log({
        score: scoreOverall,
        number_of_questions: questions.length,
        user_id: localStorage.getItem("user_id"),
      });

      let response = await axios.post(
        "http://localhost:8000/api/auth/addscore",
        {
          score: scoreOverall,
          number_of_questions: questions.length,
          user_id: Number(localStorage.getItem("user_id")),
        },
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
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  };

  const fireSwal = async (message, icon) => {
    // correctAudio.play();

    // if (score === 1) {
    //   setScoreOverall((prev) => prev++);
    // }

    await Swal.fire({
      title: "You finished the quiz! Do you want to restart the game?",
      text: message,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#db2777",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, restart!",
      cancelButtonText: "No, record score.",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        recordScore();
      }
    });
  };

  const handleSetScore = async (score) => {
    await setScoreOverall((prev) => prev + score);
    console.log(score);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }

    if (currentQuestion === questions.length - 1) {
      // alert("DONE!!");
      await setEnd((prev) => true);

      if (scoreOverall <= Math.round(questions.length * 0.3)) {
        // wrongAudio.play();
        failAudio.play();

        fireSwal(`Sadly, You only got ${scoreOverall}!`, "error", 0);
      } else {
        // correctAudio.play();
        // await setScoreOverall((prev) => prev++);
        successAudio.play();
        fireSwal(
          `You got ${scoreOverall} correct ${
            scoreOverall === 1 ? "answer" : "answers"
          } out of ${questions.length} questions!`,
          "success",
          1
        );
      }

      return;
    }
  };

  useEffect(() => {
    try {
      let fetchQuestions = async () => {
        let response = await axios.get("http://localhost:8000/api/auth/play", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log(response);
          setQuestions((prev) =>
            response.data.success.sort(() => Math.random() - 0.5)
          );
        }
      };

      fetchQuestions();
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      }).then(() => window.location.reload());
    }
  }, []);

  if (!start) {
    Swal.fire({
      title: "Welcome!",
      text: "Are you ready?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "bg-green-500",
      cancelButtonColor: "bg-red-500",
      confirmButtonText: "Let's go!",
      confirmButtonColor: "#db2777",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setStart((prev) => true);

        welcomeAudio.play();
        let timerInterval;
        Swal.fire({
          title: "Loading...",
          html: "I will close in <b></b> milliseconds. " + "Be ready!",
          timer: 1000,
          timerProgressBar: true,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            setNext((prev) => true);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = "/";
      }
    });
  }

  // const yourButtonRef = useRef(null);

  // useEffect(() => {
  //   if (yourButtonRef.current) {
  //     // Simulate a click on the button
  //     yourButtonRef.current.click();
  //   }
  // });

  // const handleButtonClick = () => {
  //   // console.log("Button Clicked!");
  //   // Add your button click logic here.
  //   welcomeAudio.play();
  // };

  return (
    <div className="text-center p-4 min-h-screen relative bg-gradient-to-br from-white to-pink-500">
      {!end && (
        <img
          src={wonyoung}
          alt="wonyoung"
          className="transform scale-x-[-1] absolute right-0 bottom-0 h-[60vh] opacity-40 md:opacity-70 z-10"
        />
      )}
      {questions && (
        <div>
          <GlobalLoading />

          <div className="text-lg font-bold text-pink-800 my-20 font-fredoka ">
            <span className="text-4xl text-black">Your score:</span>{" "}
            <span className="text-4xl text-purple-700 mx-10">
              {scoreOverall}
            </span>
          </div>
          <div className="mb-4 text-2xl font-bold text-black font-poppins">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      )}

      {questions && next && !end && (
        <CurrentQuestion
          currentQuestion={questions[currentQuestion]}
          onScore={handleSetScore}
          currentQuestionNumber={currentQuestion}
          lengthOfQuestions={questions.length}
          token={token}
        />
      )}

      {end && (
        <div className="flex justify-center align-middle h-[80vh] z-20">
          <img className="h-[50%] sm:h-[100%]" src={trophy2}></img>
        </div>
      )}

      {questions ? console.log(questions) : <></>}
    </div>
  );
};

export default PlayQuiz;
