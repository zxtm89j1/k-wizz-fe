import Swal from "sweetalert2";
import { GlobalLoading, show, hide } from "react-global-loading";

const PlayQuiz = () => {
  const token = localStorage.getItem("authTokenJWT");

  if (!token) {
    window.location.href = "/login";
  }

  return (
    <div>
      <div>PLAY THIS QUIZ!!!!!!</div>
    </div>
  );
};

export default PlayQuiz;
