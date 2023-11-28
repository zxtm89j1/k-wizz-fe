import logoBlack from "../images/K-Wave-black.png";
import logoFullWhite from "../images/K-Wave-white-full.webp";

const Navbar = () => {
  let isSignUp = false;

  const setNavColor = () => {
    let currentUrl = window.location.href;

    let array = currentUrl.split("/");

    if (array.includes("signup")) {
      isSignUp = true;
    }
  };

  setNavColor();
  return (
    <div>
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

        <ul className="flex justify-evenly">
          <li
            className={`p-1 md:p-3 font-fredoka text-xs md:text-lg cursor-pointer ${
              isSignUp ? "text-white" : "text-black"
            } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
          >
            <a href="/login">Log in</a>
          </li>

          {isSignUp ? (
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

          <li
            className={`p-1 md:p-3 font-fredoka text-xs md:text-lg cursor-pointer ${
              isSignUp ? "text-white" : "text-black"
            } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
          >
            Play
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
