import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddQuestion from "./components/AddQuestion";
import MyQuestions from "./components/MyQuestions";
import PlayQuiz from "./components/PlayQuiz";
import MyAccount from "./components/MyAccount";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addquestion" element={<AddQuestion />} />
          <Route path="/play" element={<PlayQuiz />} />
          <Route path="/myquestions" element={<MyQuestions />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
