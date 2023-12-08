import { useEffect, useState } from "react";
import nana from "../images/nana1.png";
import trophy from "../images/Trophy.webp";
import minwoo from "../images/minwoo.webp";
import axios from "axios";
import { GlobalLoading, show, hide } from "react-global-loading";

const Home = () => {
  const [nameOfUser, setNameOfUser] = useState("");
  let token = localStorage.getItem("authTokenJWT");

  useEffect(() => {
    let fetchUser = async () => {
      try {
        let response = await axios.get("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNameOfUser((prevNameOfUser) => response.data.first_name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  let welcomeMessageArray = [
    "Welcome to K-Wave Wiz – Your Ultimate Destination for K-pop Trivia and Fun!",
    "Step into the world of K-pop magic! Welcome to K-Wave Wiz, where the music never stops, and the quizzes never end!",
    "Greetings, K-pop enthusiasts! Get ready to dive into the beats and rhythms of K-Wave Wiz – your passport to K-pop knowledge and excitement!",
    "Hello, Quizzer! Join the K-Wave Wiz community and embark on a journey through the vibrant world of K-pop. Let the quiz mania begin!",
    "A warm welcome to K-Wave Wiz – the quiz app that brings K-pop fandom to life! Unleash your inner K-pop genius with our thrilling quizzes.",
    "Hey there, K-pop aficionados! Welcome to K-Wave Wiz, where every question brings you closer to becoming the ultimate K-pop connoisseur.",
    "Welcome aboard, K-pop explorers! K-Wave Wiz is your ticket to a world filled with catchy tunes, exciting challenges, and K-pop glory!",
    "Get ready to groove and guess! Welcome to K-Wave Wiz, where the fun never ends, and the K-pop beats keep you moving!",
    "Greetings, Quiz Champions! K-Wave Wiz welcomes you to a world of rhythm, melodies, and K-pop mastery. Let the quiz fever begin!",
    "Hello K-pop enthusiasts! Welcome to the epicenter of K-pop quizzes – K-Wave Wiz. Are you ready to test your knowledge and rise to the top?",
    "Step into the spotlight of K-pop brilliance! K-Wave Wiz welcomes you to a world of musical intrigue and quiz excitement. Enjoy the journey!",
    "Welcome, music maestros! K-Wave Wiz invites you to immerse yourself in the captivating universe of K-pop quizzes. Let the quiz harmony play!",
    "Greetings, K-pop prodigies! K-Wave Wiz is your stage for quiz triumphs and musical delights. Join us as we celebrate the magic of K-pop!",
    "Hey K-pop quiz enthusiasts! Welcome to K-Wave Wiz, where the beats are infectious, and the questions are electrifying. Let the quiz fun begin!",
    "Hello, Quiz Masters! K-Wave Wiz extends a warm welcome to all K-pop lovers seeking the thrill of quiz challenges and musical excitement.",
    "Welcome to K-Wave Wiz – the hub of K-pop brilliance! Unleash your passion for music and knowledge as you explore our exciting quizzes.",
    "Greetings, K-pop quiz champions! K-Wave Wiz is thrilled to welcome you to a realm of music, fun, and the ultimate K-pop quiz experience!",
    "Hey there, K-pop gurus! Welcome to K-Wave Wiz, where each quiz is a journey through the beats, melodies, and brilliance of K-pop. Enjoy!",
    "A big welcome to the K-Wave Wiz family! Brace yourself for an exhilarating ride through the world of K-pop quizzes. Let's make quiz history!",
    "Hello K-pop enthusiasts! Get ready to shine in the spotlight of K-Wave Wiz – where every quiz question brings you closer to K-pop greatness!",
    "Welcome to K-Wave Wiz, where the rhythm of K-pop meets the excitement of quizzes! Join us for a musical journey like no other.",
    "Hello, Quiz Wizards! K-Wave Wiz is thrilled to welcome you to a world where K-pop knowledge reigns supreme. Let the quizzing adventure commence!",
    "Step into the beat with K-Wave Wiz! A warm welcome to all K-pop enthusiasts ready to test their knowledge and embrace the thrill of our quizzes.",
    "Hey K-pop Scholars! Welcome to K-Wave Wiz, where every quiz is a chance to showcase your K-pop expertise. Get ready for the ultimate challenge!",
    "Greetings, Quiz Lovers! K-Wave Wiz opens its doors to you, inviting you to a world of melody, rhythm, and K-pop excitement. Start quizzing now!",
    "A grand welcome to the K-Wave Wiz party! Join us as we celebrate K-pop culture through engaging quizzes and fun challenges. Let's get started!",
    "Hello, Quiz Champions! K-Wave Wiz welcomes you with open arms to a realm where K-pop mastery takes center stage. Get ready to be amazed!",
    "Welcome to K-Wave Wiz, where passion meets knowledge in the world of K-pop! Embrace the challenge, dance to the beats, and enjoy the quizzes.",
    "Hey K-pop Maestros! Get ready for an unforgettable journey through the sounds of K-pop with K-Wave Wiz. Let's quiz our way to greatness!",
    "Greetings, K-pop Quiz Enthusiasts! K-Wave Wiz is your portal to a universe of musical trivia and excitement. Join us for a quiz-tastic experience!",
    "Welcome aboard the K-Wave Wiz express! Prepare for a thrilling ride through the world of K-pop quizzes. Your adventure in music knowledge begins now!",
    "Hello, Quiz Fanatics! K-Wave Wiz extends a warm welcome to all ready to explore the K-pop galaxy through our exciting and challenging quizzes.",
    "Step into the rhythm with K-Wave Wiz! A big welcome to all K-pop enthusiasts seeking an immersive experience filled with quizzes, fun, and more!",
    "Hey there, Quiz Explorers! K-Wave Wiz invites you on a journey of discovery, where each quiz question unveils a new layer of K-pop excitement.",
    "Greetings, K-pop Quiz Masters! Welcome to K-Wave Wiz, where your knowledge takes center stage. Let's embark on a quiz adventure together!",
    "Welcome to K-Wave Wiz, the ultimate destination for K-pop aficionados and quiz enthusiasts alike. Dive into the beat and let the quizzing begin!",
    "Hello, Quiz Stars! K-Wave Wiz is your stage for K-pop brilliance. Join us for a quiz-tastic experience filled with music, fun, and excitement!",
    "A warm welcome to K-Wave Wiz – your passport to K-pop excellence! Let the quizzes transport you to a world of rhythm, melody, and joy.",
    "Hey K-pop Quiz Heroes! K-Wave Wiz salutes you as you embark on a quest of knowledge, challenges, and the electrifying beats of K-pop!",
    "Greetings, Quiz Thrill-Seekers! K-Wave Wiz is here to satisfy your craving for K-pop excitement through engaging quizzes and captivating challenges.",
    "Welcome to the K-Wave Wiz family! Your journey into the world of K-pop quizzes starts here. Get ready for a musical adventure like no other!",
    "Hello, Quiz Adventurers! K-Wave Wiz welcomes you to a world where every question tells a K-pop story. Join us for a quiz-tastic experience!",
    "Step into the K-pop rhythm with K-Wave Wiz! A warm welcome to all music lovers ready to test their knowledge and revel in the thrill of quizzes.",
    "Hey K-pop Quiz Explorers! K-Wave Wiz invites you to navigate the exciting world of K-pop through our engaging quizzes. Let's quiz and groove!",
    "Greetings, Quiz Champs! K-Wave Wiz extends a hearty welcome to all aspiring K-pop experts. Brace yourself for an exciting journey filled with quizzes!",
    "A grand welcome to K-Wave Wiz – where the magic of K-pop meets the thrill of quizzes! Dive into the world of music and knowledge. Let's quiz together!",
    "Hello, Quiz Dreamers! K-Wave Wiz invites you to dream, quiz, and repeat. Join us for an immersive experience where K-pop knowledge takes center stage.",
    "Welcome to K-Wave Wiz, where the beats are contagious, and the quizzes are electrifying. Join us on this K-pop adventure and let the quizmania begin!",
    "Hey K-pop Quiz Enthusiasts! K-Wave Wiz is your gateway to K-pop mastery. Join us for quizzes that will challenge your knowledge and ignite your passion!",
    "Greetings, Quiz Pioneers! K-Wave Wiz welcomes you to chart new territories of K-pop knowledge. Let's embark on a quiz expedition filled with excitement!",
  ];

  const [number, setNumber] = useState((prevNumber) =>
    Math.floor(Math.random() * welcomeMessageArray.length - 1)
  );

  const [welcomeMessage, setWelcomeMessage] = useState(
    (prevWelcomeMessage) => welcomeMessageArray[number]
  );

  let updateNumber = () => {
    setNumber((prevNumber) => {
      const newNumber = Math.floor(
        Math.random() * welcomeMessageArray.length - 1
      );
      return newNumber;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateNumber();
      console.log(welcomeMessageArray[number]);

      if (!welcomeMessageArray[number]) {
        setWelcomeMessage(
          (prevWelcomeMessage) =>
            welcomeMessageArray[
              Math.floor(Math.random() * welcomeMessageArray.length - 1)
            ]
        );
      } else {
        setWelcomeMessage((prevWelcomeMessage) => welcomeMessageArray[number]);
      }
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [number]); // Include 'number' in the dependency array to ensure useEffect updates when 'number' changes

  return (
    <div className="h-full">
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-white py-20 h-[25rem] md:h-[40rem] relative flex items-center">
        <img
          className="h-[15rem] md:h-[30rem] lg:md:h-[40rem]  absolute right-0 bottom-0 z-10"
          src={nana}
          alt="nana-afterschool"
        />
        <div className="container mx-auto text-center z-20">
          <h1 className="text-3xl md:text-7xl font-extrabold leading-tight mb-4 font-fredoka">
            Welcome to K-Wave Wiz
          </h1>
          <p className="text-xl mb-8 font-poppins">
            Your Ultimate Destination for K-pop Trivia and Fun!
          </p>
          <a
            href="#start-quiz"
            className="bg-white text-purple-600 hover:text-purple-800 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 cursor-pointer"
          >
            Start Quiz
          </a>
        </div>
      </div>
      <div className="w-full bg-gradient-to-tr from-white to-purple-600 flex justify-center items-center md:pt-5 md:pl-5 md:pr-5 ">
        <img
          className="h-[10rem] md:h-[20rem] lg:h-[40rem]"
          src={minwoo}
          alt="image"
        />

        <div className="italic text-center align-middle text-m md:text-2xl lg:text-4xl 2xl:text-5xl p-5 md:p-10 font-fredoka ">
          {nameOfUser ? (
            <div className="text-[1.5rem] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-3 text-purple-600 font-bold">
              {nameOfUser && `Welcome, ${nameOfUser}!`}
            </div>
          ) : (
            <div className="hidden"></div>
          )}
          <div className="mb-3">
            {/* Add any additional styling you want for the welcome message */}
          </div>
          "{welcomeMessage}"
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500 via-purple-400 to-[#5AB9E8] p-4 lg:p-10">
        <div className="text-xl sm:text-2xl lg:text-5xl font-extrabold font-fredoka text-white">
          Recent Scores
        </div>

        <div className="flex items-center justify-center ">
          <div className="p-1 md:p-5 xl:p-10">
            <div className="grid grid-cols-3 xl:gap-x-[10rem] gap-y-[10rem]">
              <div className="text-center font-fredoka text-white text-[0.5rem] sm:text-xs md:text-2xl lg:text-3xl p-1 xl:p-2 font-bold">
                Username
              </div>
              <div className="text-center font-fredoka text-white text-[0.5rem] sm:text-xs md:text-2xl lg:text-3xl p-1 xl:p-2 font-bold">
                Score
              </div>
              <div className="text-center font-fredoka text-white text-[0.5rem] sm:text-xs md:text-2xl lg:text-3xl p-1 xl:p-2 font-bold">
                Time and Date
              </div>
            </div>
            <div className="grid grid-cols-3 xl:gap-x-[10rem] gap-y-[10rem]">
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                heyow1
              </div>
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                11/40
              </div>
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                Secret
              </div>
            </div>
            <div className="grid grid-cols-3 xl:gap-x-[10rem] gap-y-[10rem]">
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                heyow2
              </div>
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                11/40
              </div>
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                Secret
              </div>
            </div>
            <div className="grid grid-cols-3 xl:gap-x-[10rem] gap-y-[10rem]">
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                heyow3
              </div>
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                11/40
              </div>
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                Secret
              </div>
            </div>
            <div className="grid grid-cols-3 xl:gap-x-[10rem] gap-y-[10rem]">
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                heyow4
              </div>
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                11/40
              </div>
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                Secret
              </div>
            </div>
            <div className="grid grid-cols-3 xl:gap-x-[10rem] gap-y-[10rem]">
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                heyow5
              </div>
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                11/40
              </div>
              <div className="text-center font-poppins text-[0.5rem] sm:text-xs md:text-2xl p-1 xl:p-2 text-white">
                Secret
              </div>
            </div>
          </div>

          <img
            src={trophy}
            alt="trophy"
            className="h-[8rem] m-0 md:h-[10] lg:h-[20rem]"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-white py-20 h-[10rem] md:h-[20rem] relative flex items-center justify-center">
        <a
          href="#start-quiz"
          className="bg-white text-purple-600 py-4 px-12 md:py-8 md:px-24 rounded-full md:text-3xl font-semibold transition duration-300 cursor-pointer hover:bg-[#5AB9E8] hover:text-white "
        >
          Let's Rock!
        </a>
      </div>
    </div>
  );
};

export default Home;
