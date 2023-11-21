const Footer = () => {
  let isSignUp = false;

  const setFooterColor = () => {
    let currentUrl = window.location.href;

    let array = currentUrl.split("/");

    if (array.includes("signup")) {
      isSignUp = true;
    }
  };

  setFooterColor();
  return (
    <footer
      className={`flex justify-evenly ${
        isSignUp ? "bg-pink-500" : "bg-[#5AB9E8]"
      } p-5`}
    >
      <div
        className={`font-fredoka text-[0.5rem] sm:text-xl cursor-pointer ${
          isSignUp ? "text-white" : "text-black"
        } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
      >
        About Us
      </div>
      <div
        className={`font-fredoka text-[0.5rem] sm:text-xl cursor-pointer ${
          isSignUp ? "text-white" : "text-black"
        } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
      >
        Terms of Service
      </div>
      <div
        className={`font-fredoka text-[0.5rem] sm:text-xl cursor-pointer ${
          isSignUp ? "text-white" : "text-black"
        } ${isSignUp ? "hover:text-pink-900" : "hover:text-white"}`}
      >
        Copyright
      </div>
    </footer>
  );
};

export default Footer;
