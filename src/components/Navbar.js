import logoBlack from "../images/K-Wave-black.png";

const Navbar = () => {
  return (
    <div>
      <nav className="p-1.5 bg-[#5AB9E8] w-full items-center flex justify-between">
        <a href="/" className="w-1/5">
          <div className="flex items-center">
            <img className="h-10 ml-5" src={logoBlack} alt="logo" />
            <div className="font-fredoka text-2xl ml-10">K-Wave Wiz</div>
          </div>
        </a>

        <ul className="flex justify-evenly">
          <li className="p-3 font-fredoka text-lg hover:text-purple-800 cursor-pointer">
            Log in
          </li>
          <li className="p-3 font-fredoka text-lg hover:text-purple-800 cursor-pointer">
            Register
          </li>
          <li className="p-3 font-fredoka text-lg hover:text-purple-800 cursor-pointer">
            Play
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
