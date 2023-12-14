import axios from "axios";
import logoBlack from "../images/K-Wave-black.png";
import logoFullWhite from "../images/K-Wave-white-full.webp";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { GlobalLoading, show, hide } from "react-global-loading";

const Navbar = () => {
  let isSignUp;
  let isLogIn;
  let isAddQuestion;
  let token = localStorage.getItem("authTokenJWT");
  let currentUrl = window.location.href;

  const handleLogOut = async (e) => {
    e.preventDefault();

    try {
      show();
      let response = await axios.post(
        "http://127.0.0.1:8000/api/auth/logout",
        { request: "logout" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("authTokenJWT");
        localStorage.removeItem("account_type");
        localStorage.removeItem("user_id");
        await Swal.fire({
          title: "Success!",
          text: "Logged out successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        await hide();
        window.location.href = "/";
      }
    } catch (error) {
      await hide();
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    let getAccountType = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.account_type === "admin") {
          setIsAdmin((prevIsAdmin) => true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAccountType();
  }, []);

  const checkUrl = () => {
    let array = currentUrl.split("/");

    if (array.includes("login")) {
      isLogIn = true;
    }

    if (array.includes("signup")) {
      isSignUp = true;
    }

    if (array.includes("addquestion")) {
      isAddQuestion = true;
    }
  };

  checkUrl();

  // const checkscreenWidth = () => {
  //   if (window.innerWidth < 444) {

  //   }
  // }

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 444) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
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
    <div>
      <GlobalLoading />
      <nav
        className={`p-1 md:p-1.5 ${
          isSignUp ? "bg-pink-500" : "bg-[#5AB9E8]"
        } w-full items-center flex justify-between`}
      >
        <a href="/">
          <div className="flex items-center">
            <img
              className="h-4 md:h-10 ml-1 md:ml-5"
              src={isSignUp ? logoFullWhite : logoBlack}
              alt="logo"
            />
            <div
              className={`font-fredoka text-xs lg:text-2xl ml-1 md:ml-10 ${
                isSignUp ? "text-white" : "text-black"
              } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
            >
              K-Wave Wiz
            </div>
          </div>
        </a>

        {!isMobile && (
          <ul className="flex justify-evenly">
            {isLogIn || token ? (
              <div className="hidden"></div>
            ) : (
              <li
                className={`p-1 md:p-3 font-fredoka text-xs md:text-lg cursor-pointer ${
                  isSignUp ? "text-white" : "text-black"
                } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
              >
                <a href="/login">Log in</a>
              </li>
            )}

            {isSignUp || token ? (
              <div className="hidden"></div>
            ) : (
              <li
                className={`p-1 md:p-3 font-fredoka text-xs md:text-lg cursor-pointer ${
                  isSignUp ? "text-white" : "text-black"
                } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
              >
                <a href="/signup">Sign Up</a>
              </li>
            )}

            {isAdmin && !isAddQuestion && (
              <li
                className={`p-1 md:p-3 font-fredoka text-xs md:text-lg cursor-pointer ${
                  isSignUp ? "text-white" : "text-black"
                } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
              >
                <a href="/addquestion">Add Question</a>
              </li>
            )}
            {/* 
          {token ? hide() : <></>}

          {onlyHome ? hide() : <></>} */}

            {isAdmin && (
              <li
                className={`p-1 md:p-3 font-fredoka text-xs md:text-lg cursor-pointer ${
                  isSignUp ? "text-white" : "text-black"
                } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
              >
                <a href="/myquestions">My Questions</a>
              </li>
            )}

            <li
              className={`p-1 md:p-3 font-fredoka text-xs md:text-lg cursor-pointer ${
                isSignUp ? "text-white" : "text-black"
              } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
            >
              <a href="/play">Play</a>
            </li>

            {token && (
              <li
                className={`p-1 md:p-3 font-fredoka text-xs md:text-lg cursor-pointer ${
                  isSignUp ? "text-white" : "text-black"
                } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
              >
                <a href="/myaccount">My Account</a>
              </li>
            )}

            {token && (
              <li
                className={`p-1 md:p-3 font-fredoka text-xs md:text-lg cursor-pointer ${
                  isSignUp ? "text-white" : "text-black"
                } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
              >
                <form onSubmit={handleLogOut}>
                  <button>Log out</button>
                </form>
              </li>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
