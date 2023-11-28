import yoon from "../images/yoon.webp";

const Login = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-purple-300 flex justify-center items-center relative">
      <form className="p-5 bg-white rounded-lg shadow-lg md:w-96 sm:w-80 xs:w-72 z-20">
        <div className="self-start font-fredoka text-gray-800 sm:text-2xl mb-4">
          Login
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-800 text-sm sm:text-base mb-1 font-poppins"
          >
            Email:
          </label>
          <input
            className="w-full border-2 rounded-md px-1 py-0.5 sm:px-2 sm:py-1 border-pink-500/50 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
            type="email"
            name="email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-800 text-sm sm:text-base mb-1 font-poppins"
          >
            Password:
          </label>
          <input
            className="w-full border-2 border-pink-500/50 rounded-md px-1 py-0.5 sm:px-2 sm:py-1 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
            type="password"
            name="password"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="w-full md:w-3/4 bg-pink-500 text-white rounded-md py-2 px-4 hover:bg-pink-600 transition duration-300 font-fredoka"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

      <img
        src={yoon}
        alt="kyler"
        className="h-[30rem] md:h-[40rem] lg:h-[60rem] absolute bottom-0 right-0 z-10"
      />
    </div>
  );
};

export default Login;
