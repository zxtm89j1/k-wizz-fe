import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Swal from "sweetalert2";
import welcomeTone from "../audio/welcome.wav";
import correct from "../audio/correct.wav";
import wrong from "../audio/wrong.wav";
import tick from "../audio/tick.wav";

const CurrentQuestion = (props) => {
  let question = props.currentQuestion;
  let onScore = props.onScore;
  let currentQuestionNumber = props.currentQuestionNumber;
  let numberOfQuestions = props.lengthOfQuestions;
  let token = props.token;

  let welcomeAudio = new Audio(welcomeTone);
  let correctAudio = new Audio(correct);
  let wrongAudio = new Audio(wrong);
  let tickAudio = new Audio(tick);

  if (!token) {
    window.location.href = "/login";
  }

  let alphabet = ["a", "b", "c", "d"];

  const [timeUp, setTimeUp] = useState(false);

  let correctAnswer = question.correct_answer;

  const [chosenAnswer, setChosenAnswer] = useState();

  const settingLocalScore = async (score) => {
    onScore(score);
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      setTimeUp(true);

      if (chosenAnswer == correctAnswer) {
        if (currentQuestionNumber == numberOfQuestions - 1) {
          try {
            correctAudio.play();
          } catch (error) {}

          Swal.fire({
            title: "You're right!",
            text: "You got the correct answer!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#db2777",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              settingLocalScore(1);
              setTimeUp(false);
            }
          });
        } else {
          try {
            correctAudio.play();
          } catch (error) {}

          Swal.fire({
            title: "You're right!",
            text: "You got the correct answer!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#db2777",
            cancelButtonColor: "#d33",
            confirmButtonText: "Next Question",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              settingLocalScore(1);
              setTimeUp(false);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              window.location.reload();
            }
          });
        }
      } else {
        if (currentQuestionNumber == numberOfQuestions - 1) {
          try {
            wrongAudio.play();
          } catch (error) {}
          Swal.fire({
            title: "You're wrong!",
            text: "You got the wrong answer!",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#db2777",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              settingLocalScore(0);
              setTimeUp(false);
            }
          });
        } else {
          try {
            wrongAudio.play();
          } catch (error) {}
          Swal.fire({
            title: "You're wrong!",
            text: "You got the wrong answer!",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#db2777",
            cancelButtonColor: "#d33",
            confirmButtonText: "Next Question",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              settingLocalScore(0);
              setTimeUp(false);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              window.location.reload();
            }
          });
        }
      }

      return <div className="timer">Time's up!</div>;
    }

    return (
      <div className="timer">
        <div className="text font-poppins text-md md:text-xl">Remaining</div>
        {remainingTime <= 5 && remainingTime > 3 ? (
          <div className="value font-poppins text-4xl md:text-5xl my-5 text-red-800">
            {remainingTime}
          </div>
        ) : remainingTime <= 3 ? (
          <div className="value font-poppins text-4xl md:text-5xl my-5 text-red-600">
            {remainingTime}
          </div>
        ) : (
          <div className="value font-poppins text-4xl md:text-5xl my-5 text-black">
            {remainingTime}
          </div>
        )}

        <div className="text font-poppins text-md md:text-xl">seconds</div>
      </div>
    );
  };

  const handleSetChosenAnswer = async (e, value) => {
    setChosenAnswer(Number(value));
    setSelectedChoice(Number(value));
  };

  useEffect(() => {
    const playTickAudio = () => {
      try {
        if (!timeUp) {
          tickAudio.play();
        }
      } catch (error) {}
    };

    window.addEventListener("click", playTickAudio);

    return () => {
      window.removeEventListener("click", playTickAudio);
      try {
        if (!timeUp) {
          tickAudio.pause();
          tickAudio.currentTime = 0;
        }
      } catch (error) {}
    };
  }, [timeUp]);

  const [selectedChoice, setSelectedChoice] = useState(null);

  const [currentWidth, setIsCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsCurrentWidth((prev) => window.innerWidth);
    };

    checkScreenWidth(); // Call the function once to set the initial state

    // Add event listener to update state when the window is resized
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []); // Empty dependency array ensures that this effect runs only once after initial render

  return (
    <div className="flex justify-center">
      <div className="p-4 w-[90vh] block self-center z-20">
        {!timeUp && (
          <div className="mb-4 flex justify-center h-[40vh] ">
            <CountdownCircleTimer
              isPlaying
              duration={15}
              colors={["#FF6347", "#FF4500", "#FF7F50", "#FF8C00"]}
              colorsTime={[15, 5, 2, 0]}
              onComplete={() => ({ shouldRepeat: false, delay: 1 })}
              size={currentWidth > 413 ? 300 : 200}
              isSmoothColorTransition={true}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        )}

        <div className="mb-4 font-bold font-fredoka text-left text-xl lg:text-3xl">
          <span className="mr-5">{currentQuestionNumber + 1}.</span>{" "}
          {question.question_text}
        </div>

        <div className=" w-full self-center">
          {question.choices.map((choice, index) => (
            <div
              key={index}
              className="my-10 flex justify-left items-center font-poppins font-bold text-md lg:text-2xl"
            >
              {alphabet[index] + ". "}
              <input
                checked={selectedChoice === Number(choice.value_in_frontend)}
                type="radio"
                disabled={timeUp ? true : false}
                value={Number(choice.value_in_frontend)}
                name="choice"
                onChange={(e) =>
                  handleSetChosenAnswer(e, Number(choice.value_in_frontend))
                }
                className="appearance-none border-2 border-pink-500/50 rounded-full w-4 h-4 md:w-6 md:h-6 checked:bg-pink-500 checked:border-transparent focus:outline-none ml-5 "
              />
              <div className="font-poppins font-bold mr-5 ml-5 lg:ml-10">
                {choice.choice_text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentQuestion;
